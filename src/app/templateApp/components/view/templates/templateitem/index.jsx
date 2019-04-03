import React, { useContext, useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import uuid from 'node-uuid';
import PropTypes from 'prop-types';
import TemplateContext from '../../../../context/templateContext';

import formatter from '../../../controls/regexTemplate';

import './index.css';

Template.propTypes = {
  folder: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default function Template({
  folder, file, type, name,
}) {
  const [fileName, setFileName] = useState(null);
  const [typeFile, setTypeFile] = useState(null);
  const [nameAlias, setNameAlias] = useState(null);
  const [renderTemp, setRenderTemp] = useState(null);
  const [template, setTemplate] = useState(null);
  const [model, setModel] = useState(null);
  const context = useContext(TemplateContext);
  const { contextModel } = context;

  useEffect(() => {
    setFileName(file);
    setTypeFile(type);
    setNameAlias(name);
    async function fetchData() {
      if (context.config) {
        await import(`../../../../template/${folder}/${file}`).then((mod) => {
          setTemplate(mod.default);
        });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setModel(contextModel);
  }, [contextModel]);

  useEffect(() => {
    formatTemplate(template);
  }, [template]);

  function formatTemplate(temp) {
    if (!temp) return;
    let tempFile = temp;
    tempFile = arrayTreatment(tempFile);
    let regex;
    let nameFile = nameAlias;
    Object.entries(model).forEach(([key, value]) => {
      regex = new RegExp(`{\\$${key}}`, 'gm');
      tempFile = tempFile.replace(regex, value);
      if (nameFile) {
        nameFile = nameFile.replace(regex, value);
      }
    });
    if (nameFile) {
      setNameAlias(nameFile);
    }
    tempFile = formatGUIDParams(tempFile);
    setRenderTemp(tempFile);
  }
  function arrayTreatment(temp) {
    return formatter(temp, model);
  }

  function formatGUIDParams(temp) {
    const regex = new RegExp(/{\$GUID\w*}/, 'gm');
    return temp.replace(regex, uuid.v4().toUpperCase());
  }

  function browseResult() {
    saveData(renderTemp);
  }

  function saveData(data) {
    const output = document.querySelector('output');

    const MIME_TYPE = 'text/plain';

    window.URL = window.webkitURL || window.URL;

    const prevLink = output.querySelector('a');
    if (prevLink) {
      window.URL.revokeObjectURL(prevLink.href);
      output.innerHTML = '';
    }

    const bb = new Blob([data], { type: MIME_TYPE });

    const a = document.createElement('a');
    a.download = (nameAlias || fileName) + (typeFile || '.txt');
    a.href = window.URL.createObjectURL(bb);

    a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
    a.classList.add('dragout');

    output.appendChild(a);
    a.click();
    a.dataset.disabled = true;

    // Need a small delay for the revokeObjectURL to work properly.
    setTimeout(() => {
      window.URL.revokeObjectURL(a.href);
    }, 1500);
  }
  return (
    <div>
      <input
        id="fileselector"
        type="file"
        onChange={() => browseResult()}
        style={{ display: 'none' }}
      />
      <output className="container" />
      <Fab color="primary">
        <SaveIcon type="file" onClick={event => browseResult(event)} />
      </Fab>
      <pre>
        <code>{contextModel && renderTemp}</code>
      </pre>
    </div>
  );
}
