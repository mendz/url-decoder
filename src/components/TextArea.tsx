import React from 'react';

type Props = {
  textareaPlaceholder: string;
  handleOnChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string[];
  readonly?: boolean;
  doubleClick?: React.MouseEventHandler<HTMLTextAreaElement>;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  (
    { textareaPlaceholder, handleOnChange, value, readonly, doubleClick },
    decodedUrlsElementRef
  ) => {
    return (
      <textarea
        className="resize-none h-36 w-full first:mb-4 bg-cyan-100 read-only:bg-purple-100 pl-2 pt-2 text-base shadow-md rounded-md"
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

export default TextArea;
