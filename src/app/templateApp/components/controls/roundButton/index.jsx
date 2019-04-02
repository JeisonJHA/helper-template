import React from 'react';
import { NavLink } from "react-router-dom";
import { Fab } from '@material-ui/core';

export default function RoundButton({ name, colorName, disabled, onClick, path }) {
  return (
    <Fab
      variant="extended"
      disabled={disabled}
      color={colorName ? colorName : "default"}
      onClick={onClick}
      to={path}
      component={NavLink}
    >
      {name}
    </Fab>
  );
};