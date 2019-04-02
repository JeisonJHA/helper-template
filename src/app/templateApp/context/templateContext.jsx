import React from 'react';

export default React.createContext({
  schema: null,
  model: null,
  config: null,
  addSchema: schema => { },
  removeSchema: schema => { },
  addModel: model => { },
  removeModel: model => { },
  addConfig: config => { },
  removeConfig: config => { }
});