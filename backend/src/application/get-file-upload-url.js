const AWS = require("aws-sdk");
const appendStageToAssetName = require("../utility/append-stage-to-asset-name");
const getRandomString = require("../utility/get-random-string");

module.exports = async () => {
	const { uploadUrl, fileNameWithExtension } = await getUploadURL();

	return {
		uploadUrl,
		fileNameWithExtension
	};
};

const getUploadURL = async () => {
	const fileNameWithExtension = `${getRandomString(5)}.webm`;
	const uploadUrl = await generateUploadUrl(fileNameWithExtension);

	return {
		uploadUrl,
		fileNameWithExtension
	};
};

const generateUploadUrl = async fileNameWithExtension => {
	const s3 = new AWS.S3({ signatureVersion: "v4", region: "eu-west-1" });
	const uploadUrl = await s3.getSignedUrlPromise("putObject", {
		Bucket: appendStageToAssetName(process.env.bucketName),
		Key: fileNameWithExtension,
		Expires: 300,
		ContentType: "audio/webm"
	});

	return uploadUrl;
};
