export default function getPoints(
	teamAPrediction,
	teamBPrediction,
	teamAActual,
	teamBActual
) {
	const exactScorelinePredicted =
		teamAPrediction === teamAActual && teamBPrediction === teamBActual;
	const correctResultPredicted =
		teamAPrediction !== teamAActual || teamBPrediction !== teamBActual;
	const correctResultTeamAWin =
		teamAPrediction > teamBPrediction && teamAActual > teamBActual;
	const correctResultTeamBWin =
		teamBPrediction > teamAPrediction && teamBActual > teamAActual;
	const correctResultDraw =
		teamAPrediction === teamBPrediction && teamAActual === teamBActual;

	if (exactScorelinePredicted) {
		return 5;
	}

	if (correctResultPredicted) {
		if (correctResultTeamAWin) {
			return 3;
		}
		if (correctResultTeamBWin) {
			return 3;
		}
		if (correctResultDraw) {
			return 3;
		}
	}

	return 0;
}
