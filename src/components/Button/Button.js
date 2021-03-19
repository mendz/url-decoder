import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const Button = ({ clicked, children }) => {
  return (
    <button className={classes.button} onClick={clicked}>
      {children}
    </button>
  );
};

Button.propTypes = {
  clicked: PropTypes.func,
};

export default Button;
