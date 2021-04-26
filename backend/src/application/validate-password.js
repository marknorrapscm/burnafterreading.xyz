const bcrypt = require("bcryptjs");

module.exports = (note, passwordFromUser) => {
	const res = {
		isValid: false,
		errorMessage: ""
	};

	if (!note.isPasswordRequired) {
		res.isValid = true;
	} else if (!passwordFromUser || passwordFromUser === "") {
		res.errorMessage = "Password required";
	} else if (!doPasswordsMatch(note.password, passwordFromUser)) {
		res.errorMessage = "Password is incorrect";
	} else {
		res.isValid = true;
	}

	return res;
};

const doPasswordsMatch = (passwordFromNote, passwordFromUser) => {
	return bcrypt.compareSync(passwordFromUser, passwordFromNote);
};
