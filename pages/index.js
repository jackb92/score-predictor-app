import Head from 'next/head'
import styles from '../styles/Home.module.css'
import FixturesTable from '../components/FixturesTable'
import GameCard from '../components/GameCard'
import Header from '../components/Header'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Score Predictor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header/>
        <GameCard/>
      </main>
    </div>
  )
}
