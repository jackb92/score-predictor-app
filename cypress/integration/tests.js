describe('Result Prediction BDD', () => {
	it('Should display Team A & Team B on the page', () => {
		cy.visit('/');
		cy.findByText('Team A');
		cy.findByText('Team B');
	});

	it('Should have default score of 0-0', () => {
		cy.findByText('0-0');
	});

	it('Should have a + button that increments score in box by 1 for Team A', () => {
		cy.findByText('Team A 0');
		cy.findByRole('button', {
			name: 'Increment team A score',
		}).click();
		cy.findByText('Team A 1');
	});

	it('Should have a - button that decrements score by 1 for Team A', () => {
		cy.findByText('Team A 1');
		cy.findByRole('button', {
			name: 'Decrement team A score',
		}).click();
		cy.findByText('Team B 0');
	});

	it('Should not allow a user to decrement score below 0', () => {});
});
