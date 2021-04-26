const AWS = require("aws-sdk");

module.exports = async (emailAddress, noteHash) => {
	if (!emailAddress || emailAddress === "") {
		console.log("No email address supplied");
		throw Error("No email address supplied");
	}

	if (!noteHash || noteHash === "") {
		console.log("No noteHash was supplied to sendEmail()");
		throw Error("No noteHash was supplied to sendEmail()");
	}

	const ses = new AWS.SES();
	await ses.sendEmail({
		Destination: {
			ToAddresses: [emailAddress]
		},
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: `Note with hash ${noteHash} has been read for the first time.`
				}
			},
			Subject: {
				Charset: "UTF-8",
				Data: "BurnAfterReading: note read for first time"
			}
		},
		Source: "donotreply@burnafterreading.xyz"
	}).promise();

	return true;
};
