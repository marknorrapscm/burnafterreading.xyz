const readNoteFromDynamo = require("../persistence/read-note-from-dynamo");
const updateNoteInDynamo = require("../persistence/update-note-in-dynamo");

module.exports = async noteHash => {
	const note = await readNoteFromDynamo(noteHash);
	note.hasBeenBurned = true;

	await updateNoteInDynamo(note);

	return true;
};
