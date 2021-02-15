import styles from '../styles/GameCard.module.css';
import React, { useState } from 'react';
import Image from 'next/image';

const teamContainerStyleMap = {
	a: styles.teamAContainer,
	b: styles.teamBContainer,
};
const teamNameStyleMap = {
	a: styles.teamANameStyle,
	b: styles.teamBNameStyle,
};
const teamNameAndScoreContainerMap = {
	a: styles.teamANameAndScoreContainer,
	b: styles.teamBNameAndScoreContainer,
};
const teamCrestContainerMap = {
	a: styles.teamACrestContainer,
	b: styles.teamBCrestContainer,
};

const clubCrestImageMap = {
	a: <Image src="/club-crest-image/liverpool.png" width={25} height={37.5} />,
	b: (
		<Image
			src="/club-crest-image/manchester-united.png"
			width={30}
			height={32}
		/>
	),
};

function TeamCard({ team = 'a', predictedScore, setPredictedScore }) {
	const teamContainerStyles = teamContainerStyleMap[team];
	const teamNameStyles = teamNameStyleMap[team];
	const teamNameAndScoreContainer = teamNameAndScoreContainerMap[team];
	const teamCrestContainer = teamCrestContainerMap[team];
	const clubCrestImage = clubCrestImageMap[team];

	return (
		<div className={teamContainerStyles}>
			<div className={teamCrestContainer}>{clubCrestImage}</div>
			<div className={styles.scorePredictContainer}>
				<button
					aria-label={`Increment team ${team.toUpperCase()} score`}
					type="button"
					onClick={() => setPredictedScore(predictedScore + 1)}
					className={styles.incrementButton}>
					+
				</button>
				<div className={teamNameAndScoreContainer}>
					<div className={teamNameStyles}>Team {team.toUpperCase()}</div>
					{predictedScore}
				</div>
				<button
					aria-label={`Decrement team ${team.toUpperCase()} score`}
					type="button"
					onClick={() => {
						predictedScore === 0
							? setPredictedScore(0)
							: setPredictedScore(predictedScore - 1);
					}}
					className={styles.decrementButton}>
					-
				</button>
			</div>
		</div>
	);
}

function TimeAndLocation() {
	return (
		<div className={styles.gameDetailsContainer}>
			<div>Anfield</div>
			<div>02 February 15:00</div>
		</div>
	);
}

function ScoreGeneratorButton({ setTeamAScore, setTeamBScore }) {
	return (
		<button
			onClick={() => {
				setTeamAScore(Math.floor(Math.random() * 5));
				setTeamBScore(Math.floor(Math.random() * 5));
			}}>
			Generate Result
		</button>
	);
}

function GameCard() {
	const [teamAPredictedScore, setTeamAPredictedScore] = useState(0);
	const [teamBPredictedScore, setTeamBPredictedScore] = useState(0);
	const [teamAActualScore, setTeamAActualScore] = useState(0);
	const [teamBActualScore, setTeamBActualScore] = useState(0);

	return (
		<div className={styles.predictionMainContainer}>
			<TimeAndLocation />
			<div className={styles.gameContainer}>
				<TeamCard
					predictedScore={teamAPredictedScore}
					setPredictedScore={setTeamAPredictedScore}
				/>
				-
				<TeamCard
					team="b"
					predictedScore={teamBPredictedScore}
					setPredictedScore={setTeamBPredictedScore}
				/>
			</div>
			<div className={styles.generateScoreContainer}>
				<ScoreGeneratorButton
					setTeamAScore={setTeamAActualScore}
					setTeamBScore={setTeamBActualScore}
				/>
				{teamAActualScore} : {teamBActualScore}
			</div>
		</div>
	);
}

export function getPoints(
	teamAPrediction,
	teamBPrediction,
	teamAActual,
	teamBActual
) {
	const exactScorelinePredicted =
		teamAPrediction === teamAActual && teamBPrediction === teamBActual;
	const correctResultPredicted =
		teamAPrediction !== teamAActual || teamBPrediction !== teamBActual;
	const correctResultTeamAWin =
		teamAPrediction > teamBPrediction && teamAActual > teamBActual;
	const correctResultTeamBWin =
		teamBPrediction > teamAPrediction && teamBActual > teamAActual;
	const correctResultDraw =
		teamAPrediction === teamBPrediction && teamAActual === teamBActual;

	if (exactScorelinePredicted) {
		return 5;
	}

	if (correctResultPredicted) {
		if (correctResultTeamAWin) {
			return 3;
		}
		if (correctResultTeamBWin) {
			return 3;
		}
		if (correctResultDraw) {
			return 3;
		}
	}

	return 0;
}

export default GameCard;
