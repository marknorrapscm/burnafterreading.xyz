/* eslint-disable indent */
const getRandomString = require("../../utility/get-random-string");
const Note = require("../entities/Note");
const SelfDestructPeriod = require("../entities/SelfDestructPeriod");
const bcrypt = require("bcryptjs");

module.exports = formData => {
	const noteParams = {};
	noteParams.message = formData.message;
	noteParams.selfDestructPeriod = formData.selfDestructPeriod;
	noteParams.noteHash = getRandomString(12);
	noteParams.burnImmediatelyHash = getRandomString(32);
	noteParams.hasBeenBurned = false;
	noteParams.createdOn = new Date().toISOString();
	noteParams.readCount = 0;
	noteParams.isPasswordRequired = formData.isPasswordRequired;
	noteParams.password = hashPassword(formData.password);
	noteParams.sendEmail = formData.sendEmail;
	noteParams.emailAddress = formData.emailAddress;
	noteParams.audioFileName = formData.audioFileName;
	noteParams.ipAddress = formData.ipAddress;

	switch (formData.selfDestructPeriod) {
		case SelfDestructPeriod.ReadOnce: {
			noteParams.numberOfReadsBeforeBurn = 1;
			break;
		}
		case SelfDestructPeriod.ReadXTimes: {
			noteParams.numberOfReadsBeforeBurn = Number(formData.numberOfReadsBeforeBurn);
			break;
		}
		case SelfDestructPeriod.CustomTimePeriodAfterCreation: {
			noteParams.dateToBurn = calculateBurnDate(
				noteParams.createdOn,
				formData.daysPeriod,
				formData.hoursPeriod,
				formData.minutesPeriod
			);
			break;
		}
		default: {
			noteParams.selfDestructPeriod = SelfDestructPeriod.ReadOnce;
			noteParams.numberOfReadsBeforeBurn = 1;
			break;
		}
	}

	return new Note(noteParams);
};

const calculateBurnDate = (createdOn, daysPeriod, hoursPeriod, minutesPeriod) => {
	const burnDate = new Date(createdOn);
	burnDate.setDate(burnDate.getDate() + Number(daysPeriod));
	burnDate.setHours(burnDate.getHours() + Number(hoursPeriod));
	burnDate.setMinutes(burnDate.getMinutes() + Number(minutesPeriod));

	return burnDate.toISOString();
};

const hashPassword = password => {
	if (!password) {
		return undefined;
	}

	return bcrypt.hashSync(password, 10);
};
