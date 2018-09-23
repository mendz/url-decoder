import React from 'react';

import './css/button.css';

const Button = ({ innerText, clicked }) => {
   return <button className='Button' onClick={clicked}>{innerText}</button>
};

export default Button;