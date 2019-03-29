import React, { useReducer } from 'react';

import TemplateContext from './templateContext'
import {
  templateReducer,
  ADD_SCHEMA,
  REMOVE_SCHEMA,
  ADD_MODEL,
  REMOVE_MODEL,
  ADD_CONFIG,
  REMOVE_CONFIG
} from './reducers'

const initialState = {
  schema: null,
  model: null,
  config: null
}

const GlobalState = props => {
  const [{ schema, model, config }, dispatch] = useReducer(templateReducer, initialState)

  const addSchema = schema => {
    // setTimeout(() => {
    dispatch({ type: ADD_SCHEMA, schema })
    // }, 700);
  }

  const removeSchema = schema => {
    // setTimeout(() => {
    dispatch({ type: REMOVE_SCHEMA, schema })
    // }, 700);
  }

  const addModel = model => {
    // setTimeout(() => {
    dispatch({ type: ADD_MODEL, model })
    // }, 700);
  }

  const removeModel = model => {
    // setTimeout(() => {
    dispatch({ type: REMOVE_MODEL, model })
    // }, 700);
  }

  const addConfig = config => {
    // setTimeout(() => {
    dispatch({ type: ADD_CONFIG, config })
    // }, 700);
  }

  const removeConfig = config => {
    // setTimeout(() => {
    dispatch({ type: REMOVE_CONFIG, config })
    // }, 700);
  }
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
        removeConfig
      }}
    >
      {props.children}
    </TemplateContext.Provider>
  )
}

export default GlobalState;