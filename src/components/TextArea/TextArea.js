import React from 'react';
import classes from './TextArea.module.css';

const TextArea = React.forwardRef(({ textareaPlaceholder, handleOnChange, value, readonly, doubleClick }, decodedUrlsElementRef) => {
  const readOnlyClass = readonly ? ` ${classes.readonly}` : '';
  return (
    <div className={`${classes.container}${readOnlyClass}`}>
      <textarea
        ref={decodedUrlsElementRef}
        placeholder={textareaPlaceholder}
        onChange={handleOnChange}
        onDoubleClick={doubleClick}
        value={value.join('\n')}
        readOnly={readonly}></textarea>
    </div>
  )
});

export default TextArea;