import faker from 'faker';

import dataObject from '../../support/dataObject';
import selectors from '../../selectors/selectors';
import userHelper from '../../helpers/user_helper';


beforeEach(function () {
  cy.server();
  cy.getUserToken(dataObject); // get token
  cy.login(dataObject); // add it to localStorage
  cy.route('GET', /users/, { status: true, users: [] }).as('usersGET'); // stub

  cy.fixture('static_texts.json').as('staticTexts'); // load fixtures

  cy.visit(`${dataObject.app_url}/#/users`);
  cy.wait('@usersGET');
});

it('Email validation', function () {
  // button disabled on enter
  cy.get(selectors.authentication.submitButton).should('be.disabled');

  cy.route('PUT', /users/).as('userPUT');

  const user = userHelper.getRandomUserData();
  user.password = 'Katowice1!'; // proper password example

  cy.createUserUI(user);
  cy.wait('@userPUT').then((resp) => {
    expect(resp.status).to.equal(500);
    expect(resp.response.body.status).to.equal(false);
    expect(resp.response.body.error).to.equal(this.staticTexts.authentication.wrongEmailDomain);
  });
  cy.get(selectors.common.toastBody).invoke('text').should('eq', this.staticTexts.authentication.wrongEmailDomain);
  cy.get(selectors.common.closeToast).click();
});

it('Password validation - less than 8 characters', function () {
  const user = userHelper.getRandomUserData();
  user.email = faker.internet.email(undefined, undefined, dataObject.domain_2);
  user.password = 'Kato1!';

  cy.createUserUI(user);
});

it('Password validation - no capital letter', function () {
  const user = userHelper.getRandomUserData();
  user.email = faker.internet.email(undefined, undefined, dataObject.domain_2);
  user.password = 'katowice1!';

  cy.createUserUI(user);
});

it('Password validation - no number', function () {
  const user = userHelper.getRandomUserData();
  user.email = faker.internet.email(undefined, undefined, dataObject.domain_2);
  user.password = 'Katowice!';

  cy.createUserUI(user);
});

it('Password validation - no special character', function () {
  const user = userHelper.getRandomUserData();
  user.email = faker.internet.email(undefined, undefined, dataObject.domain_2);
  user.password = 'Katowice1';

  cy.createUserUI(user);
});

it('Create user', function () {
  const user = userHelper.getRandomUserData();
  user.email = faker.internet.email(undefined, undefined, dataObject.domain_2);
  user.password = 'Katowice1!';
  cy.route('PUT', /users/).as('userPUT');
  cy.createUserUI(user);
  cy.wait('@userPUT').then((resp) => {
    expect(resp.status).to.equal(200);
    expect(resp.response.body.status).to.equal(true);
    expect(resp.response.body).to.have.property('id');
    dataObject.temporary.id = resp.response.body.id;
  });
  cy.get(selectors.common.toastBody).invoke('text').should('eq', this.staticTexts.authentication.userCreated);
  cy.get(selectors.common.closeToast).click();

  cy.deleteUser(dataObject); // clean after test
});
