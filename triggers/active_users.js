const perform = async (z, bundle) => {
  const options = {
    url: `{{process.env.URL_INSTANCE}}/legacy/Api/index.php/V8/module/Users?filter[status][eq]=Active&sort=department&page[number]=${bundle.meta.page+1}&page[size]=50`,
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
        name: attributes.name,
        id: item.id,
      };

      // Ajoutez l'objet formaté au tableau
      formattedResults.push(formattedItem);
    });

    return formattedResults;
  });
};

module.exports = {
  operation: { perform: perform, canPaginate: true },
  display: {
    description: 'Returns all active assigned users',
    hidden: true,
    label: 'Active Users',
  },
  key: 'active_users',
  noun: 'Active Users',
};
