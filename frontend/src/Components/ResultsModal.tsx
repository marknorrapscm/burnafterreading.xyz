/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Button, Input, Modal } from "antd";
import { NoteCreationResult } from "../lib/NoteCreationResult";
import { getBaseUrl } from "../lib/get-base-url";

type Props = {
    isOpen: boolean,
    onClose: () => void,
	result: NoteCreationResult | undefined
}

export const ResultsModal = ({ isOpen, onClose, result }: Props) => {
	return (
		isOpen ? (
			<Modal 
				title="Note created" 
				visible={isOpen} 
				onCancel={onClose} 
				destroyOnClose
				footer={null}
			>
				<p>
					<strong>Your note has been created!</strong>
				</p>
				<p>
					It can be read / listened to by visiting this URL:
				</p>
				<p className="text-center my-4">
					<Input 
						defaultValue={`${getBaseUrl()}/${result?.noteHash}`} 
						className="text-center"
						id="url-input"
						style={{ width: "65%", marginLeft: "auto" }}
					/>
					<Button 
						type="primary"
						onClick={() => {
							navigator.clipboard.writeText(`${getBaseUrl()}/${result?.noteHash}`);
							const input = document.getElementById("url-input") as HTMLInputElement;
							input.focus();
							input.select();
						}}
					>
						Copy
					</Button>
				</p>
				<p>
					Remember, visiting this URL may destroy the note depending on what settings you have selected, so share it wisely.
				</p>
				<p>
					You can decide to destroy the note immediately by visiting this URL:
				</p>
				<p className="text-center my-4">
					<Input 
						defaultValue={`${getBaseUrl()}/${result?.noteHash}?burnHash=${result?.burnImmediatelyHash}`} 
						className="text-center"
						id="burn-immediately-input"
						style={{ width: "65%", marginLeft: "auto" }}
					/>
					<Button 
						type="primary"
						onClick={() => {
							navigator.clipboard.writeText(`${getBaseUrl()}/${result?.noteHash}?burnHash=${result?.burnImmediatelyHash}`);
							const input = document.getElementById("burn-immediately-input") as HTMLInputElement;
							input.focus();
							input.select();
						}}
					>
						Copy
					</Button>
				</p>
			</Modal>
		) : (
			<></>
		)

	);
};