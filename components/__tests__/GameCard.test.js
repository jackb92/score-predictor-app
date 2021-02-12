import { getPoints } from '../GameCard';

describe('Game card', () => {
	it.each`
		teamAPrediction | teamBPrediction | teamAActual | teamBActual | points
		${0}            | ${0}            | ${1}        | ${2}        | ${0}
		${0}            | ${0}            | ${0}        | ${0}        | ${5}
		${1}            | ${1}            | ${2}        | ${2}        | ${3}
		${1}            | ${0}            | ${0}        | ${2}        | ${0}
	`(
		'Should return $points when given $teamAPrediction, $teamBPrediction, $teamAActual, $teamBActual',
		({
			teamAPrediction,
			teamBPrediction,
			teamAActual,
			teamBActual,
			points,
		}) => {
			expect(
				getPoints(teamAPrediction, teamBPrediction, teamAActual, teamBActual)
			).toEqual(points);
		}
	);
});
