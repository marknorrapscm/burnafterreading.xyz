
export class NoteCreationResult {
    noteHash: string;
    burnImmediatelyHash: string;

    constructor(noteHash: string, burnImmediatelyHash: string) {
    	this.noteHash = noteHash;
    	this.burnImmediatelyHash = burnImmediatelyHash;
    }
}