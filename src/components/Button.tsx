import React from 'react';

type Props = {
  clicked: React.MouseEventHandler<HTMLButtonElement>;
  autoWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  classes?: string;
  children: JSX.Element | string;
};

const Button = ({
  clicked,
  autoWidth,
  type = 'button',
  classes = '',
  children,
}: Props): JSX.Element => {
  const minWidth = autoWidth ? '' : 'min-w-3xs';
  return (
    <button
      className={`w-auto ${minWidth} bg-gray-100 hover:bg-gray-50 text-gray-900 border border-gray-400 p-2 rounded text-lg font-medium ${classes}`}
      onClick={clicked}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
