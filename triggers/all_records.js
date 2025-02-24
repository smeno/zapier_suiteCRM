
const perform = async (z, bundle) => {
  
  const options = {
    url: `{{process.env.URL_INSTANCE}}/legacy/Api/index.php/V8/module/${bundle.inputData.modules}?sort=-date_entered&page[number]=${bundle.meta.page+1}&page[size]=50`,
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
      const formattedItem = bundle.inputData.modules === 'Contacts' ? {
        id: item.id, // Utilisez l'ID de l'élément comme ID du déclencheur
        name : attributes.account_name,
        // ...attributes, // Exemple d'attribut
      } : {
        id: item.id, // Utilisez l'ID de l'élément comme ID du déclencheur
        ...attributes, // Exemple d'attribut
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
    description: 'This trigger returns all records of a specified module',
    hidden: true,
    label: 'All Records',
  },
  key: 'all_records',
  noun: 'All Records',
};
