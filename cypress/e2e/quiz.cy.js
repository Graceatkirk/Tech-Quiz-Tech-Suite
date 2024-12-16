describe('Tech Quiz End-to-End Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('starts the quiz and completes it', () => {
      cy.contains('Start Quiz').click();
      cy.get('[data-testid="question"]').should('be.visible');
      cy.get('[data-testid="answer-0"]').click({ multiple: true }); // Mock answering questions
      cy.contains('Your final score is').should('be.visible');
    });
  
    it('allows restarting the quiz', () => {
      cy.contains('Start Quiz').click();
      cy.get('[data-testid="answer-0"]').click({ multiple: true });
      cy.contains('Your final score is').should('be.visible');
      cy.contains('Start New Quiz').click();
      cy.contains('Start Quiz').should('be.visible');
    });
  });
  