import styles from '../styles/GameCard.module.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import data from '../pages/data';

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

const currentDate = new Date();

function TeamCard({ team = 'a', predictedScore, setPredictedScore, kickoff }) {
	function displayIncrementPredictionButton() {
		if (currentDate > kickoff) {
			return null;
		}

		return (
			<button
				aria-label={`Increment team ${team.toUpperCase()} score`}
				type="button"
				onClick={() => setPredictedScore(predictedScore + 1)}
				className={styles.incrementButton}>
				+
			</button>
		);
	}
	function displayDecrementPredictionButton() {
		const currentDate = new Date();

		if (currentDate > kickoff) {
			return null;
		}
		return (
			<button
				aria-label={`Decrement team ${team.toUpperCase()} score`}
				type="button"
				onClick={() => {
					predictedScore === 0 || predictedScore === null
						? setPredictedScore(0)
						: setPredictedScore(predictedScore - 1);
				}}
				className={styles.decrementButton}>
				-
			</button>
		);
	}
	const teamContainerStyles = teamContainerStyleMap[team];
	const teamNameStyles = teamNameStyleMap[team];
	const teamNameAndScoreContainer = teamNameAndScoreContainerMap[team];
	const teamCrestContainer = teamCrestContainerMap[team];
	const clubCrestImage = clubCrestImageMap[team];

	return (
		<div className={teamContainerStyles}>
			<div className={teamCrestContainer}>{clubCrestImage}</div>
			<div className={styles.scorePredictContainer}>
				{displayIncrementPredictionButton()}
				<div className={teamNameAndScoreContainer}>
					<div className={teamNameStyles}>Team {team.toUpperCase()}</div>
					{predictedScore}
				</div>
				{displayDecrementPredictionButton()}
			</div>
		</div>
	);
}

function TimeAndLocation({ kickoffDetails }) {
	return (
		<div className={styles.gameDetailsContainer}>
			<div>Anfield</div>
			<div>{kickoffDetails}</div>
		</div>
	);
}

function GameCard({ teamA, teamB, finalWhistle, kickoff }) {
	const options = {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};
	const [teamAPredictedScore, setTeamAPredictedScore] = useState(null);
	const [teamBPredictedScore, setTeamBPredictedScore] = useState(null);
	const [teamAActualScore, setTeamAActualScore] = useState(teamA.goalsScored);
	const [teamBActualScore, setTeamBActualScore] = useState(teamB.goalsScored);
	const [score, setScore] = useState(null);
	const [kickoffDetails] = useState(
		kickoff.toLocaleDateString('en-US', options)
	);

	useEffect(() => {
		if (teamAActualScore !== null && teamBActualScore !== null) {
			setScore(
				getPoints(
					teamAPredictedScore,
					teamBPredictedScore,
					teamAActualScore,
					teamBActualScore
				)
			);
		}
	}, [
		teamAPredictedScore,
		teamBPredictedScore,
		teamAActualScore,
		teamBActualScore,
		setScore,
	]);
	return (
		<div className={styles.predictionMainContainer}>
			<TimeAndLocation kickoffDetails={kickoffDetails} />
			<div className={styles.gameContainer}>
				<TeamCard
					predictedScore={teamAPredictedScore}
					setPredictedScore={setTeamAPredictedScore}
					finalWhistle={finalWhistle}
					kickoff={kickoff}
				/>
				-
				<TeamCard
					team="b"
					predictedScore={teamBPredictedScore}
					setPredictedScore={setTeamBPredictedScore}
					finalWhistle={finalWhistle}
					kickoff={kickoff}
				/>
			</div>
			{finalWhistle && (
				<div className={styles.generateScoreContainer}>
					{teamAActualScore} : {teamBActualScore}
				</div>
			)}
			{finalWhistle && <span>Your Score {score}</span>}
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

//add form to manually amend fixture data
//add stadium to gamecard

const teamData = {
	liverpool: {
		stadiumName: 'Anfield',
		clubCrest: 'liverpool.png',
	},
};
