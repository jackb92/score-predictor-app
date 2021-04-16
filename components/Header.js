import styles from '../styles/Header.module.css';
import Image from 'next/image';

function Header() {
	return (
		<div className={styles.headerContainer}>
			<a href="/home">
				<Image
					class="logo"
					src="/header-logo/football-icon.png"
					width={60}
					height={60}
				/>
			</a>
			Header content goes here
		</div>
	);
}

export default Header;
