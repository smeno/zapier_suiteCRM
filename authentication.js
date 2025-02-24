module.exports = {
  type: 'session',
  test: {
    headers: { Authorization: 'Bearer {{bundle.authData.access_token}}' },
    url: '{{process.env.URL_INSTANCE}}/legacy/Api/index.php/V8/module/Accounts?sort=-date_entered',
  },
  fields: [
    {
      computed: false,
      key: 'username',
      required: true,
      label: 'Username',
      type: 'string',
    },
    {
      computed: false,
      key: 'password',
      required: true,
      label: 'Password',
      type: 'password',
    },
  ],
  sessionConfig: {
    perform: {
      body: {
        grant_type: 'password',
        username: '{{bundle.authData.username}}',
        password: '{{bundle.authData.password}}',
        client_id: '{{process.env.CLIENT_ID}}',
        client_secret: '{{process.env.CLIENT_SECRET}}',
      },
      headers: {
        'content-type': 'application/vnd.api+json',
        accept: 'application/vnd.api+json',
      },
      method: 'POST',
      url: '{{process.env.URL_INSTANCE}}/legacy/Api/index.php/access_token',
    },
  },
  connectionLabel: '{{bundle.authData.username}}',
};
