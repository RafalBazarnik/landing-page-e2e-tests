// C:\repo\landing-page-automated-tests\authentication\authentication-utilities.js
const emailSelector = '#email';
const passwordSelector = '#password';
const loginButtonSelector = 'button[type="submit"]';
const logoutSelector = 'header span[role="button"]';
const emailLabelSelector = 'label[for="email"]';
const loginErrorToastSelector = '.Toastify__toast--error';
const passwordResetLink = 'a[class^="login-page__StyledLink"]';
const passwordResetButton = 'button[class^="common-builder-styles__Button"]';
const passwordResetMessage = '[class^="common-builder-styles__Paragraph"]';
const spinner = '.spinner';

// C:\repo\landing-page-automated-tests\users\users-utilities.js
const nameFieldSelector = 'input[name="name"]';
const emailFieldSelector = 'input[name="email"]';
const passwordChangeSelector = '.builder-modal__container input[name="password"]';
const nameChangeSelector = '.builder-modal__container input[name="name"]';
const passwordFieldSelector = 'input[name="password"]';
const regionsFromFormSelector = '.users-page__territory';
const canadaRolesDropdownSelector = '.users-page__create__form > div:nth-of-type(2) .dropdownlist__button';
const japanRolesDropdownSelector = '.users-page__create__form > div:nth-of-type(3) .dropdownlist__button';
const dachRolesDropdownSelector = '.users-page__create__form > div:nth-of-type(4) .dropdownlist__button';
const americaRolesDropdownSelector = '.users-page__create__form > div:nth-of-type(5) .dropdownlist__button';
const canadaActiveSelector = '.users-page__create__form > div:nth-of-type(2) .dropdownlist__button--active';
const japanActiveSelector = '.users-page__create__form > div:nth-of-type(3) .dropdownlist__button--active';
const dachActiveSelector = '.users-page__create__form > div:nth-of-type(4) .dropdownlist__button--active';
const americaActiveSelector = '.users-page__create__form > div:nth-of-type(5) .dropdownlist__button--active';
const allValuesFromDropdowns = '.dropdownlist__item span';
const createButtonSelector = '.users-page__create__form button[type="submit"]';
const nextSelector = '.-next button';
const previousSelector = '.-previous button';
const pageNumberSelector = '.-pageJump input';
const totalPagesSelector = '.-totalPages';
const firstUserSelector = '.rt-tr-group:nth-child(1)';
const secondUserSelector = '.rt-tr-group:nth-child(2)';
const enabledColumnSelector = '.rt-th:nth-of-type(1) .rt-resizable-header-content';
const nameColumnSelector = '.rt-th:nth-of-type(2) .rt-resizable-header-content';
const emailColumnSelector = '.rt-th:nth-of-type(3) .rt-resizable-header-content';
const permissionsColumnSelector = '.rt-th:nth-of-type(4) .rt-resizable-header-content';
const rolesSelector = '.users-page__create__form div:nth-child(7) .dropdownlist__item span';
const nameFilterSelector = '.rt-tr .rt-th:nth-child(2) input';
const emailFilterSelector = '.rt-tr .rt-th:nth-child(3) input';
const firstRowNameSelector = '.rt-tr .rt-td:nth-child(2) span';
const firstRowEmailSelector = '.rt-tr .rt-td:nth-child(3) span';
const firstUserViewSelector = '.button-as-link';
const viewNameSelector = '.builder-modal__container .builder-modal__body:nth-child(2)';
const viewCanadaSelector = '.builder-modal__container .builder-modal__body:nth-child(3)';
const viewJapanSelector = '.builder-modal__container .builder-modal__body:nth-child(5)';
const viewDachSelector = '.builder-modal__container .builder-modal__body:nth-child(4)';
const viewAmericaSelector = '.builder-modal__container .builder-modal__body:nth-child(6)';
const firstRowDeleteSelector = '.rt-tr-group:nth-child(1) .button-label';
const deleteConfirmationSelector = '.builder-modal__form .button--warning';
const firstRowEditSelector = '.rt-tr-group:nth-child(1) .button--action';
const updateButtonSelector = '.button--inline';
const allNamesSelector = '.users-page__site-table--column:nth-of-type(2)';
const allEmailsSelector = '.users-page__site-table--column:nth-of-type(3)';
const cancelViewSelector = '.button--inline';

// C:\repo\landing-page-automated-tests\pages\publishing-utilities.js
const createPage = '.create-page-form__create__form';
const pagesTable = '.pages-table';
const pagesTableBody = `${pagesTable} .rt-tbody`;
const firstRowInPagesTableBody = `${pagesTableBody} div:nth-child(1) div`;

const pagesElements = {
  campaignURLInput: `${createPage} input`,
  localeSelect: `${createPage} .dropdownlist`,
  selectedLocale: `${createPage} .dropdownlist__button`,
  createButtonActive: `${createPage} button[type="submit"]:not([disabled])`,
  nameFilterInput: `${pagesTable} .pages-table__table--column--name input`,
  localeFilterInput: `${pagesTable} input[placeholder="en..."]`,
  firstPageInPagesTableBodyLink: `${firstRowInPagesTableBody} .pages-table__table--link`,
  firstPageInPagesTableBodyArchiveButton: `${firstRowInPagesTableBody} button:nth-child(4)`,
  firstPageInPagesTableBodyPublishButton: `${firstRowInPagesTableBody} button:nth-child(1)`,
  firstPageInPagesTableBodyRevokeButton: `${firstRowInPagesTableBody} button:nth-child(2)`,
  firstPageInPagesTableBodyStatus: `${firstRowInPagesTableBody} .rt-td:nth-child(6)`,
  firstPageInPagesTableBodyStatusDeploying: `${firstRowInPagesTableBody} .pages-table__table__status--deploying`,
  firstPageInPagesTableBodyStatusLive: `${firstRowInPagesTableBody} .pages-table__table__status--live`,
  firstPageInPagesTableBodyLiveLink: `${firstRowInPagesTableBody} .rt-td:nth-child(6) span a`,
  modalArchiveConfirmButton: '.builder-modal__form .button.button--warning',
  modalRevokeConfirmButton: '.builder-modal__form .button.button--warning',
  modalArchiveCancelButton: '.builder-modal__form .button.button--inline',
  modalPublishConfirm: '.builder-modal__form .button.button--action',
};

// C:\repo\landing-page-automated-tests\pages\pages-utilities.js
const campaignUrlSelector = '.create-page-form__field';
const regionsDropdownSelector = '.dropdownlist__button';
const dropdownActiveSelector = '.dropdownlist__button.dropdownlist__button--active';
const createPageButtonSelector = '.create-page-form__create__form .button.button--action';
const urlFilterSelector = '.rt-tr div:nth-of-type(2) .pages-table__table-filter-text';
const regionFilterSelector = '.rt-tr div:nth-of-type(3) .pages-table__table-filter-text';
const statusFilterSelector = '.rt-tr div:nth-of-type(6) .pages-table__table-filter-text';
const regionsSelector = '.dropdownlist__group-title';
const firstPageUrlSelector = '.pages-table .rt-tbody .rt-tr-group:nth-child(1) .rt-td:nth-child(2)';
const firstPageRegionSelector = '.pages-table .rt-tbody .rt-tr-group:nth-child(1) .rt-td:nth-child(3)';
const firstPageStatusSelector = '.pages-table .rt-tbody .rt-tr-group:nth-child(1) .rt-td:nth-child(6)';
const firstPageBulkPublishStatusSelector = '.pages-table .rt-tbody .rt-tr-group:nth-child(1) .rt-td:nth-child(7)';
const firstPageBulkPublishStatusSelectorLink = '.pages-table .rt-tbody .rt-tr-group:nth-child(1) .rt-td:nth-child(7) .pages-table__table--link';
const firstPagePublishSelector = 'div .pages-table__table-action:nth-child(1)';
const firstPageRevokeSelector = 'div .pages-table__table-action:nth-child(2)';
const firstPageDuplicateSelector = 'div .pages-table__table-action:nth-child(3)';
const firstPageArchiveSelector = 'div .pages-table__table-action:nth-child(4)';
const duplicateConfirmationSelector = '.button--action.button--inline';
const duplicateUrlSelector = '.builder-modal__form-field';
const landingPagesSelector = '.pages-table__table .rt-tr-group';
const nextSelector1 = '.pages-table__table .-next .-btn';
const previousSelector1 = '.pages-table__table .-previous .-btn';
const pageNumberSelector1 = '.pages-table__table .-pageJump > input';
const totalPagesSelector1 = '.pages-table__table .-totalPages';
const pagesTabSelector = '.navigation__link:nth-of-type(1) .navigation__link__name';
const usersTabSelector = '.navigation__link:nth-of-type(2) .navigation__link__name';
const assetsTabSelector = '.navigation__link:nth-of-type(3) .navigation__link__name';
const videosTabSelector = '.navigation__link:nth-of-type(4) .navigation__link__name';
const reportsTabSelector = '.navigation__link:nth-of-type(5) .navigation__link__name';
const defaultsTabSelector = '.navigation__link:nth-of-type(6) .navigation__link__name';
const redirectsTabSelector = '.navigation__link:nth-of-type(7) .navigation__link__name';
const bulkPublishesTabSelector = '.navigation__link:nth-of-type(8) .navigation__link__name';
const nameColumnSelector1 = '.pages-table .rt-tr .rt-th:nth-child(2) .rt-resizable-header-content';
const localeColumnSelector = '.pages-table .rt-tr .rt-th:nth-child(3) .rt-resizable-header-content';
const updatedColumnSelector = '.pages-table .rt-tr .rt-th:nth-child(4) .rt-resizable-header-content';
const lastPublishedColumnSelector = '.pages-table .rt-tr .rt-th:nth-child(5) .rt-resizable-header-content';
const statusColumnSelector = '.pages-table .rt-tr .rt-th:nth-child(6) .rt-resizable-header-content';
const stagedStatusColumnSelector = '.pages-table .rt-tr .rt-th:nth-child(7) .rt-resizable-header-content';
const allUrlsSelector = '.pages-table .pages-table__table--link:nth-child(1)';
const allUpdatesSelector = '.pages-table .rt-td:nth-child(4)';
const allLastPublishedSelector = '.pages-table .rt-td:nth-child(5)';



// C:\repo\landing-page-automated-tests\builder\builder-utilities.js
const saveAtTopSelector = '.builder-page__tags .button--inline:nth-child(1)';
const saveAndPreviewAtTopSelector = '.builder-page__tags .button--inline:nth-child(2)';
const cancelAtTopSelector = '.builder-page__tags .button--inline:nth-child(3)';

const goBackToListButton = '.preview-page__preview-controls .button:nth-child(2)';
const modalDeleteComponentConfirmButton = '.button--warning';
const footerEditComponentButton = '[class^="footer__FooterWrapper"] + div [title^="Edit"]';
const editComponentButton = componentClassName => `[class^="${componentClassName}"] + div [title^="Edit"]`;
const addItemOnPreviewSelector = '[title="Add"]';
const deleteItemOnPreviewSelector = '[title="Delete"]';

const allComponentsLive = '.app > * > *';
const allComponentsPreview = '.preview-page__sandbox [class^="sandbox-item__SandboxWrapper"] > *';

// C:\repo\landing-page-automated-tests\components\footer.js
const selectors = {
  editorSelectors: {
    addListItem: '.test__footer-list__button--add',
    trademark: '#trademark',
    facebook: '#add-facebook-url',
    facebookUrl: '#facebook-url',
    instagram: '#add-instagram-url',
    instagramUrl: '#instagram-url',
    twitter: '#add-twitter-url',
    twitterUrl: '#twitter-url',
    save: 'button[type="submit"]',
    linkLabel: '#footer-input-', // add number from 0
    linkText: '#footer-textarea-', // add number from 0
    editFooter: '.footer + .sandbox-item__cover .sandbox-item__edit--footer',
    deleteListItem: '.test__footer-list__button--delete',
  },
  liveSelectors: {
    socialLink: '[class^="footer-social-link__Link"]',
    footerLinks: '[class^="footer-link__Link"][href]',
    trademark: '[class^="footer-link__Link"]:not([href])',
  },
};

// C:\repo\landing-page-automated-tests\components\faq.js
const selectors2 = {
  editorSelectors: {
    addListItem: '.faq-list .faq-list__list + button',
    headline: '#headline',
    question: '#heading-', // add number from 0
    answer: '#body-', // add number from 0
    save: 'button[type="submit"]',
    editFAQ: '.faq + .sandbox-item__cover .sandbox-item__edit',
    theme: '',
    deleteListItem: '.faq-list__list .button--warning',
  },
  liveSelectors: {
    headline: '[class^="faq-view__Section"] .heading-paragraph-single',
    question: '[class^="faq-view__Section"] .test__heading',
    answer: '.faq-section-paragraph-single',
  },
};

// C:\repo\landing-page-automated-tests\enums\components.js
const FAQ = {
  name: 'FAQ',
  className: 'faq-view__Section',
  selector: '.faq',
  exampleData: {
    headline: 'Test Headline',
    questions: ['question1', 'question2', 'question3'],
    answers: ['answer1', 'answer2', 'answer2'],
    theme: 'dark',
  },
};

const FOOTER = {
  name: 'footer',
  className: 'footer__FooterWrapper',
  selector: '.footer',
  exampleData: {
    trademark: 'TEST™',
    links: [
      {
        label: 'Test Label 1',
        url: 'http://www.onet.pl',
      },
      {
        label: 'Test Label 2',
        url: 'http://www.wp.pl',
      },
    ],
    socialMedia: {
      facebook: {
        state: true,
        url: 'http://www.facebook.pl/testLink',
      },
      instagram: {
        state: false,
        url: 'http://www.instagram.pl/testLink',
      },
      twitter: {
        state: true,
        url: 'http://www.twitter.pl/testLink',
      },
    },
  },
  theme: 'light',
};