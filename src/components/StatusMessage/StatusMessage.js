import React from 'react';
import PropsTypes from 'prop-types';

import classes from './StatusMessage.module.css';

const StatusMessage = ({ message, error }) => {
  let classColor = classes.succeed;

  if (error) {
    classColor = classes.error;
  }

  return (
    <p className={`${classes.statusMessage} ${classColor}`}>{message}</p>
  )
}

StatusMessage.propTypes = {
  message: PropsTypes.string,
  error: PropsTypes.bool
}

export default StatusMessage;