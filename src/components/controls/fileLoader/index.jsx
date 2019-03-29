import React from "react";

import FileHandler from "../fileReader";

export default function FileImporter({ handleFile }) {
  return (
    <div className='upload-expense'>
      <input
        type="file"
        id="file"
        className="input-file"
        accept=".json"
        onChange={e => FileHandler(e.target.files[0], handleFile)}
      />
    </div>
  )
}