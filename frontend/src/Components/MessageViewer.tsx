import { Input } from "antd";
import React, { useState } from "react";

type Props = {
    message: string | undefined
}

export const MessageViewer = ({ message }: Props) => {
	return (
		<>
			{message !== undefined && (
				<Input.TextArea
					className="message-textarea"
					autoSize={{ minRows: 5 }}
					defaultValue={message}
					readOnly
				/>
			)}
		</>
	);
};
