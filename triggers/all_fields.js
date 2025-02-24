const perform = async (z, bundle) => {
  const options = {
    url: `{{process.env.URL_INSTANCE}}/legacy/Api/index.php/V8/meta/fields/${bundle.inputData.modules}`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const data = response.json.data.attributes; // Accédez aux données d'attributs

    // Champs spécifiques en fonction du choix du module
    let specificFields;

    switch (bundle.inputData.modules) {
      case 'Accounts':
        specificFields = [
          'email1',
          'salutation_c',
          'firstname_c',
          'lastname_c',
          'birthdate_c',
          'type_c',
          'status',
          'account_type_c',
          'numero_secu_c',
        ];
        break;
      case 'Contacts':
        specificFields = [
          'email_c',
          'phone_number_c',
          'data_origin_c',
          'source_c',          
          'address_postal_street_c',
          'address_postal_city_c',
          'address_postal_postalcode_c',
        ];
        break;
      case 'Cases':
        specificFields = [
          'type_c',
          'canal_c',
          'motif_c',
          'sous_motif_c',
          'produit_reclamation_c',
          'description',
          'status',
          'id_campagne_c',
          'assigned_user_id',
          'sous_motif_save_c',
        ];
        break;
      case 'Calls':
        specificFields = [
          'sujet_c',
          'status',
          'date_start',
          'parent_type',
          'parent_id',
          'description',
          'assigned_user_id',
        ];
        break;
      case 'Tasks':
        specificFields = [
          'sujet_c',
          'status',
          'date_start',
          'date_due',
          'parent_type',
          'parent_id',
          'description',
          'assigned_user_id',
        ];
        break;
      case 'Contracts':
        specificFields = [
          'name',
          'statut_metier_c',
          'metier_c',
          'contract_id_c',
          'product_designation_c',
          'start_date_c',
          'end_date_c',
          'contract_account_id',
        ];
        break;
      case 'Notes':
        specificFields = [
          'parent_type',
          'parent_id',
          'name',
          'filename',
          'description',
        ];
        break;
      default:
        specificFields = [];
        break;
    }

    const attributesArray = [];

    for (const attributeName in data) {
      const attribute = data[attributeName];
      attributesArray.push({
        key: attributeName,
        type: attribute.type,
      });
    }

    // Triez les attributs avant de les ajouter à formattedResults
    attributesArray.sort((a, b) => {
      const aIndex = specificFields.indexOf(a.key);
      const bIndex = specificFields.indexOf(b.key);

      // Mettez en premier ceux qui ont un index inférieur dans la liste spécifique
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      } else if (aIndex !== -1) {
        return -1;
      } else if (bIndex !== -1) {
        return 1;
      } else {
        return 0;
      }
    });

    // Créez un tableau pour stocker les noms des attributs avec un ID incrémenté
    const formattedResults = attributesArray.map((attribute, index) => ({
      id: (index + 1).toString(),
      key: attribute.key,
      type: attribute.type,
    }));

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
  },
  display: {
    description:
      'This trigger helps generate a list of fields depending on the chosen module',
    hidden: true,
    label: 'All Fields',
  },
  key: 'all_fields',
  noun: 'All Fields',
};
