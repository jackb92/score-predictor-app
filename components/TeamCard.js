import styles from '../styles/TeamCard.module.css';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';

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
	a: (
		<Image
			src="/club-crest-image/liverpool.png"
			width={25}
			height={37.5}
			alt="Liverpool club crest"
		/>
	),
	b: (
		<Image
			src="/club-crest-image/manchester-united.png"
			width={30}
			height={32}
			alt="Manchester United club crest"
		/>
	),
};

const currentDate = new Date();

export default function TeamCard({
	team = 'a',
	predictedScore,
	setPredictedScore,
	unfilteredKickoff,
	homeClub,
	awayClub,
}) {
	const teamContainerStyles = teamContainerStyleMap[team];
	const teamNameStyles = teamNameStyleMap[team];
	const teamNameAndScoreContainer = teamNameAndScoreContainerMap[team];
	const teamCrestContainer = teamCrestContainerMap[team];
	const clubCrestImage = clubCrestImageMap[team];

	function displayIncrementPredictionButton() {
		if (currentDate > new Date(unfilteredKickoff)) {
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
		if (currentDate > new Date(unfilteredKickoff)) {
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

	function previousFixturesPopOut() {
		const [show, setShow] = useState(false);
		const target = useRef(null);

		return (
			<>
				<Button ref={target} onClick={() => setShow(!show)}>
					Click me to see
				</Button>
				<Overlay target={target.current} show={show} placement="right">
					{({ placement, arrowProps, show: _show, popper, ...props }) => (
						<div {...props}>Simple tooltip</div>
					)}
				</Overlay>
			</>
		);
	}

	return (
		<div className={teamContainerStyles}>
			{/* <div>{previousFixturesPopOut()}</div> */}
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
