describe("Result Prediction BDD", () => {
    it('Should display Team A vs Team B on the page', () => {

    })

    it('Should have an empty score input box for Team A', () => {

    })

    it('Should have a + button that increments score in box by 1 for Team A', () => {
        cy.visit("/")
        cy.findByText('Team A 0')
        cy.findByRole('button', {
            name: 'Increment team A score'
        }).click()
        cy.findByText('Team A 1')
    })

    it('Should have a - button that decrements score by 1 for Team A', () => {
        cy.findByText('Team A 1')
        cy.findByRole('button', {
            name: 'Decrement team A score'
        }).click()
        cy.findByText('Team B 0')
    })

    it('Should not allow a user to decrement score below 0', () =>{

    })

    //it.todo('Should display 0 in box on first click of + button')
})