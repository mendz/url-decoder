import React from 'react';

const Button = ({ innerText, clicked }) => {
   return <button onClick={clicked}>{innerText}</button>
};

export default Button;