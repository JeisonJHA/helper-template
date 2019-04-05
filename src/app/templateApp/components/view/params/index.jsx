import React, { useState, useContext, useEffect } from 'react';
import { SchemaForm, utils } from 'react-schema-form';
import { withRouter } from 'react-router';
import TemplateContext from '../../../context/templateContext';
import RoundButton from '../../controls/roundButton';

import './index.css';

const regField = new RegExp(/{\$\w*}/, 'gm');
// const regFieldName = new RegExp(/(?<=\$)\w*(?=})/, 'gm');
const regArr = new RegExp(/{\$array#((\n.*)*|.*)}/, 'gm');
// const regArrName = new RegExp(/(?<=#)\w*(?=#)/, 'gm');
const regArrField = new RegExp(/{#\w*#\$arrayField\$\w*}/, 'gm');
// const string = { type: 'string' };

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

  function readParams(config) {
    importAll(config);
    createSchema(regDados);
  }

  function importAll(config) {
    const { files } = config;
    files.forEach((file) => {
      // eslint-disable-next-line import/no-dynamic-require
      const mod = require(`../../../template/${config.folder}/${file.name}`);
      findSchemas(mod.default);
    });
  }

  async function createSchema(schemaFields) {
    const response = await fetch('/api/createschema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ schemaFields }),
    });
    let body = await response.text();
    body = JSON.parse(body);
    setSche(body.schema);
  }

  function findSchemas(temp) {
    regDados = findSchema(temp, regDados, regField);
    regDados = findSchema(temp, regDados, regArr);
    regDados = findSchema(temp, regDados, regArrField);
    // matRes = temp.match(regField);
    // if (matRes) {
    //   regDados = regDados.concat(matRes);
    // }
    // matRes = temp.match(regArr);
    // if (matRes) {
    //   regDados = regDados.concat(matRes);
    // }
    // matRes = temp.match(regArrField);
    // if (matRes) {
    //   regDados = regDados.concat(matRes);
    // }
    regDados = arrayUnique(regDados);
  }

  function findSchema(temp, regexData, regex) {
    const matRes = temp.match(regex);
    if (matRes) {
      return regexData.concat(matRes);
    }
    return regexData;
  }

  const arrayUnique = arr => arr.filter((item, index) => arr.indexOf(item) >= index);

  function onModelChange(key, val, type) {
    const newModel = model;
    utils.selectOrSet(key, newModel, val, type);
    setModel(newModel);
  }

  return (
    <div>
      {sche && (
        <>
          <SchemaForm schema={sche} model={model} onModelChange={onModelChange} />
          <RoundButton name="OK" colorName="primary" path="/template/templates" />
        </>
      )}
    </div>
  );
}

export default withRouter(Params);
