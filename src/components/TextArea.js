import React from 'react';
import { selectText } from '../utils/text';
import './css/textArea.css';

const TextArea = React.forwardRef(({ textareaPlaceholder, handleOnChange, value, readonly, doubleClickCopy }, decodedUrlsElementRef) => {
  return (
    <div className={`text-area-container${readonly ? ' readonly' : ''}`}>
      <textarea
        ref={decodedUrlsElementRef}
        placeholder={textareaPlaceholder}
        onChange={handleOnChange}
        value={value}
        readOnly={readonly}
        onDoubleClick={doubleClickCopy && selectText}></textarea>
    </div>
  )
});

export default TextArea;