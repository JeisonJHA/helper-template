import React from "react";
import { Actions, jsonformsReducer } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { materialFields, materialRenderers } from '@jsonforms/material-renderers';
import './index.css';

const store = createStore(
  combineReducers({ jsonforms: jsonformsReducer() }),
  {
    jsonforms: {
      renderers: materialRenderers,
      fields: materialFields,
    }
  }
);

export default (data, schema, uischema) => {
  store.dispatch(Actions.init(data, schema, uischema));
  return (
    <div>
      <JsonForms />
    </div>
  )
}