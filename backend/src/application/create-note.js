const noteFactory = require("../domain/factories/note-factory");
const writeNoteToDynamo = require("../persistence/write-note-to-dynamo");

module.exports = async formData => {
	const note = noteFactory(formData);
	const res = await writeNoteToDynamo(note);

	return {
		success: true,
		noteHash: note.noteHash,
		burnImmediatelyHash: note.burnImmediatelyHash
	};
};
