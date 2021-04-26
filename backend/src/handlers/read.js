const getNote = require("../application/get-note");
const responseFactory = require("../domain/factories/response-factory");

module.exports.getNote = async event => {
	try {
		const { noteHash, password } = event.queryStringParameters;
		const note = await getNote(noteHash, password);

		return responseFactory(true, "", {
			note: note
		});
	} catch (e) {
		return responseFactory(false, e.message);
	}
};
