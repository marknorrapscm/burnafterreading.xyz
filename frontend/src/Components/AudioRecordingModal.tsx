import React, { useState } from "react";
import { Alert, Modal, notification } from "antd";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
import "./AudioRecordingModal.css";
import { getBaseUrl } from "../lib/get-base-url";
import { isBrowserSafari } from "../lib/is-browser-safari";

type Props = {
	isOpen: boolean,
	close: (fileName: string | undefined) => void
}

const emptyAudioDetails = {
	url: null,
	blob: null,
	chunks: null,
	duration: {
		h: 0,
		m: 0,
		s: 0
	}
};

export const AudioRecordingModal = ({ isOpen, close }: Props) => {
	const [uploadButtonIsDisabled, setUploadButtonIsDisabled] = useState(true);
	const [audioDetails, setAudioDetails] = useState(emptyAudioDetails);
	const [errorMessage, setErrorMessage] = useState("");

	const handleAudioStop = (data: any) => {
		setAudioDetails(data);
		if(data.duration.m > 0) {
			setUploadButtonIsDisabled(true);
			setErrorMessage("Audio must be less than 1 minute; please re-record");
		} else {
			setUploadButtonIsDisabled(false);
			setErrorMessage("");
		}
	};

	const handleReset = () => {
		setAudioDetails(emptyAudioDetails);
		setUploadButtonIsDisabled(true);
		setErrorMessage("");
	};

	const handleAudioUpload = (blob: Blob) => {
		performUpload(blob);
	};

	const performUpload = async (blob: Blob) => {
		const { uploadUrl, fileNameWithExtension } = await getPresignedUrl();
		const uploadRes = await sendFileToPresignedUrl(uploadUrl, blob);

		if (uploadRes) {
			onUploadSuccess(fileNameWithExtension);
		} else {
			onUploadFailure();
		}
	};

	const onUploadSuccess = (fileNameWithExtension: string) => {
		close(fileNameWithExtension);
		notification.success({
			message: "Voice clip successfully uploaded",
			placement: "topRight",
		});
	};

	const onUploadFailure = () => {
		notification.error({
			message: "Error uploading audio",
			placement: "topRight",
		});
	};

	const getPresignedUrl = async () => {
		const res = await fetch(`${getBaseUrl(true)}/getAudioUploadUrl`, {
			method: "GET"
		});
		return res.json();
	};

	const sendFileToPresignedUrl = async (presignedUrl: string, file: Blob) => {
		const res = await fetch(presignedUrl, {
			method: "PUT",
			body: file,
			headers: {
				"Content-Type": "audio/webm"
			}
		});

		if (res.status === 200) {
			return true;
		} else {
			console.error(res);
			return false;
		}
	};

	return (
		<Modal
			visible={isOpen}
			onCancel={() => close(undefined)}
			destroyOnClose
			footer={null}
		>

			{isBrowserSafari() || (
				<>
					<h3>Record up to 1 minute of audio:</h3>
		
					<Recorder
						record={true}
						audioURL={audioDetails.url}
						showUIAudio
						handleAudioStop={(data: any) => handleAudioStop(data)}
						handleAudioUpload={(data: Blob) => handleAudioUpload(data)}
						handleReset={() => handleReset()}
						hideHeader={true}
						mimeTypeToUseWhenRecording="audio/webm"
						uploadButtonDisabled={uploadButtonIsDisabled}
					/>
				</>
			)}

			<Alert 
				className="mt-2"
				type="warning" 
				message="Audio recording and playback isn't supported in Safari because Safari does not yet support the .webm audio format or the MediaRecorder API." 
			/>

			{errorMessage === "" || (
				<Alert
					className="mt-2"
					message={errorMessage} 
					type="error" 
				/>
			)}
		</Modal>
	);
};