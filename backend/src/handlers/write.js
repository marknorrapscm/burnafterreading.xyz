const burnNote = require("../application/burn-note");
const createNote = require("../application/create-note");
const responseFactory = require("../domain/factories/response-factory");

module.exports.createNote = async event => {
	try {
		const formData = readFormDataFromEvent(event);
		const res = await createNote(formData);

		return responseFactory(true, "", {
			noteHash: res.noteHash,
			burnImmediatelyHash: res.burnImmediatelyHash
		});
	} catch (e) {
		return responseFactory(false, e.message);
	}
};

module.exports.burnNoteImmediately = async event => {
	try {
		const { noteHash } = event.queryStringParameters;
		const res = await burnNote(noteHash);

		return responseFactory(true, "", {
			result: res
		});
	} catch (e) {
		return responseFactory(false, e.message);
	}
};

const readFormDataFromEvent = event => {
	const { formData } = parseBodyFromEvent(event);
	formData.ipAddress = extractIpAddress(event);

	return formData;
};

/**
 * SLS gives us no good way to emulate events so we have to pass
 * the event object as a plain string in debug.
 * @param {*} event Either a string in debug or an event object
 * @returns The parsed event body as an object.
 */
const parseBodyFromEvent = event => {
	if (typeof event.body === "string") {
		return JSON.parse(event.body);
	} else {
		return event.body;
	}
};

const extractIpAddress = event => {
	try {
		const xForwardedFor = event.headers["X-Forwarded-For"];

		if (xForwardedFor && xForwardedFor.length > 0) {
			return xForwardedFor.split(",")[0];
		} else {
			throw Error("xForwardedFor not set");
		}
	} catch (e) {
		console.error("Could not read IP in extractIpAddress()");
		console.error(e);

		return "IP not detected";
	}
};
