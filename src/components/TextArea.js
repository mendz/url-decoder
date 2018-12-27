import React from 'react';
import './css/textArea.css';

const TextArea = React.forwardRef(({ textareaPlaceholder, handleOnChange, value, readonly }, decodedUrlsElementRef) => {
  return (
    <div className={`text-area-container${readonly ? ' readonly' : ''}`}>
      <textarea
        ref={decodedUrlsElementRef}
        placeholder={textareaPlaceholder}
        onChange={handleOnChange}
        value={value.join('\n')}
        readOnly={readonly}></textarea>
    </div>
  )
});

export default TextArea;