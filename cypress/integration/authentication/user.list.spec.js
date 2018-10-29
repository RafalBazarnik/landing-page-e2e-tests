import dataObject from '../../support/dataObject';
import selectors from '../../selectors/selectors';
import userHelper from '../../helpers/user_helper';


beforeEach(function () {
  cy.server();
  cy.route('GET', /users/).as('usersGET');
  cy.fixture('static_texts.json').as('staticTexts'); // load fixtures
  cy.getUserToken(dataObject); // get token
  cy.login(dataObject); // add it to localStorage
});

it('User list loads and has proper elements', function () {
  cy.route('GET', /users/).as('usersGET');
  cy.visit(`${dataObject.app_url}/#/users`);
  cy.wait('@usersGET').then((resp) => {
    expect(resp.status).to.equal(200);
    expect(resp.response.body.status).to.equal(true);
    expect(resp.response.body.users).to.have.length.above(0);
  });
  cy.get(selectors.authentication.userColumnName).should(($el) => {
    expect($el).to.have.length(5);
    expect($el.eq(0)).to.contain('Enabled');
    expect($el.eq(1)).to.contain('Name');
    expect($el.eq(2)).to.contain('Email');
    expect($el.eq(3)).to.contain('Permissions');
  });
  cy.get(selectors.pagination.buttonPrevious).should('be.disabled');
  cy.get(selectors.pagination.buttonNext).should('not.be.disabled');
  cy.get(selectors.pagination.pageSizeSelect).find(':selected').should('have.value', '10');
  cy.get(selectors.pagination.jumpToPage).should('have.value', '1');
});

it('User list properly shows user data', function () {
  const randomUserList = userHelper.getArrayOfRandomUsers(1);
  cy.route('GET', /users/, { status: true, users: randomUserList }).as('usersGET'); // stub
  cy.visit(`${dataObject.app_url}/#/users`);
  cy.wait('@usersGET');
  // filter out the user
  const user = randomUserList[0];
  cy.get(selectors.authentication.emailFilter).clear().type(user.email);
  // check data
  cy.get(selectors.authentication.userDataInRow).should(($el) => {
    const elementClass = user.enabled
      ? selectors.authentication.userEnabledClass : selectors.authentication.userDisabledClass;
    expect($el.eq(0)).to.have.class(elementClass);
    expect($el.eq(1)).to.contain(user.name);
    expect($el.eq(2)).to.contain(user.email);
  });
  // check permissions modal
  cy.get(selectors.authentication.userPermissionsView).click();
  cy.get(selectors.authentication.usernameInModal).invoke('text').should('eq', user.name);

  const permissionInfo = [];
  for (const permission in user.permissions) {
    permissionInfo.push(`${permission} - ${user.permissions[permission].toLowerCase()}`);
  }
  cy.document().then((doc) => {
    const elements = doc.querySelectorAll(selectors.authentication.permissionsInModal);
    for (const element of elements) {
      expect(permissionInfo.includes(element.innerText.toLowerCase())).to.be.true;
    }
  });
  cy.get(selectors.authentication.closePermissionsModal).click();
});

it('No rows found if no users returned from data', function () {
  cy.route('GET', /users/, { status: true, users: [] }); // stub
  cy.visit(`${dataObject.app_url}/#/users`);
  cy.get(selectors.common.noDataInfo).should('be.visible');
  cy.get(selectors.pagination.buttonPrevious).should('be.disabled');
  cy.get(selectors.pagination.buttonNext).should('be.disabled');
});

it('Users list pagination', function () {
  const randomUserList = userHelper.getArrayOfRandomUsers(12);
  cy.route('GET', /users/, { status: true, users: randomUserList }).as('usersGET'); // stub
  cy.visit(`${dataObject.app_url}/#/users`);
  cy.wait('@usersGET');

  // start pagination
  cy.get(selectors.pagination.buttonPrevious).should('be.disabled');
  cy.get(selectors.pagination.buttonNext).should('not.be.disabled');
  cy.get(selectors.pagination.pageSizeSelect).find(':selected').should('have.value', '10');
  cy.get(selectors.pagination.jumpToPage).should('have.value', '1');
  cy.get(selectors.pagination.totalPages).invoke('text').should('be', '2');
  // next page
  cy.get(selectors.pagination.buttonNext).click();
  cy.get(selectors.pagination.buttonPrevious).should('not.be.disabled');
  cy.get(selectors.pagination.buttonNext).should('be.disabled');
  cy.get(selectors.pagination.jumpToPage).should('have.value', '2');
});

it('User list sorting', function () {
  const randomUserList = userHelper.getArrayOfRandomUsers(10);
  cy.route('GET', /users/, { status: true, users: randomUserList }).as('usersGET'); // stub
  cy.visit(`${dataObject.app_url}/#/users`);
  cy.wait('@usersGET');

  // sort by name - default sorting
  const userListToBeSortedByNameAsc = Cypress._.map(randomUserList, Cypress._.clone); // deep copy
  userListToBeSortedByNameAsc.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); // eslint-disable-line
  cy.get(selectors.authentication.userListNames).should(($el) => {
    for (let i = 0; i < userListToBeSortedByNameAsc.length; i += 1) {
      expect($el.eq(i)).to.contain(userListToBeSortedByNameAsc[i].name);
    }
  });
  // sort by name descending
  const userListToBeSortedByNameDesc = Cypress._.map(randomUserList, Cypress._.clone); // deep copy
  userListToBeSortedByNameDesc.sort((a, b) => (a.name < b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); // eslint-disable-line
  cy.get(selectors.authentication.userListColumn).contains('Name').click();
  cy.get(selectors.authentication.userListNames).should(($el) => {
    for (let i = 0; i < userListToBeSortedByNameDesc.length; i += 1) {
      expect($el.eq(i)).to.contain(userListToBeSortedByNameDesc[i].name);
    }
  });

  // sort by email - ascending
  const userListToBeSortedByEmailAsc = Cypress._.map(randomUserList, Cypress._.clone); // deep copy
   userListToBeSortedByEmailAsc.sort((a, b) => (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0)); // eslint-disable-line
  cy.get(selectors.authentication.userListColumn).contains('Email').click();
  cy.get(selectors.authentication.userListEmails).should(($el) => {
    for (let i = 0; i < userListToBeSortedByEmailAsc.length; i += 1) {
      expect($el.eq(i)).to.contain(userListToBeSortedByEmailAsc[i].email);
    }
  });

  // sort by email - descending
  const userListToBeSortedByEmailDesc = Cypress._.map(randomUserList, Cypress._.clone); // deep copy
   userListToBeSortedByEmailDesc.sort((a, b) => (a.email < b.email) ? 1 : ((b.email > a.email) ? -1 : 0)); // eslint-disable-line
  cy.get(selectors.authentication.userListColumn).contains('Email').click();
  cy.get(selectors.authentication.userListEmails).should(($el) => {
    for (let i = 0; i < userListToBeSortedByEmailDesc.length; i += 1) {
      expect($el.eq(i)).to.contain(userListToBeSortedByEmailDesc[i].email);
    }
  });

  // sort by enabled - ascending
  const userListToBeSortedByEnabledAsc = Cypress._.map(randomUserList, Cypress._.clone); // deep copy
  userListToBeSortedByEnabledAsc.sort((a, b) => a.enabled - b.enabled);
  cy.log(userListToBeSortedByEnabledAsc);
  cy.get(selectors.authentication.userListColumn).contains('Enabled').click();
  cy.get(selectors.authentication.userListEnabled).should(($el) => {
    for (let i = 0; i < userListToBeSortedByEnabledAsc.length; i += 1) {
      if (userListToBeSortedByEnabledAsc[i].enabled) {
        expect($el.eq(i)).to.have.class(selectors.authentication.userEnabledClass);
      } else {
        expect($el.eq(i)).to.have.class(selectors.authentication.userDisabledClass);
      }
    }
  });

  // sort by enabled - descending
  const userListToBeSortedByEnabledDesc = Cypress._.map(randomUserList, Cypress._.clone); // deep copy
  userListToBeSortedByEnabledDesc.sort((a, b) => b.enabled - a.enabled);
  cy.get(selectors.authentication.userListColumn).contains('Enabled').click();
  cy.get(selectors.authentication.userListEnabled).should(($el) => {
    for (let i = 0; i < userListToBeSortedByEnabledDesc.length; i += 1) {
      if (userListToBeSortedByEnabledDesc[i].enabled) {
        expect($el.eq(i)).to.have.class(selectors.authentication.userEnabledClass);
      } else {
        expect($el.eq(i)).to.have.class(selectors.authentication.userDisabledClass);
      }
    }
  });
});

it('Delete user from list', function () {
  const randomUserList = userHelper.getArrayOfRandomUsers(1);
  cy.route('GET', /users/, { status: true, users: randomUserList }).as('usersGET'); // stub
  cy.visit(`${dataObject.app_url}/#/users`);
  cy.wait('@usersGET');

  // click delete and cancel
  cy.get(selectors.authentication.deleteUserButton).click();
  cy.get(selectors.authentication.userDeleteModalTitle).invoke('text').should('be', this.staticTexts.authentication.deleteUserModalText);
  cy.get(selectors.authentication.userDeleteModalButton).contains('Cancel').click();

  // click delete and confirm
  cy.route('DELETE', /users/, { status: true }).as('usersDELETE'); // stub
  cy.get(selectors.authentication.deleteUserButton).click();
  cy.get(selectors.authentication.userDeleteModalButton).contains('Delete').click();
  cy.wait('@usersDELETE');
});
