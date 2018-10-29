import permissionsEnum from '../enums/permissions';

module.exports = {
  email: Cypress.env('MASTER_EMAIL'),
  password: Cypress.env('MASTER_PASSWORD'),
  env: Cypress.env('ENV'),
  app_url: Cypress.env('APP_URL'),
  api_url: Cypress.env('API_URL'),
  domain_1: Cypress.env('DOMAIN_1'),
  domain_2: Cypress.env('DOMAIN_2'),
  token: '',
  username: Cypress.env('MASTER_USERNAME'),
  permissions: JSON.stringify(permissionsEnum.ALL_ADMIN),
  config: {},
  filters: {
    'archive-pages::url-filter': '',
    'pages::locale-filter': '',
    'pages::pageState-filter': '',
    'pages::url-filter': '',
  },
  temporary: {},
};
