import React, { useState } from "react";
import { Button, Card, Divider } from "antd";
import { NoteForm } from "../Components/NoteForm";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { HowToModal } from "../Components/HowToModal";
import { ResultsModal } from "../Components/ResultsModal";
import { NoteCreationResult } from "../lib/NoteCreationResult";
import "./Home.css";

export const Home = () => {
	const [isHowToModalOpen, setIsHowToModalOpen] = useState(false);
	const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
	const [result, setResult] = useState<NoteCreationResult>();

	const onNoteCreated = (result: NoteCreationResult) => {
		setResult(result);
		setIsResultsModalOpen(true);
	};

	const onResultsModalClosed = () => {
		setIsResultsModalOpen(false);
	};

	return (
		<Card className="home-card">
			<Button
				className="how-this-works-button"
				type="primary"
				icon={<QuestionCircleOutlined />}
				onClick={() => setIsHowToModalOpen(true)}
			>
				How this works
			</Button>

			<Divider plain className="top-divider">
				Record self destructing message
			</Divider>

			<NoteForm onNoteCreated={onNoteCreated} />

			<HowToModal
				isOpen={isHowToModalOpen}
				close={() => setIsHowToModalOpen(false)}
			/>

			<ResultsModal
				isOpen={isResultsModalOpen}
				onClose={onResultsModalClosed}
				result={result}
			/>
		</Card>
	);
};