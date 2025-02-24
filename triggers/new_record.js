const perform = async (z, bundle) => {
  const options = {
    url: `{{process.env.URL_INSTANCE}}/legacy/Api/index.php/V8/module/${bundle.inputData.modules}?sort=-date_entered`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const data = response.json.data; // Accédez aux données de votre API

    // Créez un tableau pour stocker les éléments formatés
    const formattedResults = [];

    // Parcourez les données de votre API
    data.forEach((item) => {
      const attributes = item.attributes; // Accédez aux attributs de chaque élément

      // Créez un objet pour stocker les propriétés que vous souhaitez inclure dans le tableau
      const formattedItem = {
        id: item.id, // Utilisez l'ID de l'élément comme ID du déclencheur
        ...attributes,
      };

      // Ajoutez l'objet formaté au tableau
      formattedResults.push(formattedItem);
    });

    return formattedResults;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'modules',
        type: 'string',
        label: 'Module',
        choices: [
          'Accounts',
          'Contacts',
          'Cases',
          'Calls',
          'Tasks',
          'Contracts',
          'Documents',
          'Notes',
          'Users',
        ],
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    canPaginate: true,
  },
  display: {
    description:
      'Triggers when a new record is added to a module you specify (Contacts, Accounts, Cases, etc..).',
    hidden: false,
    label: 'New Record',
  },
  key: 'new_record',
  noun: 'New Record',
};
