import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from '..';
import HomePage from '../homePage';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '400px',
    'flex-flow': 'row nowrap',
    'place-content': 'stretch space-around',
    'align-items': 'center',
  },
  grid: {
    flexDirectons: "center"
  }
}));

function Routes() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Routes;