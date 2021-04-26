import React, { useState } from "react";
import { Button, Col, Input, Row } from "antd";
import { Note } from "../lib/Note";
import { BurnNotificationModal } from "./BurnNotificationModal";
import { BurnImmediatelyButton } from "./BurnImmediatelyButton";
import { AudioPlayer } from "./AudioPlayer";
import { MessageViewer } from "./MessageViewer";
import "./NoteDisplay.css";

type Props = {
    note: Note
	onNoteBurned: () => void
}

export const NoteDisplay = ({ note, onNoteBurned }: Props) => {
	const [isBurnNotificationModalOpen, setIsBurnNotificationModalOpen] = useState(false);

	return (
		<>
			<MessageViewer message={note?.message} />
			
			<AudioPlayer audioFileName={note.audioFileName} />
					
			<Row className="mt-1">
				<Col xs={24} sm={12} className="text-left">
					{note?.numberOfReadsBeforeBurn && (
						<Button
							type="default"
							className="info-btn"
							disabled
						>
							Note has now been read {note?.readCount} out of {note?.numberOfReadsBeforeBurn} times
						</Button>
					)}
				</Col>

				<Col xs={24} sm={12} className="text-right">
					{note?.hasBeenBurned ? (
						<Button
							type="primary"
							className="burn-btn"
							danger
							onClick={() => setIsBurnNotificationModalOpen(true)}
						>
							Note has been burned
						</Button>
					) : (
						<BurnImmediatelyButton
							noteHash={note.noteHash}
							onNoteBurned={onNoteBurned}
						/>
					)}
				</Col>
			</Row>

			<BurnNotificationModal
				isOpen={isBurnNotificationModalOpen}
				close={() => setIsBurnNotificationModalOpen(false)}
			/>
		</>
	);
};
