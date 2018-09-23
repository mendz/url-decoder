import React from 'react';
import './css/statusMessage.css';

const StatusMessage = ({ message, error }) => {
  const inlineStyle = {padding: '0'};
  let classColor = 'succeed';

  if (error) {
    classColor = 'error';
  }

  if (message) {
    inlineStyle.padding = '5px';
  }

  return (
    <p className={`statusMessage ${classColor}`} style={inlineStyle}>{message}</p>
  )
}

export default StatusMessage;