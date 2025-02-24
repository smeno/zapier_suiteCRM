const authentication = require('./authentication');
const newRecordTrigger = require('./triggers/new_record.js');
const allFieldsTrigger = require('./triggers/all_fields.js');
const allRecordsTrigger = require('./triggers/all_records.js');
const allParentRecordsTrigger = require('./triggers/all_parent_records.js');
const activeUsersTrigger = require('./triggers/active_users.js');
const createRecordCreate = require('./creates/create_record.js');
const updateRecordCreate = require('./creates/update_record.js');
const findRecordSearch = require('./searches/find_record.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  triggers: {
    [newRecordTrigger.key]: newRecordTrigger,
    [allFieldsTrigger.key]: allFieldsTrigger,
    [allRecordsTrigger.key]: allRecordsTrigger,
    [allParentRecordsTrigger.key]: allParentRecordsTrigger,
    [activeUsersTrigger.key]: activeUsersTrigger,
  },
  creates: {
    [createRecordCreate.key]: createRecordCreate,
    [updateRecordCreate.key]: updateRecordCreate,
  },
  searches: { [findRecordSearch.key]: findRecordSearch },
  searchOrCreates: {
    find_record: {
      create: 'create_record',
      display: {
        description:
          'Finds an existing record in any module you specify (Accounts, Contacts, Cases, etc..). Optionally, create a record if none are found.',
        label: 'Find or Create Record',
      },
      key: 'find_record',
      search: 'find_record',
    },
  },
};
