const regField = new RegExp(/{\$\w*}/, 'gm');
const regFieldName = new RegExp(/(?<=\$)\w*(?=})/, 'gm');
const regArr = new RegExp(/{\$array#((\n.*)*|.*)}/, 'gm');
const regArrName = new RegExp(/(?<=#)\w*(?=#)/, 'gm');
const regArrField = new RegExp(/{#\w*#\$arrayField\$\w*}/, 'gm');
const string = {
  type: 'string',
};

function createArray() {
  const array = {};
  array.type = 'array';
  array.items = {};
  array.items.type = 'object';
  array.items.required = ['*'];
  array.items.properties = {};
  return array;
}

function initSchema() {
  const schema = {};
  schema.type = 'object';
  schema.required = ['*'];
  schema.properties = {};
  return schema;
}

module.exports = function createSchema(schemaFields) {
  let schema = initSchema();
  schemaFields.forEach((field) => {
    if (field.match(regField) && !field.match(/GUID/)) {
      schema.properties[getFieldName(field)] = string;
    }
    if (field.match(regArr) && !hasArray(field, schema)) {
      schema.properties[getArrayName(field)] = createArray();
    }
    if (field.match(regArrField) && !field.match(regArr)) {
      schema = addFieldArr(schema, field);
    }
  });
  return schema;
}

function addFieldArr(schema, field) {
  const schemavar = schema;
  schemavar.properties[getArrayName(field)].items.properties[getFieldName(field)] = string;
  return schemavar;
}

function getArrayName(field) {
  return field.match(regArrName)[0];
}

function getFieldName(field) {
  return field.match(regFieldName)[0];
}

function hasArray(field, schema) {
  return schema[getArrayName(field)] === null;
}
