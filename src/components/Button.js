import React from 'react';

import classes from './css/Button.module.css';

const Button = ({ innerText, clicked }) => {
   return <button className={classes.button} onClick={clicked}>{innerText}</button>
};

export default Button;