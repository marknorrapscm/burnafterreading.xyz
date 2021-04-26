/* eslint-disable indent */
/* eslint-disable no-console */
const SelfDestructPeriod = require("./SelfDestructPeriod");

module.exports = class Note {
	constructor(data) {
		if (!isFormDataValid(data)) {
			const msg = "Invalid data supplied to Note()";
			console.error(msg);
			console.error(data);
			throw Error(msg);
		}

		this.message = data.message;
		this.selfDestructPeriod = data.selfDestructPeriod;
		this.noteHash = data.noteHash;
		this.burnImmediatelyHash = data.burnImmediatelyHash;
		this.hasBeenBurned = data.hasBeenBurned;
		this.createdOn = data.createdOn;
		this.readCount = data.readCount;
		this.ipAddress = data.ipAddress;

		if (data.numberOfReadsBeforeBurn) {
			this.numberOfReadsBeforeBurn = data.numberOfReadsBeforeBurn;
		}

		if (data.dateToBurn) {
			this.dateToBurn = data.dateToBurn;
		}

		this.isPasswordRequired = data.isPasswordRequired;
		if (data.isPasswordRequired) {
			this.password = data.password;
		}

		this.sendEmail = data.sendEmail;
		if (data.sendEmail) {
			this.emailAddress = data.emailAddress;
		}

		if (data.audioFileName) {
			this.audioFileName = data.audioFileName;
		}
	}

	incrementReadCount() {
		this.readCount = this.readCount
			? this.readCount + 1
			: 1;
	}

	areBurnConditionsSatisfied() {
		switch (this.selfDestructPeriod) {
			case SelfDestructPeriod.ReadOnce:
			case SelfDestructPeriod.ReadXTimes: {
				return this.readCount >= this.numberOfReadsBeforeBurn;
			}
			case SelfDestructPeriod.CustomTimePeriodAfterCreation: {
				return new Date() > new Date(this.dateToBurn);
			}
			default: { throw Error("No selfDestructPeriod specified"); }
		}
	}
};

const isFormDataValid = formData => {
	const selfDestructPeriodIsValid = isSelfDestructPeriodValid(formData);
	const messageIsValid = isMessageValid(formData);
	const passwordConfigIsValid = isPasswordValid(formData);
	const emailConfigIsValid = isEmailValid(formData);

	return selfDestructPeriodIsValid
        && messageIsValid
        && passwordConfigIsValid
        && emailConfigIsValid;
};

const isMessageValid = formData => {
	const messageExists = !!formData.message;
	const audioFileExists = !!formData.audioFileName;

	if (messageExists) {
		return formData.message.length <= 30000;
	} else if (audioFileExists) {
		return true;
	} else {
		return false;
	}
};

const isSelfDestructPeriodValid = formData => {
	if (!formData.selfDestructPeriod) {
		return false;
	}

	if (formData.selfDestructPeriod === SelfDestructPeriod.CustomTimePeriodAfterCreation) {
		return !Number.isNaN(Date.parse(formData.dateToBurn));
	} else if (formData.selfDestructPeriod === SelfDestructPeriod.ReadXTimes) {
		return isInteger(formData.numberOfReadsBeforeBurn);
	} else {
		return true;
	}
};

const isInteger = x => {
	return !isNaN(x) && !isNaN(parseFloat(x));
};

const isPasswordValid = formData => {
	if (formData.isPasswordRequired === true
		&& (!formData.password || formData.password === "")) {
		return false;
	} else {
		return true;
	}
};

const isEmailValid = formData => {
	if (formData.sendEmail === true
		&& !formData.emailAddress
		&& formData.emailAddress.length <= 64) {
		return false;
	} else {
		return true;
	}
};
