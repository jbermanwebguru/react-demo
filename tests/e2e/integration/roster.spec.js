describe('Roster Page', () => {
	beforeEach(() => {
		cy.login();
		cy.server();
		cy.route('GET', 'https://some-api-goes-here.com/api/players', 'fixture:getPlayers.json');
	});

	it('Contains players', () => {
		cy.visit('/roster');
		cy.contains('Harry');
		cy.contains('Hermione');
		cy.contains('Ron');
	});
});
