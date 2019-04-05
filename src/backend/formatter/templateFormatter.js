const uuid = require('node-uuid');
const formatter = require('../regexTemplate');


module.exports = function formatTemplate(temp, modelData, nameAlias) {
  if (temp === '') {
    return {
      error: 'Template is empty',
    };
  }
  if (!modelData) {
    return {
      error: 'Model data is empty',
    };
  }
  let tempFile = temp;
  tempFile = arrayTreatment(tempFile, modelData);
  let regex;
  let nameFile = nameAlias;
  Object.entries(modelData).forEach(([key, value]) => {
    regex = new RegExp(`{\\$${key}}`, 'gm');
    tempFile = tempFile.replace(regex, value);
    if (nameFile) {
      nameFile = nameFile.replace(regex, value);
    }
  });
  tempFile = formatGUIDParams(tempFile);
  return {
    tempFile,
    nameFile,
  };
};

function arrayTreatment(temp, modelData) {
  return formatter(temp, modelData);
}

function formatGUIDParams(temp) {
  const regex = new RegExp(/{\$GUID\w*}/, 'gm');
  return temp.replace(regex, uuid.v4().toUpperCase());
}
