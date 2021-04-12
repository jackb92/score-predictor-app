import styles from '../styles/TeamCard.module.css';
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

const currentDate = new Date();

export default function TeamCard({
	team = 'a',
	predictedScore,
	setPredictedScore,
	kickoff,
	homeClub,
	awayClub,
}) {
	const teamContainerStyles = teamContainerStyleMap[team];
	const teamNameStyles = teamNameStyleMap[team];
	const teamNameAndScoreContainer = teamNameAndScoreContainerMap[team];
	const teamCrestContainer = teamCrestContainerMap[team];
	const clubCrestImage = clubCrestImageMap[team];

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

	function homeOrAwayClub(team) {
		if (team === 'a') {
			return <div className={teamNameStyles}>{homeClub}</div>;
		}

		return <div className={teamNameStyles}>{awayClub}</div>;
	}

	return (
		<div className={teamContainerStyles}>
			<div className={teamCrestContainer}>{clubCrestImage}</div>
			<div className={styles.scorePredictContainer}>
				{displayIncrementPredictionButton()}
				<div className={teamNameAndScoreContainer}>
					{homeOrAwayClub(team)}
					{predictedScore}
				</div>
				{displayDecrementPredictionButton()}
			</div>
		</div>
	);
}
