import React from 'react';
import PropTypes from 'prop-types';

const TextArea = React.forwardRef(
  (
    { textareaPlaceholder, handleOnChange, value, readonly, doubleClick },
    decodedUrlsElementRef
  ) => {
    return (
      <textarea
        className="resize-none h-36 w-full first:mb-4 bg-cyan-100 readonly:bg-purple-100 pl-2 pt-2 text-base shadow-md rounded-md"
        ref={decodedUrlsElementRef}
        placeholder={textareaPlaceholder}
        onChange={handleOnChange}
        onDoubleClick={doubleClick}
        value={value.join('\n')}
        readOnly={readonly}
      ></textarea>
    );
  }
);

TextArea.propTypes = {
  textareaPlaceholder: PropTypes.string,
  handleOnChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string),
  readonly: PropTypes.bool,
  doubleClick: PropTypes.func,
};

export default TextArea;
