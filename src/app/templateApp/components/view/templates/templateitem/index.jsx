import React, { useContext, useEffect, useState } from "react";
import TemplateContext from "../../../../context/templateContext";
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import uuid from "node-uuid";
import formatter from '../../../controls/regexTemplate';

import './index.css';

export default function Template({ folder, file, type, name }) {
  const [fileName, setFileName] = useState(null)
  const [typeFile, setTypeFile] = useState(null)
  const [nameAlias, setNameAlias] = useState(null)
  const [renderTemp, setRenderTemp] = useState(null)
  const [template, setTemplate] = useState(null)
  const [model, setModel] = useState(null)
  const context = useContext(TemplateContext)

  useEffect(() => {
    setFileName(file)
    setTypeFile(type)
    setNameAlias(name)
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
    if (!temp) return
    temp = arrayTreatment(temp)
    let regex;
    let nameFile = nameAlias;
    console.log(nameAlias)
    for (let param in model) {
      regex = new RegExp(`{\\$${param}}`, 'gm');
      temp = temp.replace(regex, model[param])
      if (nameFile) { nameFile = nameFile.replace(regex, model[param]) };
    }
    if (nameFile) { setNameAlias(nameFile) };
    temp && (temp = formatGUIDParams(temp))
    temp && setRenderTemp(temp);
  }
  function arrayTreatment(temp) {
    return formatter(temp, model)
  }

  function formatGUIDParams(temp) {
    let regex;
    regex = new RegExp(/{\$GUID\w*}/, 'gm');
    return temp.replace(regex, uuid.v4().toUpperCase())
  }

  function browseResult() {
    saveData(renderTemp)
  }


  function saveData(data) {
    var output = document.querySelector('output');

    const MIME_TYPE = 'text/plain';

    window.URL = window.webkitURL || window.URL;

    var prevLink = output.querySelector('a');
    if (prevLink) {
      window.URL.revokeObjectURL(prevLink.href);
      output.innerHTML = '';
    }

    var bb = new Blob([data], { type: MIME_TYPE });

    var a = document.createElement('a');
    console.log(nameAlias)
    a.download = (nameAlias ? nameAlias : fileName) + (typeFile ? typeFile : ".txt");
    a.href = window.URL.createObjectURL(bb);

    a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
    a.classList.add('dragout');

    output.appendChild(a);
    a.click()
    a.dataset.disabled = true;

    // Need a small delay for the revokeObjectURL to work properly.
    setTimeout(function () {
      window.URL.revokeObjectURL(a.href);
    }, 1500);
  }
  return (
    <div>
      <input
        id='fileselector'
        type="file"
        onChange={() => browseResult()}
        style={{ display: "none" }}
      />
      <output className="container"></output>
      <Fab color={"primary"}>
        <SaveIcon type="file" onClick={(event) => browseResult(event)} />
      </Fab>
      <pre>
        <code>
          {context.model && renderTemp}
        </code>
      </pre>
    </div>
  )
}