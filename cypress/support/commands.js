// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// todo : movo functions to other files: leave just: Cypress.Commands.add('login', loginWithoutUI);

import uiCommandsFunctions from './ui.commands.functions';
import apiCommandsFunctions from './api.commands.functions';


// authentication
Cypress.Commands.add('getConfig', apiCommandsFunctions.getConfig);
Cypress.Commands.add('getUserToken', apiCommandsFunctions.getUserToken);
Cypress.Commands.add('login', (dataObject) => {
  cy.window().then((window) => {
    window.localStorage.setItem('stage-token', dataObject.token);
    window.localStorage.setItem('stage-user', dataObject.username);
    window.localStorage.setItem('stage-user-permissions', dataObject.permissions);
  });
});
Cypress.Commands.add('loginUI', uiCommandsFunctions.loginUI);
Cypress.Commands.add('createUserUI', uiCommandsFunctions.createUserUI);
Cypress.Commands.add('createUser', apiCommandsFunctions.createUser);
Cypress.Commands.add('editUser', apiCommandsFunctions.editUser);
Cypress.Commands.add('deleteUser', apiCommandsFunctions.deleteUser);
Cypress.Commands.add('setFilter', (dataObject) => {
  cy.window().then((window) => {
    for (const filter in dataObject.filters) {
      if (filter) window.localStorage.setItem(filter, dataObject.filters[filter]);
    }
  });
});

Cypress.Commands.add('createPage', (dataObject) => {
  cy.server();
  cy.route('POST', `${dataObject.api_url}/pages/check`).as('pagesCheckPOST');
  cy.get('.create-page-form__field').type(dataObject.url);
  cy.get('.dropdownlist').click().contains(dataObject.locale).click();
  cy.wait('@pagesCheckPOST');
  cy.get('.create-page-form__create__form button[type="submit"]').click();
});

Cypress.Commands.add('getPageData', (dataObject) => {
  cy.request({
    method: 'GET',
    url: `${dataObject.api_url}/pages`,
    headers: {
      'Accept': 'application/json', // eslint-disable-line
      'Content-Type': 'application/json',
      'X-Dazn-Auth': dataObject.token,
    },
  })
    .then((resp) => {
      dataObject.pageData = resp.body.pages
        .filter(page => page.url === dataObject.url && page.locale === dataObject.locale);
    });
});
