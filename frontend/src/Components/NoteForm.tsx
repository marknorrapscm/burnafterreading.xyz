import React, { useState } from "react";
import { Button, Row, Col, Form, Input, Divider, Select, Popconfirm, notification, Checkbox } from "antd";
import { ReactComponent as Microphone } from "../images/microphone.svg";
import { ReactComponent as Tick } from "../images/tick.svg";
import { getBaseUrl } from "../lib/get-base-url";
import { NoteCreationResult } from "../lib/NoteCreationResult";
import { SelfDestructPeriod } from "../lib/SelfDestructPeriod";
import { AudioRecordingModal } from "./AudioRecordingModal";
import "./NoteForm.css";

const integerRule = {
	required: true,
	pattern: new RegExp(/^[0-9]+$/),
	message: "Integer required"
};

type Props = {
	onNoteCreated: (noteCreationResult: NoteCreationResult) => void
}

export const NoteForm = ({ onNoteCreated }: Props) => {
	const [selfDestructPeriodType, setSelfDestructPeriodType] = useState(SelfDestructPeriod.ReadOnce);
	const [isLoading, setIsLoading] = useState(false);
	const [isPasswordRequired, setIsPasswordRequired] = useState(false);
	const [sendEmailNotification, setSendEmailNotification] = useState(false);
	const [isAudioRecordingModalOpen, setIsAudioRecordingModalOpen] = useState(false);
	const [audioFileName, setAudioFileName] = useState<string | undefined>(undefined);

	const onDestructPeriodOptionChanged = (e: string) => {
		setSelfDestructPeriodType(SelfDestructPeriod[e as keyof typeof SelfDestructPeriod]);
	};

	const onSubmit = async (formData: Record<string, string>) => {
		setIsLoading(true);
		await createNote(formData);
		setIsLoading(false);
	};

	const createNote = async (formData: Record<string, string>) => {
		const formDataComplete = addExtrasToFormData(formData);
		const responseData = await makeRequestToCreateNote(formDataComplete);

		if(responseData.success) {
			onNoteCreationSuccess(responseData.noteHash, responseData.burnImmediatelyHash);
		} else {
			showFailureMessage(responseData.message);
		}
	};

	const addExtrasToFormData = (formData: Record<string, string>) => {
		if(audioFileName) { formData["audioFileName"] = audioFileName; }
		return formData;
	};

	const onNoteCreationSuccess = (noteHash: string, burnImmediatelyHash: string) => {
		const noteCreationResult = new NoteCreationResult(noteHash, burnImmediatelyHash);
		onNoteCreated(noteCreationResult);
		showSuccessMessage();
	};

	const showSuccessMessage = () => {
		notification.success({
			message: "Note created successfully",
			placement: "topRight",
		});
	};

	const showFailureMessage = (message: string) => {
		notification.error({
			message: `Error creating note: ${message}`,
			placement: "topRight",
		});
	};

	const makeRequestToCreateNote = async (formData: Record<string, string>) => {
		const res = await fetch(`${getBaseUrl(true)}/createNote`, {
			method: "POST",
			body: JSON.stringify({ 
				formData: formData 
			})
		});

		return res.json();
	};

	const onAudioRecordingModalClosed = (fileName: string | undefined) => {
		setIsAudioRecordingModalOpen(false);
		setAudioFileName(fileName);
	};

	return (
		<Form layout="vertical" onFinish={onSubmit}>
			<Form.Item 
				name="message" 
				rules={[{ 
					required: audioFileName === undefined, 
					message: "You must enter a message" 
				}]}
			>
				<Input.TextArea
					className="message-textarea"
					placeholder="Write your self destructing note here..."
					autoSize={{ minRows: 10, maxRows: 25 }}
					maxLength={30000}
				/>
			</Form.Item>

			<p className="text-center">...or...</p>

			

			<div className="text-center">
				{audioFileName === undefined ? (
					<Button 
						type="primary" 
						className="microphone-button"
						onClick={() => setIsAudioRecordingModalOpen(true)}
					>
						<div>Record Audio</div>
						<div>
							{audioFileName === undefined 
								? <Microphone /> 
								: <Tick className="tick" />}
						</div>
					</Button>
				) : (
					<Popconfirm
						placement="top"
						title="Are you sure you want to re-record? You original audio will be lost."
						onConfirm={() => setIsAudioRecordingModalOpen(true)}
						okText="Yes"
						cancelText="Cancel"
					>
						<Button 
							type="primary" 
							className="microphone-button"
						>
							<div>Record Audio</div>
							<div>
								{audioFileName === undefined 
									? <Microphone /> 
									: <Tick className="tick" />}
							</div>
						</Button>
					</Popconfirm>
				)}
			</div>

			<Divider className="options-divider" plain>Options</Divider>

			<Form.Item
				name="selfDestructPeriod"
				label="Message will self-destruct when...:"
				initialValue={SelfDestructPeriod.ReadOnce}
				rules={[{ required: true, message: "You must enter a message" }]}
			>
				<Select onChange={onDestructPeriodOptionChanged}>
					<Select.Option value={SelfDestructPeriod.ReadOnce}>...it has been read once</Select.Option>
					<Select.Option value={SelfDestructPeriod.ReadXTimes}>...it has been read x times</Select.Option>
					<Select.Option value={SelfDestructPeriod.CustomTimePeriodAfterCreation}>...after a period of time</Select.Option>
				</Select>
			</Form.Item>

			{(() => {
				switch (selfDestructPeriodType) {
					case SelfDestructPeriod.ReadOnce: { break; }
					case SelfDestructPeriod.ReadXTimes: {
						return (
							<Row>
								<Col xs={10}>
									<Form.Item
										name="numberOfReadsBeforeBurn"
										rules={[integerRule]}
									>
										<Input
											className="text-center"
											addonBefore="Destroy message after it is read:"
											placeholder="x"
											maxLength={5}
											addonAfter="times"
											style={{ minWidth: "320px" }}
										/>
									</Form.Item>
								</Col>
							</Row>
						);
					}
					case SelfDestructPeriod.CustomTimePeriodAfterCreation: {
						return (
							<Row>
								<Col xs={24}>
									<Input.Group compact>
										<Form.Item
											name="daysPeriod"
											rules={[integerRule]}
											initialValue="0"
										>
											<Input
												className="text-center"
												addonBefore="Destroy message"
												placeholder="x"
												maxLength={2}
												addonAfter="days,"
												style={{ width: "230px" }}
											/>
										</Form.Item>
										<Form.Item
											name="hoursPeriod"
											rules={[integerRule]}
											initialValue="0"
										>
											<Input
												className="text-center no-left-border-radius"
												placeholder="x"
												maxLength={2}
												addonAfter="hours and"
												style={{ width: "128px" }}
											/>
										</Form.Item>
										<Form.Item
											name="minutesPeriod"
											rules={[integerRule]}
											initialValue="5"
										>
											<Input
												className="text-center no-left-border-radius"
												placeholder="x"
												maxLength={2}
												addonAfter="minutes after it is created"
												style={{ width: "220px" }}
											/>
										</Form.Item>
									</Input.Group>
								</Col>
							</Row>
						);
					}
				}
			})()}

			<Row gutter={12}>
				<Col xs={24} md={12}>
					<Form.Item
						name="isPasswordRequired"
						className="m-0"
						valuePropName="checked"
						initialValue={false}
						required
					>
						<Checkbox onChange={(e) => setIsPasswordRequired(e.target.checked)}>Require password to view?</Checkbox>
					</Form.Item>
					<Form.Item name="password">
						<Input.Password
							disabled={!isPasswordRequired}
							maxLength={64}
							required
						/>
					</Form.Item>
				</Col>

				<Col xs={24} md={12}>
					<Form.Item
						name="sendEmail"
						className="m-0"
						valuePropName="checked"
						initialValue={false}
						required
					>
						<Checkbox onChange={(e) => setSendEmailNotification(e.target.checked)}>Send email when first read?</Checkbox>
					</Form.Item>
					<Form.Item name="emailAddress">
						<Input
							disabled={!sendEmailNotification}
							type="email"
							maxLength={64}
							required
						/>
					</Form.Item>
				</Col>
			</Row>

			<Row>
				<Col xs={24} className="text-left">
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={isLoading}>
							Create note
						</Button>
					</Form.Item>
				</Col>
			</Row>

			<AudioRecordingModal
				isOpen={isAudioRecordingModalOpen}
				close={onAudioRecordingModalClosed}
			/>
		</Form>
	);
};
