import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '../grid';
import './index.css';
import { Fab } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    padding: 50
  },
  grid: {
    flexDirectons: "center"
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Fab variant="extended" color="primary">New Config</Fab>
      </div>
      <div className={classes.grid}>
        <Grid list={[{ title: "Processador" }, { title: "Rotina SIT" }]} />
      </div>
    </div>
  );
};
