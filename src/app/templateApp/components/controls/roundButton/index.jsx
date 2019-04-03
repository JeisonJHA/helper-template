/* eslint-disable react/require-default-props */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Fab } from '@material-ui/core';

import PropTypes from 'prop-types';

RoundButton.propTypes = {
  name: PropTypes.string.isRequired,
  colorName: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default function RoundButton({
  name, colorName, disabled, onClick, path,
}) {
  return (
    <Fab
      variant="extended"
      disabled={disabled}
      color={colorName || 'default'}
      onClick={onClick}
      to={path}
      component={NavLink}
    >
      {name}
    </Fab>
  );
}
