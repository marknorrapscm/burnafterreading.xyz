const AWS = require("aws-sdk");
const readNoteFromDynamo = require("../persistence/read-note-from-dynamo");
const updateNoteInDynamo = require("../persistence/update-note-in-dynamo");
const appendStageToAssetName = require("../utility/append-stage-to-asset-name");
const sendEmail = require("./send-email");
const validatePassword = require("./validate-password");

module.exports = async (noteHash, passwordFromUser) => {
	if (!noteHash) {
		throw Error("No noteHash supplied");
	}

	const note = await loadNote(noteHash);
	const passwordRes = validatePassword(note, passwordFromUser);

	if (passwordRes.isValid) {
		const noteWithUpdatedReadCount = await updateReadCount(note);
		await updateNoteInDynamo(noteWithUpdatedReadCount);
		await sendEmailIfRequired(noteWithUpdatedReadCount);

		return stripSensitiveProperties(noteWithUpdatedReadCount);
	} else {
		throw Error(passwordRes.errorMessage);
	}
};

const sendEmailIfRequired = async note => {
	const isEmailRequired = note.readCount === 1 && note.emailAddress !== undefined;
	if (isEmailRequired) {
		await sendEmail(note.emailAddress, note.noteHash);
	}
};

const loadNote = async noteHash => {
	const note = await readNoteFromDynamo(noteHash);
	if (!note) {
		throw Error(`No note with hash ${noteHash} exists`);
	}

	if (!!note.audioFileName && note.audioFileName.length > 0) {
		note.audioFileName = await getPresignedDownloadUrl(note.audioFileName);
	}

	return note;
};

const updateReadCount = async note => {
	note.incrementReadCount();
	if (note.areBurnConditionsSatisfied()) {
		note.hasBeenBurned = true;
	}

	return note;
};

const getPresignedDownloadUrl = async audioFileName => {
	const s3 = new AWS.S3({ signatureVersion: "v4", region: "eu-west-1" });
	const uploadUrl = await s3.getSignedUrlPromise("getObject", {
		Bucket: appendStageToAssetName(process.env.bucketName),
		Key: audioFileName,
		Expires: 300
	});

	return uploadUrl;
};

const stripSensitiveProperties = note => {
	const noteWithoutSenstiveProps = { ...note };
	delete noteWithoutSenstiveProps.createdOn;
	delete noteWithoutSenstiveProps.ipAddress;
	delete noteWithoutSenstiveProps.isPasswordRequired;
	delete noteWithoutSenstiveProps.password;
	delete noteWithoutSenstiveProps.sendEmail;
	delete noteWithoutSenstiveProps.emailAddress;

	return noteWithoutSenstiveProps;
};
