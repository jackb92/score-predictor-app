import styles from '../styles/TeamCard.module.css';
import React, { useState, useEffect } from 'react';
import TimeAndLocation from './TimeAndLocation';
import TeamCard from './TeamCard';
import getPoints from './getPoints';

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
			<TimeAndLocation
				kickoffDetaiss={kickoffDetails}
				// stadiumName={stadiumName}
			/>
			<div className={styles.gameContainer}>
				<TeamCard
					predictedScore={teamAPredictedScore}
					setPredictedScore={setTeamAPredictedScore}
					finalWhistle={finalWhistle}
					kickoff={kickoff}
					homeClub={teamA.teamName}
				/>
				-
				<TeamCard
					homeOrAway="away"
					team="b"
					predictedScore={teamBPredictedScore}
					setPredictedScore={setTeamBPredictedScore}
					finalWhistle={finalWhistle}
					kickoff={kickoff}
					awayClub={teamB.teamName}
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

export default GameCard;
