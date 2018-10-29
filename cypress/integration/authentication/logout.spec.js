import dataObject from '../../support/dataObject';
import selectors from '../../selectors/selectors';


beforeEach(function () {
  cy.server();
  cy.getUserToken(dataObject); // get token
  cy.login(dataObject); // add it to localStorage

  cy.route('GET', /pages/, { pages: [], status: true }).as('pagesGET'); // stub
  cy.route('GET', /deployments/, { status: true, deployments: [] }); // stub
  cy.route('GET', /config/).as('configGET');
  cy.visit(`${dataObject.app_url}/#/`);
  cy.wait('@configGET');
});

it('log out', function () {
  cy.get(selectors.authentication.logoutLink).click();
  cy.hash().should('eq', '#/login');
});
