/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Modal } from "antd";

type Props = {
    isOpen: boolean,
    close: () => void
}

export const HowToModal = ({ isOpen, close }: Props) => {
	return (
		<Modal 
			title="How to use this tool" 
			visible={isOpen} 
			onCancel={close} 
			destroyOnClose
			footer={null}
		>
			<p>
				<strong>Here's how it works:</strong>
			</p>
			<p>
				<ul>
					<li>Type a message and/or record audio</li>
					<li>Set your options for when you want it to self destruct</li>
					<ul>
						<li>The default options mean the message can only be loaded once</li>
					</ul>
					<li>A unique link will be generated. Share this with whoever</li>
					<ul>
						<li>e.g. <strong><a target="_blank">https://www.burnafterreading.xyz/abc123</a></strong></li>
					</ul>
					<li>After the conditions you specified are met the link will no longer work</li>
					<ul>
						<li>The user will get a message telling them the note doesn't exist</li>
					</ul>
				</ul>
			</p>
			<p>
				<strong>If I set a password, do you store it?</strong>
				<div>We encrypt the password (using bcrypt) and store the hash in our database within the note; the plaintext password is never stored.
				</div>
			</p>
		</Modal>
	);
};