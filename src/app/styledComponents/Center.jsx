/* eslint-disable react/require-default-props */
import React from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';

const Center = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  textAlign: 'center',
});

StyledComponent.propTypes = {
  children: PropTypes.object.isRequired,
  styles: PropTypes.object,
};

export default function StyledComponent(props) {
  const { children, styles } = props;
  return <Center style={{ ...styles }}>{children}</Center>;
}
