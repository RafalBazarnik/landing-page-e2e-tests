import faker from 'faker';

import dataObject from '../../support/dataObject';
import selectors from '../../selectors/selectors';
import userHelper from '../../helpers/user_helper';


before(function () {
  cy.server();
  const testUser = userHelper.getRandomCreateUserData();
  cy.createUser(testUser, dataObject);

  cy.route('GET', /users/).as('usersGET');

  cy.fixture('static_texts.json').as('staticTexts'); // load fixtures

  cy.getUserToken(dataObject); // get token
  cy.login(dataObject); // add it to localStorage

  cy.visit(`${dataObject.app_url}/#/users`);
  cy.wait('@usersGET').then();
});

it('Edit user modal', function () {
  // name and email filter
  // click Edit
  // update user modal - title 'Update User'
  // check enabled - true, name, permissions
  // update name, password, permissions, enabled
  // get request - check data
  cy.deleteUser(dataObject); // clean after test
});
