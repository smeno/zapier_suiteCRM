const perform = async (z, bundle) => {
  const champ1 = bundle.inputData.search_field_1;
  const valeur1 = encodeURIComponent(bundle.inputData.value_for_search_field_1);
  
  const champ2 = bundle.inputData.search_field_2;
  const valeur2 = encodeURIComponent(bundle.inputData.value_for_search_field_2);
  
  const champ3 = bundle.inputData.search_field_3;
  const valeur3 = encodeURIComponent(bundle.inputData.value_for_search_field_3);
  
  const champ4 = bundle.inputData.search_field_4;
  const valeur4 = encodeURIComponent(bundle.inputData.value_for_search_field_4);
  
  const champ5 = bundle.inputData.search_field_5;
  const valeur5 = encodeURIComponent(bundle.inputData.value_for_search_field_5);
  





  if(champ1.toLowerCase() !== 'email1'){
      // Construisez l'URL avec le filtre
    let url = `${process.env.URL_INSTANCE}/legacy/Api/index.php/V8/module/${bundle.inputData.modules}?sort=-date_entered&filter[${champ1}][eq]=${valeur1}`;
    if (champ2 !== undefined && valeur2 !== undefined && champ2 !== '' && valeur2 !== '') {
      url += `&filter[${champ2}][eq]=${valeur2}`;
    }
    if (champ3 !== undefined && valeur3 !== undefined && champ3 !== '' && valeur3 !== '') {
      url += `&filter[${champ3}][eq]=${valeur3}`;
    }
    if (champ4 !== undefined && valeur4 !== undefined && champ4 !== '' && valeur4 !== '') {
      url += `&filter[${champ4}][eq]=${valeur4}`;
    }
    if (champ5 !== undefined && valeur5 !== undefined && champ5 !== '' && valeur5 !== '') {
      url += `&filter[${champ5}][eq]=${valeur5}`;
    }

    const options = {
      url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${bundle.authData.access_token}`,
      },
      params: {},
      body: {},
    };

    return z.request(options).then((response) => {
      response.throwForStatus();
      const data = response.json.data; // Accédez aux données de votre API

      // Créez un tableau pour stocker les éléments formatés
      const formattedResults = [];

      // Parcourez les données de votre API
      data.forEach((item) => {
        const { id, attributes } = item; // Accédez aux attributs de chaque élément

        // Créez un objet formaté en spécifiant explicitement les propriétés
        const formattedItem = {
          id: item.id, // Utilisez l'ID de l'élément comme ID du déclencheur
          ...attributes, // Exemple d'attribut
        };

        // Ajoutez l'objet formaté au tableau
        formattedResults.push(formattedItem);
      });

      return formattedResults;
    });
  } 

  else {
    // Construisez l'URL avec le filtre pour le champ email1
    const email1Url = `${process.env.URL_INSTANCE}/legacy/Api/index.php/V8/module/${bundle.inputData.modules}?sort=date_entered&fields[Accounts]=email1&filter[email1][eq]=${valeur1}`;
  
    // Effectuez la requête pour le champ "email1"
    const optionsEmail1 = {
      url: email1Url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${bundle.authData.access_token}`,
      },
      params: {},
      body: {},
    };
  
    // Construisez l'URL avec les filtres pour les autres champs
    let otherFieldsUrl = `${process.env.URL_INSTANCE}/legacy/Api/index.php/V8/module/${bundle.inputData.modules}?sort=-date_entered`;
    if (champ2 !== undefined && valeur2 !== undefined && champ2 !== '' && valeur2 !== '') {
      otherFieldsUrl += `&filter[${champ2}][eq]=${valeur2}`;
    }
    if (champ3 !== undefined && valeur3 !== undefined && champ3 !== '' && valeur3 !== '') {
      otherFieldsUrl += `&filter[${champ3}][eq]=${valeur3}`;
    }
    if (champ4 !== undefined && valeur4 !== undefined && champ4 !== '' && valeur4 !== '') {
      otherFieldsUrl += `&filter[${champ4}][eq]=${valeur4}`;
    }
    if (champ5 !== undefined && valeur5 !== undefined && champ5 !== '' && valeur5 !== '') {
      otherFieldsUrl += `&filter[${champ5}][eq]=${valeur5}`;
    }
  
    // Effectuez la requête pour les autres champs
    const optionsOtherFields = {
      url: otherFieldsUrl,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${bundle.authData.access_token}`,
      },
      params: {},
      body: {},
    };
  
    // Utilisez Promise.all pour effectuer les deux requêtes simultanément
    return Promise.all([z.request(optionsEmail1), z.request(optionsOtherFields)])
      .then(([responseEmail1, responseOtherFields]) => {
        responseEmail1.throwForStatus();
        responseOtherFields.throwForStatus();
  
        const dataEmail1 = responseEmail1.json.data;
        const dataOtherFields = responseOtherFields.json.data;
  
        // Vérifiez si les deux réponses ont des données avant de générer la réponse finale
        if (dataEmail1.length > 0 && dataOtherFields.length > 0) {
          // Créez un tableau pour stocker les éléments formatés
          const formattedResults = [];
  
          // Parcourez les données de votre API pour le champ "email1"
          dataEmail1.forEach((item) => {
            const { id, attributes } = item;
            // Créez un objet formaté en spécifiant explicitement les propriétés pour "email1"
            const formattedItem = {
              id: item.id, // Utilisez l'ID de l'élément comme ID du déclencheur
              email1: attributes.email1,
              ...attributes, // Ajoutez tous les autres attributs
            };
            // Ajoutez l'objet formaté au tableau
            formattedResults.push(formattedItem);
          });
  
          // Parcourez les données de votre API pour les autres champs
          dataOtherFields.forEach((item) => {
            const { id, attributes } = item;
            // Trouvez l'objet correspondant dans formattedResults en utilisant l'ID
            const existingItem = formattedResults.find((result) => result.id === id);
  
            if (existingItem) {
              // Si l'objet existe, ajoutez les champs de la deuxième requête au même niveau
              Object.assign(existingItem, attributes);
            } else {
              // Si l'objet n'existe pas, créez-le avec l'ID, "email1" et les attributs de la deuxième requête
              const newItem = { id, email1: attributes.email1, ...attributes };
              formattedResults.push(newItem);
            }
          });
  
          return formattedResults;
        }else{
          return [];
        }
      });
  }
  
      
};

module.exports = {
  display: {
    description:
      'Finds an existing record in any module you specify (Accounts, Contacts, Cases, etc..). Optionally, create a record if none are found.',
    hidden: false,
    label: 'Find Record',
  },
  key: 'find_record',
  noun: 'Find Record',
  operation: {
    inputFields: [
      {
        key: 'modules',
        label: 'Module',
        type: 'string',
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
      {
        key: 'search_field_1',
        label: 'Search Field 1',
        type: 'string',
        dynamic: 'all_fields.key.key',
        required: false,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'value_for_search_field_1',
        label: 'Value For Search Field 1',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'search_field_2',
        label: 'Search Field 2',
        type: 'string',
        dynamic: 'all_fields.key.key',
        required: false,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'value_for_search_field_2',
        label: 'Value For Search Field 2',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'search_field_3',
        label: 'Search Field 3',
        type: 'string',
        dynamic: 'all_fields.key.key',
        required: false,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'value_for_search_field_3',
        label: 'Value For Search Field 3',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'search_field_4',
        label: 'Search Field 4',
        type: 'string',
        dynamic: 'all_fields.key.key',
        required: false,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'value_for_search_field_4',
        label: 'Value For Search Field 4',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'search_field_5',
        label: 'Search Field 5',
        type: 'string',
        type: 'string',
        dynamic: 'all_fields.key.key',
        required: false,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'value_for_search_field_5',
        label: 'Value For Search Field 5',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
  },
};
