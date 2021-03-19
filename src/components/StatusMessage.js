import React from 'react';
import PropsTypes from 'prop-types';

const StatusMessage = ({ message, error }) => {
  let classColor = 'text-green-600';

  if (error) {
    classColor = 'text-red-500';
  }

  return (
    <p className={`bg-warmGray-100 text-lg p-1 mt-3 max-w-lg ${classColor}`}>
      {message}
    </p>
  );
};

StatusMessage.propTypes = {
  message: PropsTypes.string,
  error: PropsTypes.bool,
};

export default StatusMessage;
