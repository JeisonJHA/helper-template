import React from 'react';
import PropTypes from 'prop-types';

import FileHandler from '../fileReader';

FileImporter.propTypes = {
  handleFile: PropTypes.string.isRequired,
};

export default function FileImporter({ handleFile }) {
  return (
    <div className="upload-expense">
      <input
        type="file"
        id="file"
        className="input-file"
        accept=".json"
        onChange={e => FileHandler(e.target.files[0], handleFile)}
      />
    </div>
  );
}
