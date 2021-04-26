import { SelfDestructPeriod } from "./SelfDestructPeriod";

export interface Note {
	noteHash: string,
	hasBeenBurned: boolean,
    message: string,
    selfDestructPeriod: SelfDestructPeriod,
	burnImmediatelyHash: string,
	createdOn: string,
    readCount: number,
    numberOfReadsBeforeBurn: number,
    dateToBurn: string,
    isPasswordRequired: boolean,
    password: string,
    sendEmail: boolean,
    emailAddress: string,
    audioFileName: string | undefined
}
