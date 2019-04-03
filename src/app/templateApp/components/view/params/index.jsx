import React, { useState, useContext, useEffect } from 'react';
import { SchemaForm, utils } from 'react-schema-form';
import { withRouter } from 'react-router';
import TemplateContext from '../../../context/templateContext';
import RoundButton from '../../controls/roundButton';

import './index.css';

const regField = new RegExp(/{\$\w*}/, 'gm');
const regFieldName = new RegExp(/(?<=\$)\w*(?=})/, 'gm');
const regArr = new RegExp(/{\$array#((\n.*)*|.*)}/, 'gm');
const regArrName = new RegExp(/(?<=#)\w*(?=#)/, 'gm');
const regArrField = new RegExp(/{#\w*#\$arrayField\$\w*}/, 'gm');
const string = { type: 'string' };

function Params() {
  const context = useContext(TemplateContext);
  const [model, setModel] = useState({});
  const [sche, setSche] = useState(null);
  let regDados = [];

  useEffect(() => {
    if (context.config) readParams(context.config);
    return () => {
      context.removeSchema(null);
      context.addModel(model);
    };
  }, []);

  function onModelChange(key, val, type) {
    const newModel = model;
    utils.selectOrSet(key, newModel, val, type);
    setModel(newModel);
  }

  function readParams(config) {
    importAll(config);
    createSchema(regDados);
  }

  function importAll(config) {
    const { files } = config;
    files.forEach((file) => {
      // eslint-disable-next-line import/no-dynamic-require
      const mod = require(`../../../template/${config.folder}/${file.name}`);
      findSchema(mod.default);
    });
  }

  function findSchema(temp) {
    let matRes;
    matRes = temp.match(regField);
    if (matRes) {
      regDados = regDados.concat(matRes);
    }
    matRes = temp.match(regArr);
    if (matRes) {
      regDados = regDados.concat(matRes);
    }
    matRes = temp.match(regArrField);
    if (matRes) {
      regDados = regDados.concat(matRes);
    }
    regDados = arrayUnique(regDados);
  }

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

  function createSchema(schemaFields) {
    let schema = initSchema();
    // for (const field of schemaFields) {
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
    setSche(schema);
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

  const arrayUnique = arr => arr.filter((item, index) => arr.indexOf(item) >= index);

  function handleClick() {}
  return (
    <div>
      {sche && (
        <>
          <SchemaForm schema={sche} model={model} onModelChange={onModelChange} />
          <RoundButton
            name="OK"
            colorName="primary"
            onClick={handleClick}
            path="/template/templates"
          />
        </>
      )}
    </div>
  );
}

export default withRouter(Params);
