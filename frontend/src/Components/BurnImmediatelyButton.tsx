/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Button, notification, Popconfirm } from "antd";
import { getBaseUrl } from "../lib/get-base-url";
import "./BurnImmediatelyButton.css";

type Props = {
	noteHash: string,
	onNoteBurned: () => void
}

export const BurnImmediatelyButton = ({ noteHash, onNoteBurned }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	const onConfirmClicked = async () => {
		setIsLoading(true);
		await burnNote();
		setIsLoading(false);
		onNoteBurned();
	};

	const burnNote = async () => {
		const burnResult = await makeApiCallToBurnNote();
		burnResult.success
			? onBurnSuccess()
			: onBurnFailure();
	};

	const onBurnSuccess = () => {
		notification.success({
			message: "Note successfully destroyed",
			placement: "topRight",
		});
	};

	const onBurnFailure = () => {
		notification.error({
			message: "Error destroying note",
			placement: "topRight",
		});
	};

	const makeApiCallToBurnNote = async () => {
		const url = getBaseUrl(true);
		const param = new URLSearchParams({ noteHash: noteHash });
		const res = await fetch(`${url}/burnNoteImmediately?${param}`, { method: "GET" });
		return res.json();
	};

	return (
		<Popconfirm
			placement="top"
			title="Are you sure? This cannot be undone."
			onConfirm={() => onConfirmClicked()}
			okText="Yes, destroy the note"
			cancelText="Cancel"
		>
			<Button
				type="default"
				className="burn-btn"
				danger
				loading={isLoading}
			>
					Burn note immediately
			</Button>
		</Popconfirm>
	);
};