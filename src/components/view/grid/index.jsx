import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RoundButton from '../../controls/roundButton';

import TemplateContext from "../../../context/templateContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    border: '1px solid #ccc'
  },
  button: {
    'align-items': 'flex-end'
  }
}));


export default function Grid({ list }) {
  const context = useContext(TemplateContext);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [disabled, setDisabled] = useState(true);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
    setDisabled(false);
  }

  function handleListItems(list) {
    return list.map(item => {
      return (
        <ListItem
          key={list.indexOf(item)}
          button
          selected={selectedIndex === list.indexOf(item)}
          onClick={event => handleListItemClick(event, list.indexOf(item))}
        >
          <ListItemText primary={item.title} />
        </ListItem>)
    })
  }

  function clickHandle() {
    context.addConfig(list.templates[selectedIndex])
  }

  return (
    <div>
      <List className={classes.root} component="nav">
        {handleListItems(list.templates)}
      </List>
      <RoundButton
        className={classes.button}
        name="Create"
        disabled={disabled}
        onClick={clickHandle}
        path="/params"
      />
    </div>
  );
}