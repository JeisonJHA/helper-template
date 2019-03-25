import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import './index.css';
import App from './components/view/app';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <Provider >
  <App />
  // {/* </Provider> */ }
  , document.getElementById('root')
);