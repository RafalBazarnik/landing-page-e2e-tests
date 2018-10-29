import faker from 'faker';

import permissionsEnum from '../enums/permissions';

const getRandomPermissions = (level) => {
  const permissions = {};
  for (const key in permissionsEnum.ALL_ADMIN) {
    if (level) {
      permissions[key] = level;
    } else {
      permissions[key] = faker.random.arrayElement(permissionsEnum.LEVELS);
    }
  }
  return permissions;
};

const getRandomUserData = (level) => {
  const user = {
    permissions: getRandomPermissions(level),
    email: faker.internet.email(),
    name: faker.name.lastName(),
    enabled: faker.random.boolean(),
    id: faker.random.uuid(),
  };
  return user;
};

const getRandomCreateUserData = (password, level) => {
  const user = {
    permissions: getRandomPermissions(level),
    email: faker.internet.email(),
    name: faker.name.lastName(),
    password,
  };
  return user;
};

const getArrayOfRandomUsers = (numberOfUsers) => {
  const users = [];
  Cypress._.times(numberOfUsers, () => {
    users.push(getRandomUserData());
  });
  return users;
};

module.exports = {
  getRandomUserData,
  getRandomPermissions,
  getArrayOfRandomUsers,
  getRandomCreateUserData,
};
