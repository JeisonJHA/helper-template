import React, { useContext, useEffect, useState } from "react";
import TemplateContext from "../../../../context/templateContext";
import uuid from "node-uuid";

import './index.css';

const regArr = new RegExp(/{\$array#((\n.*)*|.*)}/, 'gm');

export default function Template({ folder, file }) {
  const [renderTemp, setRenderTemp] = useState(null)
  const [template, setTemplate] = useState(null)
  const [model, setModel] = useState(null)
  const context = useContext(TemplateContext)

  useEffect(() => {
    async function fetchData() {
      context.config &&
        await import('../../../../template/' + folder + '/' + file)
          .then(mod => {
            setTemplate(mod.default);
          });
    }
    fetchData()
  }, []);

  useEffect(() => {
    setModel(context.model)
  }, [context.model]);

  useEffect(() => {
    formatTemplate(template)
  }, [template]);

  function formatTemplate(temp) {
    arrayTreatment(temp)
    let regex;
    for (let param in model) {
      regex = new RegExp(`{\\$${param}}`, 'gm');
      temp = temp.replace(regex, model[param])
    }
    temp && (temp = formatGUIDParams(temp))
    temp && setRenderTemp(temp);
  }

  function arrayTreatment(temp) {
    let regDados = [];
    let matRes;
    matRes = temp.match(regArr);
    if (matRes) { regDados = regDados.concat(matRes) }
  }

  function formatGUIDParams(temp) {
    let regex;
    regex = new RegExp(/{\$GUID\w*}/, 'gm');
    return temp.replace(regex, uuid.v4().toUpperCase())
  }

  return (
    <div>
      <pre>
        <code>
          {context.model && renderTemp}
        </code>
      </pre>
    </div>
  )
}