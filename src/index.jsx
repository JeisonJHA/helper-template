import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Routes from './components/controls/route';
import { templateReducer } from './context/reducers';

import './index.css';

const store = createStore(templateReducer, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>
  , document.getElementById('root')
);