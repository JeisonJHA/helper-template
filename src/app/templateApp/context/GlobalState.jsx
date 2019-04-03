import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import TemplateContext from './templateContext';
import {
  templateReducer,
  ADD_SCHEMA,
  REMOVE_SCHEMA,
  ADD_MODEL,
  REMOVE_MODEL,
  ADD_CONFIG,
  REMOVE_CONFIG,
} from './reducers';

const initialState = {
  schema: null,
  model: null,
  config: null,
};

GlobalState.propTypes = {
  children: PropTypes.object.isRequired,
};

const GlobalState = (props) => {
  const { children } = props;
  const [{ schema, model, config }, dispatch] = useReducer(templateReducer, initialState);

  const addSchema = (schema) => {
    dispatch({ type: ADD_SCHEMA, schema });
  };

  const removeSchema = (schema) => {
    dispatch({ type: REMOVE_SCHEMA, schema });
  };

  const addModel = (model) => {
    dispatch({ type: ADD_MODEL, model });
  };

  const removeModel = (model) => {
    dispatch({ type: REMOVE_MODEL, model });
  };

  const addConfig = (config) => {
    dispatch({ type: ADD_CONFIG, config });
  };

  const removeConfig = (config) => {
    dispatch({ type: REMOVE_CONFIG, config });
  };
  return (
    <TemplateContext.Provider
      value={{
        schema,
        model,
        config,
        addSchema,
        removeSchema,
        addModel,
        removeModel,
        addConfig,
        removeConfig,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default GlobalState;
