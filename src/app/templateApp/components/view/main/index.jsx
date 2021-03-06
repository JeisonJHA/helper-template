import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '../grid';

// eslint-disable-next-line import/extensions
import config from '../../../template/config.js';

import './index.css';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '400px',
    'flex-flow': 'row nowrap',
    'place-content': 'stretch space-around',
    'align-items': 'center',
  },
  grid: {
    flexDirectons: 'center',
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <div>
        <RoundButton
          name="New Config"
          colorName="primary"
          path="/params"
        ></RoundButton>
      </div> */}
      <div className={classes.grid}>
        <Grid list={config} />
      </div>
    </div>
  );
}
