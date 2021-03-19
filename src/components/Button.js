import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ clicked, children }) => {
  return (
    <button
      className="w-auto min-w-3xs bg-gray-100 hover:bg-gray-50 text-gray-900 border border-gray-400 p-2 rounded text-xl font-medium first:mr-4"
      onClick={clicked}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  clicked: PropTypes.func,
};

export default Button;
