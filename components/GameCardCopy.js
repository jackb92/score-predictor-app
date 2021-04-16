import styles from '../styles/TeamCard.module.css';
import React, { useState, useEffect } from 'react';
import TimeAndLocation from './TimeAndLocation';
import TeamCard from './TeamCard';
import getPoints from './getPoints';
import MinimiseButton from './MinimiseButton';

function GameCardCopy({ fixture }) {
	const options = {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};
	const [teamAPredictedScore, setTeamAPredictedScore] = useState(null);
	const [teamBPredictedScore, setTeamBPredictedScore] = useState(null);
	const [teamAActualScore, setTeamAActualScore] = useState(
		fixture.homeTeamScore
	);
	const [teamBActualScore, setTeamBActualScore] = useState(
		fixture.awayTeamScore
	);
	const [score, setScore] = useState(null);
	const [kickOffDetails] = useState(
		new Date(fixture.kickOff).toLocaleDateString('en-US', options)
	);
	const [unfilteredKickoff] = useState(fixture.kickOff);

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
			{/* <MinimiseButton /> */}
			<TimeAndLocation
				kickoffDetails={kickOffDetails}
				stadiumName={fixture.homeTeam.name}
			/>
			<div className={styles.gameContainer}>
				<TeamCard
					unfilteredKickoff={unfilteredKickoff}
					predictedScore={teamAPredictedScore}
					setPredictedScore={setTeamAPredictedScore}
					finalWhistle={fixture.finalWhistle}
					kickoff={kickOffDetails}
					homeClub={fixture.homeTeam.shortName}
				/>
				-
				<TeamCard
					homeOrAway="away"
					team="b"
					unfilteredKickoff={unfilteredKickoff}
					predictedScore={teamBPredictedScore}
					setPredictedScore={setTeamBPredictedScore}
					finalWhistle={fixture.finalWhistle}
					kickoff={kickOffDetails}
					awayClub={fixture.awayTeam.shortName}
				/>
			</div>
			{fixture.finalWhistle && (
				<div className={styles.generateScoreContainer}>
					{teamAActualScore} : {teamBActualScore}
				</div>
			)}
			{fixture.finalWhistle && <span>Your Score {score}</span>}
		</div>
	);
}

export default GameCardCopy;
