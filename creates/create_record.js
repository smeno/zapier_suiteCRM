const perform = async (z, bundle) => {
  // CECI EST UN TEST

  // Corps de la requête dynamique :
  const requestBody = {
    data: {
      type: bundle.inputData.modules,
      attributes: {},
    },
  };

  // Pour Ajoutez des attributs au corps de la demande en fonction du module choisi
  if (bundle.inputData.modules === 'Accounts') {
    requestBody.data.attributes.salutation_c = bundle.inputData.salutation_c;
    requestBody.data.attributes.firstname_c = bundle.inputData.firstname_c;
    requestBody.data.attributes.lastname_c = bundle.inputData.lastname_c;
    requestBody.data.attributes.birthdate_c = bundle.inputData.birthdate_c;
    requestBody.data.attributes.type_c = bundle.inputData.type_c;
    requestBody.data.attributes.statut_c = bundle.inputData.statut_c;
    requestBody.data.attributes.type_de_compte_c = bundle.inputData.type_de_compte_c;
    requestBody.data.attributes.numero_secu_c = bundle.inputData.numero_secu_c;
}

else if (bundle.inputData.modules === 'Contacts') {
  requestBody.data.attributes.data_origin_c = bundle.inputData.data_origin_c;
  requestBody.data.attributes.source_c = bundle.inputData.source_c;
  requestBody.data.attributes.email_c = bundle.inputData.email_c;
  requestBody.data.attributes.address_postal_street_c = bundle.inputData.address_postal_street_c;
  requestBody.data.attributes.address_postal_city_c = bundle.inputData.address_postal_city_c;
  requestBody.data.attributes.address_postal_postalcode_c = bundle.inputData.address_postal_postalcode_c;
  requestBody.data.attributes.phone_number_c = bundle.inputData.phone_number_c;
  requestBody.data.attributes.account_id = bundle.inputData.account_id;
}

else if (bundle.inputData.modules === 'Cases') {
  requestBody.data.attributes.type_c = bundle.inputData.type_c;
  requestBody.data.attributes.canal_c = bundle.inputData.canal_c;
  requestBody.data.attributes.motif_c = bundle.inputData.motif_c;
  requestBody.data.attributes.sous_motif_c = bundle.inputData.sous_motif_c;
  requestBody.data.attributes.produit_reclamation_c = bundle.inputData.produit_reclamation_c;
  requestBody.data.attributes.description = bundle.inputData.description;
  requestBody.data.attributes.status = bundle.inputData.status;
  requestBody.data.attributes.id_campagne_c = bundle.inputData.id_campagne_c;
  requestBody.data.attributes.assigned_user_id = bundle.inputData.assigned_user_id;
  requestBody.data.attributes.account_id = bundle.inputData.account_id;
}
else if (bundle.inputData.modules === 'Calls') {
  requestBody.data.attributes.sujet_c = bundle.inputData.sujet_c;
  requestBody.data.attributes.status = bundle.inputData.status;
  requestBody.data.attributes.date_start = bundle.inputData.date_start;
  requestBody.data.attributes.parent_type = bundle.inputData.parent_type;
  requestBody.data.attributes.parent_id = bundle.inputData.parent_id;
  requestBody.data.attributes.description = bundle.inputData.description;
  requestBody.data.attributes.assigned_user_id = bundle.inputData.assigned_user_id;
}
else if (bundle.inputData.modules === 'Tasks') {
  requestBody.data.attributes.sujet_c = bundle.inputData.sujet_c;
  requestBody.data.attributes.status = bundle.inputData.status;
  requestBody.data.attributes.date_start = bundle.inputData.date_start;
  requestBody.data.attributes.date_due = bundle.inputData.date_due;
  requestBody.data.attributes.parent_type = bundle.inputData.parent_type;
  requestBody.data.attributes.parent_id = bundle.inputData.parent_id;
  requestBody.data.attributes.description = bundle.inputData.description;
  requestBody.data.attributes.assigned_user_id = bundle.inputData.assigned_user_id;
}
else if (bundle.inputData.modules === 'Contracts') {
  requestBody.data.attributes.statut_metier_c = bundle.inputData.statut_metier_c;
  requestBody.data.attributes.metier_c = bundle.inputData.metier_c;
  requestBody.data.attributes.contract_id_c = bundle.inputData.contract_id_c;
  requestBody.data.attributes.product_designation_c = bundle.inputData.product_designation_c;
  requestBody.data.attributes.start_date_c = bundle.inputData.start_date_c;
  requestBody.data.attributes.end_date_c = bundle.inputData.end_date_c;
  requestBody.data.attributes.contract_account_id = bundle.inputData.contract_account_id;
}
else if (bundle.inputData.modules === 'Notes') {
  requestBody.data.attributes.parent_type = bundle.inputData.parent_type;
  requestBody.data.attributes.parent_id = bundle.inputData.parent_id;
  requestBody.data.attributes.name = bundle.inputData.name;
  requestBody.data.attributes.filename = bundle.inputData.filename;
  requestBody.data.attributes.description = bundle.inputData.description;
}


  const options = {
    url: '{{process.env.URL_INSTANCE}}/legacy/Api/index.php/V8/module',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: requestBody,
  
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const data = response.json.data;
    const result = {
      id: data.id,
      ...data.attributes
    };

    return result;
  });
};
// Partie dynamique
const getDynamicFields = (z, bundle) => {
  const dynamicFields = [];

  
  const selectedModule = bundle.inputData.modules;

  
  if (selectedModule === 'Accounts') {
    dynamicFields.push(
      {
        key: 'salutation_c',
        label: 'Salutation',
        type: 'string',
        choices: [
          {
            "sample": "M","value": "M","label": "Monsieur"
          },
          {
            "sample": "Mme","value": "Mme","label": "Madame"
          }
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'firstname_c',
        label: 'First Name',
        type: 'string',
        required: false,
        list: false,
      },
      {
        key: 'lastname_c',
        label: 'Last Name',
        type: 'string',
        required: false,
        list: false,
      },
      {
        key: 'birthdate_c',
        label: 'Birthdate',
        type: 'string',
        required: false,
        list: false,
      },
      {
        key: 'type_c',
        label: 'Type',
        type: 'string',
        choices: [
          {
            "sample": "prospect","value": "prospect","label": "Prospect"
          },
          {
            "sample": "client","value": "client","label": "Client"
          }
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'statut_c',
        label: 'Status',
        type: 'string',
        choices: [
          {
            "sample": "chaud","value": "chaud","label": "Chaud"
          },
          {
            "sample": "froid","value": "froid","label": "Froid"
          },
          {
            "sample": "actif","value": "actif","label": "Actif"
          },
          {
            "sample": "inactif","value": "inactif","label": "Inactif"
          },
          {
            "sample": "dormant","value": "dormant","label": "Dormant"
          }
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'type_de_compte_c',
        label: 'Account Type',
        type: 'string',
        choices: [
          {
            "sample": "tns","value": "tns","label": "TNS"
          },
          {
            "sample": "ja","value": "ja","label": "Jeune Actif"
          },
          {
            "sample": "etudiant","value": "etudiant","label": "Etudiant"
          },
          {
            "sample": "autre","value": "autre","label": "Autre"
          }
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'numero_secu_c',
        label: 'Social Security Number',
        type: 'string',
        required: false,
        list: false,
      }
    );
  }
else if (selectedModule === 'Contacts') {
  dynamicFields.push(
    {
      key: 'data_origin_c',
      label: 'Data Origin',
      type: 'string',
        choices: [
          {
            "sample": "base_interne","value": "base_interne","label": "Base interne au SI"
          },
          {
            "sample": "base_externe","value": "base_externe","label": "Base externe au SI"
          },
          {
            "sample": "saisie_manuelle","value": "saisie_manuelle","label": "Saisie manuelle"
          }
        ],
      required: false,
      list: false,
      altersDynamicFields: false,
    },
    {
      key: 'source_c',
      label: 'Source',
      type: 'string',
        choices: [
          {
            "sample": "appli_mobile","value": "appli_mobile","label": "Appli mobile"
          },
          {
            "sample": "comparateur_assurances","value": "comparateur_assurances","label": "Comparateur d'assurances"
          },
          {
            "sample": "COOG","value": "COOG","label": "COOG"
          },
          {
            "sample": "bases_courtiers_assurances","value": "bases_courtiers_assurances","label": "BDD courtiers Assurances"
          },
          {
            "sample": "visite_agence","value": "visite_agence","label": "Visite agence"
          },
          {
            "sample": "appel_telephone","value": "appel_telephone","label": "Appel Téléphonique"
          },
          {
            "sample": "Chat","value": "Chat","label": "Chat"
          },
          {
            "sample": "salon","value": "salon","label": "Salons & Evènements"
          },
          {
            "sample": "base_prospect","value": "base_prospect","label": "BDD Prospects"
          },
          {
            "sample": "web","value": "web","label": "Site Web"
          },
          {
            "sample": "base_immobilier","value": "base_immobilier","label": "BDD Immobilier"
          },
          {
            "sample": "courrier","value": "courrier","label": "Courrier"
          }
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
    },
    {
      key: 'parent_type',
      label: 'Related To',
      type: 'string',
      choices: [
        {"sample": "Accounts","value": "Accounts","label": "Account"}
      ],
      required: true,
      list: false,
      altersDynamicFields: false,
    },
    {
      key: 'account_id',
      label: 'Related Account',
      type: 'string',
      dynamic: 'all_parent_records.id.name',
      required: false,
      list: false,
      altersDynamicFields: true,
    },  
    {
      key: 'email_c',
      label: 'Email Address',
      type: 'string',
      required: false,
      list: false,
    },
    {
      key: 'phone_number_c',
      label: 'Phone Number',
      type: 'string',
      required: false,
      list: false,
    },
    {
      key: 'address_postal_street_c',
      label: 'Street',
      type: 'string',
      required: false,
      list: false,
    },
    {
      key: 'address_postal_city_c',
      label: 'City',
      type: 'string',
      required: false,
      list: false,
    },
    {
      key: 'address_postal_postalcode_c',
      label: 'Postal Code',
      type: 'string',
      required: false,
      list: false,
    },
  );
} 
else if (selectedModule === 'Cases') {
    dynamicFields.push(
      {
        key: 'type_c',
        label: 'Type',
        type: 'string',
        choices: [
          {
            "sample": "entrant","value": "entrant","label": "Entrant"
          },
          {
            "sample": "sortant","value": "sortant","label": "Sortant"
          }
        ],
      required: false,
      list: false,
      altersDynamicFields: false,
      },
      {
        key: 'canal_c',
        label: 'Channel',
        type: 'string',
        choices: [
          {
            "sample": "agence","value": "agence","label": "Agence"
          },
          {
            "sample": "telephone","value": "telephone","label": "Téléphone"
          },
          {
            "sample": "email_formulaire_en_ligne","value": "email_formulaire_en_ligne","label": "Email (formulaire en ligne)"
          },
          {
            "sample": "devis_en_ligne","value": "devis_en_ligne","label": "Appli mobile"
          },
          {
            "sample": "comparateur_assurances","value": "comparateur_assurances","label": "Site web"
          },
          {
            "sample": "reseaux_sociaux","value": "reseaux_sociaux","label": "Réseaux sociaux"
          },
          {
            "sample": "courrier","value": "courrier","label": "Courrier"
          },
          {
            "sample": "chat","value": "chat","label": "Chat"
          },
          {
            "sample": "Partenaire_Form_Immojeune","value": "Partenaire_Form_Immojeune","label": "Immojeune formulaire site"
          },
          {
            "sample": "Formulaire_CDA_Webinaire","value": "Formulaire_CDA_Webinaire","label": "Webinaire CDA"
          },
          {
            "sample": "Formulaire_Web_Campagne","value": "Formulaire_Web_Campagne","label": "Formulaire site"
          },
          {
            "sample": "Dde_Rappel","value": "Dde_Rappel","label": "Demande de rappel"
          },
          {
            "sample": "formulaire_satisfaction","value": "formulaire_satisfaction","label": "Formulaire de satisfaction"
          },
          {
            "sample": "espace_personnel","value": "espace_personnel","label": "Espace Personnel"
          }
        ],
      required: false,
      list: false,
      altersDynamicFields: false,
      },
      {
        key: 'motif_c',
        label: 'Reason',
        type: 'string',
        choices: [
          {
            "sample": "contrat_situation","value": "contrat_situation","label": "Mon contrat / ma situation"
          },
          {
            "sample": "remboursement","value": "remboursement","label": "Mes remboursements"
          },
          {
            "sample": "renseignement","value": "renseignement","label": "Devis / Adhésion Produits"
          },
          {
            "sample": "espace_perso","value": "espace_perso","label": "Mon espace perso"
          },
          {
            "sample": "reclamation","value": "reclamation","label": "Ma réclamation"
          },
          {
            "sample": "autre_question","value": "autre_question","label": "Autre question"
          },
          {
            "sample": "connexion noemie","value": "connexion noemie","label": "Connexion Noémie"
          },
          {
            "sample": "renouvellement_mrh","value": "renouvellement_mrh","label": "Renouvellement MRH"
          },
          {
            "sample": "rebond_commercial","value": "rebond_commercial","label": "Rebond Commercial"
          },
          {
            "sample": "avis_satisfaction_resil","value": "avis_satisfaction_resil","label": "Avis satisfaction résiliation"
          },
          {
            "sample": "campagne_rappel","value": "campagne_rappel","label": "Campagne de rappel"
          }          
        ],
      required: false,
      list: false,
      altersDynamicFields: false,
      },
      {
        key: 'sous_motif_c',
        label: 'Sub-Reason',
        type: 'string',
        choices: [
          {
            "sample": "contrat_situation_envoi_reception","value": "contrat_situation_envoi_reception","label": "Envoi ou réception de doc"
          },
          {
            "sample": "remboursement_dem_devis","value": "remboursement_dem_devis","label": "Demande de devis avant d'engager des frais"
          },
          {
            "sample": "remboursement_mutuelle_pack","value": "remboursement_mutuelle_pack","label": "Mutuelle remboursement"
          },
          {
            "sample": "renseignement_mutuelle_pack","value": "renseignement_mutuelle_pack","label": "Mutuelle devis"
          },
          {
            "sample": "rebond_commercial_mutuelle_pack","value": "rebond_commercial_mutuelle_pack","label": "Mutuelle rebond"
          },
          {
            "sample": "rebond_commercial_changement_garanties","value": "rebond_commercial_changement_garanties","label": "Changement de garanties rebond"
          },
          {
            "sample": "remboursement_pack_sante","value": "remboursement_pack_sante","label": "Pack santé"
          },
          {
            "sample": "renseignement_pack_assurances","value": "renseignement_pack_assurances","label": "Pack assurances devis"
          },
          {
            "sample": "renseignement_responsabilite_civile","value": "renseignement_responsabilite_civile","label": "Responsabilité civile devis"
          },
          {
            "sample": "rebond_commercial_pack_assurances","value": "rebond_commercial_pack_assurances","label": "Pack assurances rebond"
          },
          {
            "sample": "rebond_commercial_responsabilite_civile","value": "rebond_commercial_responsabilite_civile","label": "Responsabilité civile rebond"
          },
          {
            "sample": "renseignement_MRH","value": "renseignement_MRH","label": "MRH devis"
          },
          {
            "sample": "rebond_commercial_MRH","value": "rebond_commercial_MRH","label": "MRH rebond"
          },
          {
            "sample": "renseignement_PSI","value": "renseignement_PSI","label": "Santé à l'étranger devis"
          },
          {
            "sample": "rebond_commercial_PSI","value": "rebond_commercial_PSI","label": "Santé à l'étranger rebond"
          },
          {
            "sample": "renseignement_NVEI","value": "renseignement_NVEI","label": "NVEI devis"
          },
          {
            "sample": "rebond_commercial_NVEI","value": "rebond_commercial_NVEI","label": "NVEI rebond"
          },
          {
            "sample": "espace_perso_probleme","value": "espace_perso_probleme","label": "Problème d'accès"
          },
          {
            "sample": "espace_perso_pb_visu","value": "espace_perso_pb_visu","label": "Je ne visualise par une donnée de mon dossier, contrat"
          },
          {
            "sample": "espace_perso_dem_evolv","value": "espace_perso_dem_evolv","label": "Demande d'évolution fonctionnalités"
          },
          {
            "sample": "reclamation_quest_contrat","value": "reclamation_quest_contrat","label": "Concernant mon contrat"
          },
          {
            "sample": "reclamation_quest_remb","value": "reclamation_quest_remb","label": "Concernant un remboursement, une demande de prise en charge ou un devis"
          },
          {
            "sample": "reclamation_quest_resil","value": "reclamation_quest_resil","label": "Concernant la résiliation de mon contrat"
          },
          {
            "sample": "contrat_situation_liaison_noemie","value": "contrat_situation_liaison_noemie","label": "Liaisons Noémie"
          },
          {
            "sample": "contrat_situation_mise_a_jour_infos","value": "contrat_situation_mise_a_jour_infos","label": "Mise à jour des coordonnées"
          },
          {
            "sample": "renseignement_incoming","value": "renseignement_incoming","label": "Incoming"
          },
          {
            "sample": "reclamation_souscription_adhesion","value": "reclamation_souscription_adhesion","label": "Souscription, Adhésion"
          },
          {
            "sample": "renseignement_changer_garantie","value": "renseignement_changer_garantie","label": "Changement de garantie"
          },
          {
            "sample": "contrat_situation_cotisation","value": "contrat_situation_cotisation","label": "Cotisations"
          },
          {
            "sample": "contrat_situation_resiliation_retractation","value": "contrat_situation_resiliation_retractation","label": "Résiliation/Rétractation"
          },
          {
            "sample": "renseignement_auto","value": "renseignement_auto","label": "Auto devis"
          },
          {
            "sample": "rebond_commercial_auto","value": "rebond_commercial_auto","label": "Auto rebond"
          },
          {
            "sample": "renseignement_deux_roues","value": "renseignement_deux_roues","label": "2 roues devis"
          },
          {
            "sample": "rebond_commercial_deux_roues","value": "rebond_commercial_deux_roues","label": "2 roues rebond"
          },
          {
            "sample": "campagne_rappel_contact_ancien","value": "campagne_rappel_contact_ancien","label": "Contact ancien"
          },
          {
            "sample": "campagne_rappel_renouvellement","value": "campagne_rappel_renouvellement","label": "Renouvellement"
          },
          {
            "sample": "campagne_rappel_prospection","value": "campagne_rappel_prospection","label": "Prospection"
          },
          {
            "sample": "renseignement_autre","value": "renseignement_autre","label": "Autre question devis"
          },
          {
            "sample": "contrat_situation_autre","value": "contrat_situation_autre","label": "Autre question contrat"
          },
          {
            "sample": "reclamation_pb_autre","value": "reclamation_pb_autre","label": "Autres réclamation"
          }
        ],
      required: false,
      list: false,
      altersDynamicFields: false,
      },
      {
        key: 'parent_type',
        label: 'Related To',
        type: 'string',
        choices: [
          {"sample": "Accounts","value": "Accounts","label": "Account"}
        ],
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'account_id',
        label: 'Related Account',
        type: 'string',
        dynamic: 'all_parent_records.id.name',
        required: false,
        list: false,
        altersDynamicFields: true,
      },  
      {
        key: 'produit_reclamation_c',
        label: 'Targeted Product',
        type: 'string',
        choices: [
          {"sample": "mutuelle_pack","value": "mutuelle_pack","label": "Mutuelle"},
          {"sample": "pack_sante","value": "pack_sante","label": "Pack santé"},
          {"sample": "pack_assurances","value": "pack_assurances","label": "Pack assurances"},
          {"sample": "responsabilite_civile","value": "responsabilite_civile","label": "Responsabilité civile"},
          {"sample": "PSI","value": "PSI","label": "Santé à l'étranger"},
          {"sample": "Assurance_scolaire","value": "Assurance_scolaire","label": "Assurance scolaire"},
          {"sample": "MRH","value": "MRH","label": "MRH"},
          {"sample": "MRA","value": "MRA","label": "MRA"},
          {"sample": "auto","value": "auto","label": "Auto"},
          {"sample": "deux_roues","value": "deux_roues","label": "2 roues"},
          {"sample": "NVEI","value": "NVEI","label": "NVEI"},
          {"sample": "incoming","value": "incoming","label": "Incoming"},
          {"sample": "autre","value": "autre","label": "Autre"}
        ],
      required: false,
      list: false,
      altersDynamicFields: false,
      },
      {
        key: 'description',
        label: 'Description',
        type: 'text',
        required: false,
        list: false,
      },
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        choices: [
          {"sample": "en_cours","value": "en_cours","label": "En cours"},
          {"sample": "clos","value": "clos","label": "Clos"},
          {"sample": "rejete","value": "rejete","label": "Rejeté"},
          {"sample": "a_traiter","value": "a_traiter","label": "A traiter"}
        ],
      required: false,
      list: false,
      altersDynamicFields: false,
      },
      {
        key: 'id_campagne_c',
        label: 'Campaign ID',
        type: 'string',
        required: false,
        list: false,
      },
      {
        key: 'assigned_user_id',
        label: 'Assigned User ID',
        type: 'string',
        dynamic: 'active_users.id.name',
        required: false,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'transfert_rebond_c',
        label: 'Rebound Transfer',
        type: 'string',
        choices: [
          {"sample": "oui","value": "oui","label": "Oui"},
          {"sample": "non","value": "non","label": "Non"}
        ],
      required: false,
      list: false,
      altersDynamicFields: false,
      },
    );
  } 
  else if (selectedModule === 'Calls') {
      dynamicFields.push(
        {
          key: 'sujet_c',
          label: 'Subject',
          type: 'string',
          choices: [
            {"sample": "rappel_1","value": "rappel_1","label": "Rappel 1"},
            {"sample": "rappel_2","value": "rappel_2","label": "Rappel 2"},
            {"sample": "rappel_3","value": "rappel_3","label": "Rappel 3"},
            {"sample": "rappel_gestion","value": "rappel_gestion","label": "Rappel gestion"},
            {"sample": "autre","value": "autre","label": "Autre"},
            {"sample": "appel_entrant","value": "appel_entrant","label": "Appel entrant"},
            {"sample": "reprise_","value": "reprise_alfred","label": "Reprise Alfred I"}
          ],
        required: false,
        list: false,
        altersDynamicFields: false,
        },
        {
          key: 'status',
          label: 'Status',
          type: 'string',
          choices: [
            {"sample": "decroche","value": "decroche","label": "Décroché"},
            {"sample": "injoignable","value": "injoignable","label": "Injoignable"},
            {"sample": "repondeur","value": "repondeur","label": "Répondeur"},
            {"sample": "entrant","value": "entrant","label": "Entrant"}
          ],
        required: false,
        list: false,
        altersDynamicFields: false,
          },
        {
          key: 'date_start',
          label: 'Date Start & Time',
          type: 'datetime',
          required: false,
          list: false,
        },
        {
          key: 'parent_type',
          label: 'Parent Type',
          type: 'string',
          choices: [
            {"sample": "Accounts","value": "Accounts","label": "Account"},
            {"sample": "Cases","value": "Cases","label": "Case"}
          ],
        required: false,
        list: false,
        altersDynamicFields: false,
        },
        {
          key: 'parent_id',
          label: 'Parent ID',
          type: 'string',
          dynamic: 'all_parent_records.id.name',
          required: false,
          list: false,
          altersDynamicFields: true,
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text',
          required: false,
          list: false,
        },
        {
          key: 'assigned_user_id',
          label: 'Assigned User ID',
          type: 'string',
          dynamic: 'active_users.id.name',
          required: false,
          list: false,
          altersDynamicFields: true,
        },
      );
    } 
    else if (selectedModule === 'Tasks') {
        dynamicFields.push(
          {
            key: 'sujet_c',
            label: 'Subject',
            type: 'string',
            choices: [
              {"sample": "rappel","value": "rappel","label": "Rappel"},
              {"sample": "verifier_paiement","value": "verifier_paiement","label": "Vérifier paiement"},
              {"sample": "verifier_souscription","value": "verifier_souscription","label": "Vérifier souscription assurance à à l'étranger"},
              {"sample": "verifier_mail","value": "verifier_mail","label": "Vérifier mail"},
              {"sample": "envoyer_lien_paiement","value": "envoyer_lien_paiement","label": "Envoyer lien de paiement"},
              {"sample": "envoyer_mail","value": "envoyer_mail","label": "Envoyer mail"},
              {"sample": "autre","value": "autre","label": "Autre"},
              {"sample": "reprise_alfred","value": "reprise_alfred","label": "Reprise Alfred I"}

            ],
            required: false,
            list: false,
            altersDynamicFields: false,
            },
            {
            key: 'status',
            label: 'Status',
            type: 'string',
            choices: [
              {"sample": "not_started","value": "not_started","label": "Non démarré"},
              {"sample": "in_progress","value": "in_progress","label": "En traitement"},
              {"sample": "completed","value": "completed","label": "Terminé"},
              {"sample": "pending_input","value": "pending_input","label": "En attente"},
              {"sample": "deferred","value": "deferred","label": "Différé"}                            
            ],
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'date_start',
            label: 'Start Date',
            type: 'datetime',
            required: false,
            list: false,
          },
          {
            key: 'date_due',
            label: 'Date Due',
            type: 'datetime',
            required: false,
            list: false,
          },
          {
            key: 'parent_type',
            label: 'Parent Type',
            type: 'string',
            choices: [
              {"sample": "Accounts","value": "Accounts","label": "Account"},
              {"sample": "Cases","value": "Cases","label": "Case"}
            ],
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'parent_id',
            label: 'Parent ID',
            type: 'string',
            dynamic: 'all_parent_records.id.name',
            required: false,
            list: false,
            altersDynamicFields: true,
          },
          {
            key: 'description',
            label: 'Description',
            type: 'text',
            required: false,
            list: false,
          },
          {
            key: 'assigned_user_id',
            label: 'Assigned User ID',
            type: 'string',
            dynamic: 'active_users.id.name',
            required: false,
            list: false,
            altersDynamicFields: true,
          },
        );
      }
  else if (selectedModule === 'Contracts') {
    dynamicFields.push(
      {
        key: 'statut_metier_c',
        label: 'Status',
        type: 'string',
        choices: [
          {"sample": "actif","value": "actif","label": "Actif"},
          {"sample": "inactif","value": "inactif","label": "Inactif"}        
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'metier_c',
        label: 'Product Type',
        type: 'string',
        choices: [
          {"sample": "mutuelles","value": "mutuelles","label": "Mutuelles"},
          {"sample": "assurances","value": "assurances","label": "Assurances"}             
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'contract_id_c',
        label: 'Contract ID Number',
        type: 'string',
        required: false,
        list: false,
      },
      {
        key: 'product_designation_c',
        label: 'Product Name',
        type: 'string',
        choices: [
          {"sample": "MUT_M","value": "MUT_M","label": "MUT M"},
          {"sample": "MUT_L","value": "MUT_L","label": "MUT L"},
          {"sample": "MUT_XL","value": "MUT_XL","label": "MUT XL"},
          {"sample": "MUT_2XL","value": "MUT_2XL","label": "MUT 2XL"},
          {"sample": "MUT_3XL","value": "MUT_3XL","label": "MUT 3XL"},
          {"sample": "CSS_Sortie","value": "CSS_Sortie","label": "CSS Sortie"},
          {"sample": "La_perf","value": "La_perf","label": "La perf"},
          {"sample": "Pack_sante","value": "Pack_sante","label": "Pack santé"},
          {"sample": "Smeno_Gestion_Eco_100_130","value": "Smeno_Gestion_Eco_100_130","label": "Smeno Gestion Eco 100 130"},
          {"sample": "Smeno_Gestion_L_XL","value": "Smeno_Gestion_L_XL","label": "Smeno Gestion Eco X XL"},
          {"sample": "Pack_Assurances","value": "Pack_Assurances","label": "Pack Assurances"},
          {"sample": "Smeno_Travel_Sante_etranger","value": "Smeno_Travel_Sante_etranger","label": "Smeno Travel_Santé à l'étranger"},
          {"sample": "AVA_Sante_etranger","value": "AVA_Sante_etranger","label": "AVA_Santé à l'étranger"},
          {"sample": "S2C_MRH_ETU","value": "S2C_MRH_ETU","label": "S2C_MRH ETU"},
          {"sample": "S2C_MRH_JA","value": "S2C_MRH_JA","label": "S2C_MRH JA"},
          {"sample": "Responsabilite_Civile","value": "Responsabilite_Civile","label": "Responsabilité Civile"},
          {"sample": "THELEM","value": "THELEM","label": "THELEM"},
          {"sample": "S2C_NVEI","value": "S2C_NVEI","label": "S2C_NVEI"},
          {"sample": "S2C_MRA","value": "S2C_MRA","label": "S2C_MRA"},
          {"sample": "April_Auto","value": "April_Auto","label": "April_Auto"},
          {"sample": "Wazari_Auto","value": "Wazari_Auto","label": "Wazari_Auto"},
          {"sample": "April_Moto","value": "April_Moto","label": "April_Moto"},
          {"sample": "S2C_Assurance_scolaire","value": "S2C_Assurance_scolaire","label": "S2C_Assurance scolaire"}                    
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'start_date_c',
        label: 'Start Date',
        type: 'datetime',
        required: false,
        list: false,
      },
      {
        key: 'end_date_c',
        label: 'End Date',
        type: 'datetime',
        required: false,
        list: false,
      },
      {
        key: 'parent_type',
        label: 'Parent Type',
        type: 'string',
        choices: [
          {"sample": "Accounts","value": "Accounts","label": "Account"}
        ],
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'contract_account_id',
        label: 'Related Account',
        type: 'string',
        dynamic: 'all_parent_records.id.name',
        required: false,
        list: false,
        altersDynamicFields: true,
      },
    );
  }
  else if (selectedModule === 'Notes') {
    dynamicFields.push(
      {
        key: 'parent_type',
        label: 'Parent Type',
        type: 'string',
        choices: [
          {"sample": "Accounts","value": "Accounts","label": "Account"},
          {"sample": "Cases","value": "Cases","label": "Case"}
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'parent_id',
        label: 'Parent ID',
        type: 'string',
        dynamic: 'all_parent_records.id.name',
        required: false,
        list: false,
        altersDynamicFields: true,
  },
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        required: false,
        list: false,
      },
      {
        key: 'filename',
        label: 'Filename',
        type: 'string',
        required: false,
        list: false,
      },
      {
        key: 'description',
        label: 'Description',
        type: 'text',
        required: false,
        list: false,
      },
    );
  }

  return dynamicFields;
};








//
module.exports = {
  display: {
    description:
      'Creates a new record in any module you specify (Accounts, Contacts, Cases, etc..).',
    hidden: false,
    label: 'Create Record',
  },
  key: 'create_record',
  noun: 'Create Record',
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
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      getDynamicFields,
    ],
    perform: perform,
  },
};
