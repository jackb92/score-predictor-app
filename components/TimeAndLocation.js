import styles from '../styles/TimeAndLocation.module.css';

export default function TimeAndLocation({ kickoffDetails, stadiumName }) {
	return (
		<div className={styles.gameDetailsContainer}>
			<div>{stadiumName}</div>
			<div>{kickoffDetails}</div>
		</div>
	);
}
