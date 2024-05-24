/**
 * Login scenario:
 * 1. should display login page correctly
 * 2. should display alert when email is empty
 * 3. should display alert when password is empty
 * 4. should display alert when email and password are wrong
 * 5. should display threadpage when email and password are correct
 */

describe('Login scenarion', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="example@gmail.com"]').should('be.visible');
    cy.get('input[placeholder="*******"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="example@gmail.com"').type('test@gmail.com');
    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="example@gmail.com"').type('test@gmail.com');
    cy.get('input[placeholder="*******"').type('wrong-password');
    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display threadpage when email and password are correct', () => {
    cy.get('input[placeholder="example@gmail.com"').type('sabo@gmail.com');
    cy.get('input[placeholder="*******"').type('sabo123');
    cy.get('button').contains(/^Login$/).click();
    cy.get('nav').should('be.visible');
    cy.get('main').contains('Discussion Available').should('be.visible');
  });
});
