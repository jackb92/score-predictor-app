import styles from '../styles/MinimiseButton.module.css';
import React, { useState } from 'react';

export default function MinimiseButton() {
	const [showMe, setShowMe] = useState(false);

	function toggle() {
		setShowMe(!showMe);
	}
	return (
		<>
			<button onClick={toggle} className={styles.minimiseButton} type="button">
				-
			</button>
			<div
				style={{
					display: showMe ? 'block' : 'none',
				}}>
				This should toggle my display
			</div>
		</>
	);
}
