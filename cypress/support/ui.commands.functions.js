import selectors from '../selectors/selectors';

module.exports = {
  loginUI: ({ email, password }) => {
    if (email) cy.get(selectors.authentication.email).clear().type(email);
    if (password) cy.get(selectors.authentication.password).clear().type(password);
    cy.get(selectors.authentication.submitButton).click();
  },
  createUserUI: ({
    name, email, password, permissions,
  }) => {
    cy.get(selectors.authentication.nameFieldCreate).clear().type(name);
    cy.get(selectors.authentication.emailFieldCreate).clear().type(email);
    cy.get(selectors.authentication.passwordFieldCreate).clear().type(password);
    cy.get(selectors.authentication.regionsLabelsCreate).each(($el, index) => {
      cy.wrap($el).invoke('text').then((region) => {
        cy.get(selectors.authentication.permissionsDropdownButtonCreate(index)).click();
        cy.get(selectors.authentication.permissionsLevelOptionsCreate(index)).contains(permissions[region]).click();
      });
    });
    cy.get(selectors.authentication.submitButton).click();
  },
};
