const getNote = require("../application/get-note");
const responseFactory = require("../domain/factories/response-factory");
const logError = require("../utility/log-error");

module.exports.getNote = async event => {
	try {
		const { noteHash, password } = event.queryStringParameters;
		const note = await getNote(noteHash, password);

		return responseFactory(true, "", {
			note: note
		});
	} catch (e) {
		logError(e, "getNote()");
		return responseFactory(false, e.message);
	}
};
