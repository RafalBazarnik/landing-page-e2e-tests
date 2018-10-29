import faker from 'faker';

import dataObject from '../../support/dataObject';
import selectors from '../../selectors/selectors';
import permissionsEnum from '../../enums/permissions';


before(function () {
  cy.visit(dataObject.app_url);
});

beforeEach(function () {
  cy.server();
  cy.route('POST', '/auth/login').as('loginPOST');
  cy.fixture('static_texts.json').as('staticTexts');
});

it('Redirects to login page with warning message and reset password link', function () {
  cy.hash().should('eq', '#/login');
  cy.get(selectors.authentication.emailWarningMessage).invoke('text').should('contain', this.staticTexts.authentication.emailLoggingInfo);
  cy.get(selectors.authentication.resetPasswordLink).invoke('text').should('contain', this.staticTexts.authentication.passwordResetLink);
  cy.get(selectors.authentication.resetPasswordLink).should('have.attr', 'href').and('include', '#/reset-password');
});


it('clicking Forget your password? link edirects to reset password page', function () {
  cy.get(selectors.authentication.resetPasswordLink).click();
  cy.hash().should('eq', '#/reset-password');
  cy.go('back');
});

it('Empty email and password submitted', function () {
  cy.loginUI({ email: '', password: '' });
  cy.wait('@loginPOST').then((resp) => {
    expect(resp.status).to.equal(401);
    expect(resp.response.body.status).to.equal(false);
    expect(resp.response.body.error).to.equal(this.staticTexts.authentication.missingEmail);
  });
  cy.get(selectors.common.toastBody).invoke('text').should('eq', this.staticTexts.authentication.missingEmail);
  cy.get(selectors.common.closeToast).click();
  cy.hash().should('eq', '#/login');
});

it('Random email and empty password submitted', function () {
  cy.loginUI({ email: dataObject.email, password: '' });
  cy.wait('@loginPOST').then((resp) => {
    expect(resp.status).to.equal(401);
    expect(resp.response.body.status).to.equal(false);
    expect(resp.response.body.error).to.equal(this.staticTexts.authentication.missingPassword);
  });
  cy.get(selectors.common.toastBody).invoke('text').should('eq', this.staticTexts.authentication.missingPassword);
  cy.get(selectors.common.closeToast).click();
  cy.hash().should('eq', '#/login');
});

it('Random email and password submitted', function () {
  cy.loginUI({ email: faker.internet.email(), password: faker.random.word() });
  cy.wait('@loginPOST').then((resp) => {
    expect(resp.status).to.equal(401);
    expect(resp.response.body.status).to.equal(false);
    expect(resp.response.body.error).to.equal(this.staticTexts.authentication.loginFailure);
  });
  cy.get(selectors.common.toastBody).invoke('text').should('eq', this.staticTexts.authentication.loginFailure);
  cy.get(selectors.common.closeToast).click();
  cy.hash().should('eq', '#/login');
});

it('Proper email and password submitted with inactive account', function () {
  cy.getUserToken(dataObject);
  cy.login(dataObject);

  const email = faker.internet.email(undefined, undefined, dataObject.domain_1);
  const name = faker.internet.userName();
  const password = 'Qwerty123!@#';
  const permissions = permissionsEnum.ALL_ADMIN;
  cy.createUser({
    email, name, password, permissions,
  }, dataObject);
  cy.editUser(name, password, permissions, false, dataObject);
  cy.loginUI({ email, password });
  cy.get(selectors.common.toastBody).invoke('text').should('eq', this.staticTexts.authentication.loginFailure);
  cy.get(selectors.common.closeToast).click();
  cy.hash().should('eq', '#/login');

  cy.deleteUser(dataObject);
});

it('Proper email and password submitted with active account', function () {
  cy.loginUI({ email: dataObject.email, password: dataObject.password });
  cy.hash().should('eq', '#/');
  cy.wait('@loginPOST').then((resp) => {
    expect(resp.status).to.equal(200);
    expect(resp.response.body.status).to.equal(true);
    expect(resp.response.body.token).to.be.a('string');
    expect(resp.response.body.permissions).to.deep.equal(permissionsEnum.ALL_ADMIN);
    expect(resp.response.body.name).to.equal(dataObject.username);
  });
});
