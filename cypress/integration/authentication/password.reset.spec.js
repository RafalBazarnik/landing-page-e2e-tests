import faker from 'faker';

import dataObject from '../../support/dataObject';
import selectors from '../../selectors/selectors';


before(() => {
  cy.visit(`${dataObject.app_url}/#/reset-password`);
});

beforeEach(function () {
  cy.fixture('static_texts.json').as('staticTexts');
});

it('info about password visible and reset button disabled on enter', function () {
  cy.get(selectors.authentication.passwordResetMessage).invoke('text').should('eq', this.staticTexts.authentication.passwordResetInfo);
  cy.get(selectors.authentication.passwordResetButton).should('be.disabled');
});

it('text entered that is not a proper email', function () {
  cy.get(selectors.authentication.emailResetInput).clear().type(faker.name.firstName());
  cy.get(selectors.authentication.passwordResetButton).focus();
  cy.get(selectors.common.toastBody).invoke('text').should('eq', this.staticTexts.authentication.passwordResetIncorrectEmail);
  cy.get(selectors.common.closeToast).click();
  cy.hash().should('eq', '#/reset-password');
});

it('proper email submitted', function () {
  cy.server();
  cy.route('PATCH', '/users/reset-password').as('resetPATCH');
  cy.get(selectors.authentication.emailResetInput).clear().type(faker.internet.email(faker.random.uuid()));
  cy.get(selectors.authentication.passwordResetButton).click();
  cy.wait('@resetPATCH').then((resp) => {
    expect(resp.status).to.equal(200);
    expect(resp.response.body.status).to.equal(true);
  });
  cy.get(selectors.common.spinner).should('be.visible');
  cy.get(selectors.authentication.passwordResetSuccessMessage).invoke('text')
    .should('contain', this.staticTexts.authentication.checkyourMailbox)
    .and('contain', this.staticTexts.authentication.redirectingToLogin);
  cy.hash().should('eq', '#/login');
});
