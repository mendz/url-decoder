import React from 'react';

import './css/textArea.css';

const TextArea = ({ textareaPlaceholder, buttonText, buttonClick, handleOnChange, value, readonly, width }) => {
  const inlineStyle = {
    minWidth: width
  }

  return (
    <div className="text-area">
      <textarea style={inlineStyle}
        placeholder={textareaPlaceholder}
        onChange={handleOnChange}
        value={value}
        readOnly={readonly}></textarea>
      <button onClick={buttonClick}>{buttonText}</button>
    </div>
  )
};

export default TextArea;