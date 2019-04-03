import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withRouter } from "react-router";
import RoundButton from "../../controls/roundButton";

import TemplateContext from "../../../context/templateContext";

import "./index.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    border: "1px solid #ccc"
  },
  button: {
    "align-items": "flex-end"
  }
}));

function Grid({ list, match }) {
  const context = useContext(TemplateContext);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [disabled, setDisabled] = useState(true);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
    setDisabled(false);
  }

  function handleListItems(templateList) {
    return templateList.map((item, index) => (
      <ListItem
        key={index}
        button
        selected={selectedIndex === index}
        onClick={event => handleListItemClick(event, index)}
      >
        <ListItemText primary={item.title} />
      </ListItem>
    ));
  }

  function clickHandle() {
    context.addConfig(list.templates[selectedIndex]);
  }

  return (
    <div className="grid">
      <List className={classes.root} component="nav">
        {handleListItems(list.templates)}
      </List>
      <RoundButton
        className={classes.button}
        name="Create"
        disabled={disabled}
        onClick={clickHandle}
        path={`${match.url}/params`}
      />
    </div>
  );
}
export default withRouter(Grid);
