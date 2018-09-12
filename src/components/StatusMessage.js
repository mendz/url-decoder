import React from 'react';

const StatusMessage = ({ message, error }) => {
  const inlineStyle = {
    color: 'green'
  }

  if (error) {
    inlineStyle.color = 'red';
  }

  return (
    <p style={inlineStyle}>{message}</p>
  )
}

export default StatusMessage;