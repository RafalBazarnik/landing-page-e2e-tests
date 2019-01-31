module.exports = {
  getUserToken: (dataObject) => {
    cy.request({
      method: 'POST',
      url: `${dataObject.api_url}/auth/login`,
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
        'X-Dazn-Auth': dataObject.token,
      },
      body: {
        email: dataObject.email,
        password: dataObject.password,
      },
    })
      .then((resp) => {
        dataObject.token = resp.body.token;
        dataObject.username = resp.body.name;
        dataObject.userPermissions = resp.body.permissions;
      });
  },
  getConfig: (dataObject) => {
    cy.request({
      method: 'GET',
      url: `${dataObject.api_url}/config`,
      headers: {
        'Accept': 'application/json',  // eslint-disable-line
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dataObject.config = resp.body.config;
      });
  },
  createUser: ({
    email, name, password, permissions,
  }, dataObject) => {
    cy.request({
      method: 'POST',
      url: `${dataObject.api_url}/users`,
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
        'X-Dazn-Auth': dataObject.token,
      },
      body: {
        email,
        name,
        password,
        permissions,
      },
    }).then((resp) => {
      dataObject.temporary.id = resp.body.user.id;
    });
  },
  deleteUser: (dataObject) => {
    const id = dataObject.temporary.id;
    cy.request({
      method: 'DELETE',
      url: `${dataObject.api_url}/users/${id}`,
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
        'X-Dazn-Auth': dataObject.token,
      },
    });
  },
  editUser: (name, password, permissions, enabled = true, dataObject) => {
    const id = dataObject.temporary.id;
    cy.request({
      method: 'PATCH',
      url: `${dataObject.api_url}/users/${id}`,
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
        'X-Dazn-Auth': dataObject.token,
      },
      body: {
        enabled,
        name,
        password,
        permissions,
      },
    });
  },
  deletePage: (dataObject) => {
    cy.request({
      method: 'DELETE',
      url: `${dataObject.api_url}/pages/${dataObject.pageId}`,
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
        'X-Dazn-Auth': dataObject.token,
      },
    });
  },
  archivePage: (dataObject) => {
    cy.request({
      method: 'GET',
      url: `${dataObject.api_url}/pages/${dataObject.pageId}/archive`,
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
        'X-Dazn-Auth': dataObject.token,
      },
    });
  },
  revokePage: (dataObject) => {
    cy.request({
      method: 'GET',
      url: `${dataObject.api_url}/pages/${dataObject.pageId}/revoke`,
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
        'X-Dazn-Auth': dataObject.token,
      },
    });
  },
};
