const Response = require("../entities/Response");

module.exports = (success, message, body) => {
	const statusCode = success
		? 200
		: 400;

	const rtnBody = {
		success: success,
		...body
	};

	if (message) {
		rtnBody.message = message;
	}

	return new Response(statusCode, rtnBody);
};
