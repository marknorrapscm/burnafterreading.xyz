import React, { useState, useEffect } from "react";
import { Card, Spin } from "antd";
import { useParams } from "react-router";
import { getBaseUrl } from "../lib/get-base-url";
import { Note } from "../lib/Note";
import { NoteDisplay } from "../Components/NoteDisplay";
import { PasswordEntryForm } from "../Components/PasswordEntryForm";
import "./ViewNote.css";

interface RouteParams {
	noteHash: string
}

export const ViewNote = () => {
	const { noteHash } = useParams<RouteParams>();
	const [note, setNote] = useState<Note>();
	const [isLoading, setIsLoading] = useState(true);
	const [showPasswordEnryForm, setShowPasswordEnryForm] = useState(false);
	const [showIncorrectPasswordMessage, setShowIncorrectPasswordMessage] = useState(false);

	useEffect(() => {
		loadNote("");
	}, []);

	const loadNote = async (password: string) => {
		setIsLoading(true);
		const res = await fetchNoteFromServer(password);

		if (res.success) {
			setNote(res.note);
		} else {
			handleUnsuccessfulRequest(res.message);
		}
		setIsLoading(false);
	};

	const fetchNoteFromServer = async (password: string) => {
		const url = getBaseUrl(true);
		const param = buildParams(password);
		const res = await fetch(`${url}/getNote?${param}`, { method: "GET" });
		return res.json();
	};

	const handleUnsuccessfulRequest = (errorMessage: string) => {
		switch (errorMessage) {
			case "Password required": { setShowPasswordEnryForm(true); break; }
			case "Password is incorrect": { setShowIncorrectPasswordMessage(true); break; }
			default: { 
				setShowPasswordEnryForm(false);
				setNote(undefined);
				break; 
			}
		}
	};

	const buildParams = (password: string) => {
		const params = new URLSearchParams();
		params.append("noteHash", noteHash);

		if (password) {
			params.append("password", password);
		}

		return params;
	};

	const onPasswordSubmitted = async (password: string) => {
		await loadNote(password);
	};

	const onNoteBurned = () => {
		setShowPasswordEnryForm(false);
		setShowIncorrectPasswordMessage(false);
		setNote(undefined);
	};

	return (
		<Card className="view-note-card">
			{isLoading ? (
				<Spin />
			) : note ? (
				<NoteDisplay
					note={note}
					onNoteBurned={onNoteBurned}
				/>

			) : showPasswordEnryForm ? (
				<PasswordEntryForm
					onPasswordSubmitted={onPasswordSubmitted}
					showIncorrectPasswordMessage={showIncorrectPasswordMessage}
				/>
			) : (
				<h3 className="mb-0">
						No note with hash {noteHash} found
				</h3>
			)}
		</Card>
	);
};
