import Head from 'next/head';
import styles from '../styles/Home.module.css';
import GameCard from '../components/GameCard';
import Header from '../components/Header';
import data from './data';
import { useState } from 'react';

export default function Home() {
	// const [fixtures, setFixtures] = useState(data);

	return (
		<div className={styles.container}>
			<Head>
				<title>Score Predictor</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Header />
				{data.map((fixture) => (
					<GameCard {...fixture} />
				))}
			</main>
		</div>
	);
}
