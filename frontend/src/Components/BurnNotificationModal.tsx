/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Modal } from "antd";

type Props = {
    isOpen: boolean,
    close: () => void
}

export const BurnNotificationModal = ({ isOpen, close }: Props) => {
	return (
		<Modal 
			visible={isOpen} 
			onCancel={close} 
			destroyOnClose
			footer={null}
		>
			<p className="mt-4">
				The self-destruct conditions set when this note was created have been met. This is
				the last time this note can be viewed.
			</p>
			<p className="mb-0">
				Refreshing this page or sharing the link with someone else will return an error 
				message.
			</p>
		</Modal>
	);
};