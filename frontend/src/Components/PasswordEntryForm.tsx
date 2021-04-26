import React, { useState } from "react";
import { Button, Input } from "antd";

type Props = {
    onPasswordSubmitted: (password: string) => void,
    showIncorrectPasswordMessage: boolean
}

export const PasswordEntryForm = ({ onPasswordSubmitted, showIncorrectPasswordMessage }: Props) => {
	const [password, setPassword] = useState("");

	return (
		<div>
			<h4 className="mb-3">A password is required to view this note:</h4>

			<div style={{ display: "flex", maxWidth: "300px", margin: "auto" }}>
				<Input.Password
					onChange={e => setPassword(e.target.value)}
				/>
				<Button 
					type="primary" 
					onClick={() => onPasswordSubmitted(password)} 
				>
                    Submit
				</Button>
			</div>

			{showIncorrectPasswordMessage && (
				<small style={{ color: "red" }}>Password is incorrect</small>
			)}
		</div>
	);
};
