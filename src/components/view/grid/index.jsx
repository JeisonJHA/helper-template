import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
}));

export default (list) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  function handleListItems(list) {
    return list.list.map(item => {
      return (<ListItem
        key={list.list.indexOf(item)}
        button
        selected={selectedIndex === list.list.indexOf(item)}
        onClick={event => handleListItemClick(event, list.list.indexOf(item))}
      >
        <ListItemText primary={item.title} />
      </ListItem>)
    })

  }

  return (
    <div className={classes.root}>
      <List component="nav">
        {handleListItems(list)}
      </List>
      <Fab disabled variant="extended">GO!</Fab>
    </div>
  );
}