import dataObject from '../support/dataObject';
import selectors from '../selectors/selectors';


before(function () {
  cy.visit(dataObject.app_url);
  cy.loginUI(dataObject);
});

beforeEach(function () {
  cy.getUserToken(dataObject);
  cy.login(dataObject);
});

it('Navigation Tabs are visible', function () {
  cy.get(selectors.navigation.navigationTab).should(($el) => {
    expect($el).to.have.length(8);
    expect($el.eq(0)).to.contain('Pages');
    expect($el.eq(1)).to.contain('Users');
    expect($el.eq(2)).to.contain('Assets');
    expect($el.eq(3)).to.contain('Videos');
    expect($el.eq(4)).to.contain('Reports');
    expect($el.eq(5)).to.contain('Defaults');
    expect($el.eq(6)).to.contain('Redirects');
    expect($el.eq(7)).to.contain('Bulk Publishes');
  });
});

it('User Tab', function () {
  cy.get(selectors.navigation.navigationTab).contains('Users').click();
  cy.hash().should('eq', '#/users');
});

it('Assets Tab', function () {
  cy.get(selectors.navigation.navigationTab).contains('Assets').click();
  cy.hash().should('eq', '#/assets');
});

it('Videos Tab', function () {
  cy.get(selectors.navigation.navigationTab).contains('Videos').click();
  cy.hash().should('eq', '#/videos');
});

it('Reports Tab', function () {
  cy.get(selectors.navigation.navigationTab).contains('Reports').click();
  cy.hash().should('eq', '#/reports/pages');
});

it('Defaults Tab', function () {
  cy.get(selectors.navigation.navigationTab).contains('Defaults').click();
  cy.hash().should('eq', '#/defaults/component-defaults');
});

it('Redirects Tab', function () {
  cy.get(selectors.navigation.navigationTab).contains('Redirects').click();
  cy.hash().should('eq', '#/redirects');
});

it('Bulk Publishes Tab', function () {
  cy.get(selectors.navigation.navigationTab).contains('Bulk Publishes').click();
  cy.hash().should('eq', '#/bulk-publishes');
});

it('Pages Tab', function () {
  cy.get(selectors.navigation.navigationTab).contains('Pages').click();
  cy.hash().should('eq', '#/');
});
