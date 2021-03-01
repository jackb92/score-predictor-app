import styles from '../styles/GameCard.module.css';
import React, { useState, useEffect } from 'react';
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
const buttonContainerStyleMap = {
	a: styles.teamAButtonContainer,
	b: styles.teamBButtonContainer,
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
				<div className={teamNameAndScoreContainer}>
					<div className={teamNameStyles}>Team {team.toUpperCase()}</div>
					{predictedScore}
				</div>
			</div>
		</div>
	);
}

function PredictorButton({ team = 'a', predictedScore, setPredictedScore }) {
	const buttonContainerStyles = buttonContainerStyleMap[team];

	return (
		<div className={buttonContainerStyles}>
			<button
				aria-label={`Increment team ${team.toUpperCase()} score`}
				type="button"
				onClick={() => setPredictedScore(predictedScore + 1)}
				className={styles.incrementButton}>
				+
			</button>
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

function GameCard({ teamA, teamB, finalWhistle, kickoff }) {
	const [teamAPredictedScore, setTeamAPredictedScore] = useState(null);
	const [teamBPredictedScore, setTeamBPredictedScore] = useState(null);
	const [teamAActualScore, setTeamAActualScore] = useState(teamA.goalsScored);
	const [teamBActualScore, setTeamBActualScore] = useState(teamB.goalsScored);
	const [score, setScore] = useState(null);

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

	console.log(finalWhistle);

	return (
		<div className={styles.predictionMainContainer}>
			<TimeAndLocation />
			<div className={styles.gameContainer}>
				<TeamCard predictedScore={teamAPredictedScore} />
				{!finalWhistle && (
					<PredictorButton
						predictedScore={teamAPredictedScore}
						setPredictedScore={setTeamAPredictedScore}
					/>
				)}
				-
				<TeamCard team="b" predictedScore={teamBPredictedScore} />
				{!finalWhistle && (
					<PredictorButton
						team="b"
						predictedScore={teamBPredictedScore}
						setPredictedScore={setTeamBPredictedScore}
					/>
				)}
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

//update so cant predict if after kick off time
//add form to manually amend fixture data
//add stadium to gamecard
//add time to gamecard

const teamData = {
	Liverpool: {
		stadiumName: 'Anfield',
		clubCrest: 'liverpool.png',
	},
};
