import useSWR from 'swr';
import GameCardCopy from '../components/GameCardCopy';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
	const { data, error } = useSWR('/api/fixtures', fetcher);

	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;

	return (
		<div className={styles.container}>
			<Head>
				<title>Score Predictor</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Header />
				{data.map((fixture) => (
					<GameCardCopy fixture={fixture} />
				))}
			</main>
		</div>
	);
}
