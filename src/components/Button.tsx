import React from 'react';

type Props = {
  clicked: React.MouseEventHandler<HTMLButtonElement>;
  autoWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: JSX.Element | string;
};

const Button = ({
  clicked,
  autoWidth,
  type = 'button',
  children,
}: Props): JSX.Element => {
  const minWidth = autoWidth ? '' : 'min-w-3xs';
  return (
    <button
      className={`w-auto ${minWidth} bg-gray-100 hover:bg-gray-50 text-gray-900 border border-gray-400 p-2 rounded text-xl font-medium first:mr-4`}
      onClick={clicked}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
