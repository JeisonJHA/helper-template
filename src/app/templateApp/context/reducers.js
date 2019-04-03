export const ADD_SCHEMA = 'ADD_SCHEMA';
export const REMOVE_SCHEMA = 'REMOVE_SCHEMA';
export const ADD_MODEL = 'ADD_MODEL';
export const REMOVE_MODEL = 'REMOVE_MODEL';
export const ADD_CONFIG = 'ADD_CONFIG';
export const REMOVE_CONFIG = 'REMOVE_CONFIG';

const addSchema = (schema, state) => ({
  ...state,
  schema,
});

const removeSchema = (schema, state) => ({
  ...state,
  schema: null,
});

const addModel = (model, state) => ({
  ...state,
  model,
});

const removeModel = (model, state) => ({
  ...state,
  model: null,
});

const addConfig = (config, state) => ({
  ...state,
  config,
});

const removeConfig = (config, state) => ({
  ...state,
  config: null,
});

export const templateReducer = (state, action) => {
  switch (action.type) {
    case ADD_SCHEMA:
      return addSchema(action.schema, state);
    case REMOVE_SCHEMA:
      return removeSchema(action.schema, state);
    case ADD_MODEL:
      return addModel(action.model, state);
    case REMOVE_MODEL:
      return removeModel(action.model, state);
    case ADD_CONFIG:
      return addConfig(action.config, state);
    case REMOVE_CONFIG:
      return removeConfig(action.config, state);
    default:
      return state;
  }
};
