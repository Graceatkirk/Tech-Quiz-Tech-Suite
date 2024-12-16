import React from 'react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component Tests', () => {
    beforeEach(() => {
      cy.fixture('questions.json').then((questions) => {
        cy.intercept('GET', '/api/questions', questions).as('getQuestions');
      });
    });
  
    it('renders the start button initially', () => {
      cy.mount(<Quiz />);
      cy.contains('Start Quiz').should('be.visible');
    });
  
    it('starts the quiz and displays the first question', () => {
      cy.mount(<Quiz />);
      cy.contains('Start Quiz').click();
      cy.wait('@getQuestions');
      cy.contains('Question 1').should('be.visible');
    });
  
    it('proceeds to the next question after answering', () => {
      cy.mount(<Quiz />);
      cy.contains('Start Quiz').click();
      cy.wait('@getQuestions');
      cy.get('[data-testid="answer-0"]').click(); // Mock answer button
      cy.contains('Question 2').should('be.visible');
    });
  
    it('shows the final score after all questions are answered', () => {
      cy.mount(<Quiz />);
      cy.contains('Start Quiz').click();
      // Mock behavior for answering all questions
      cy.get('[data-testid="answer-0"]').click({ multiple: true });
      cy.contains('Your final score is').should('be.visible');
    });
  });
  