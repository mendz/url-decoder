import React from 'react';

type Props = {
  clicked: React.MouseEventHandler<HTMLButtonElement>;
  autoWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: JSX.Element | string;
  title?: string;
  testId?: string;
};

const Button = ({
  clicked,
  autoWidth,
  type = 'button',
  className = '',
  children,
  title = '',
  testId,
}: Props): JSX.Element => {
  const minWidth = autoWidth ? '' : 'min-w-3xs';
  return (
    <button
      className={`w-auto ${minWidth} bg-zinc-100 hover:bg-zinc-50 text-zinc-900 border border-zinc-400 p-2 rounded text-lg font-medium ${className}`}
      onClick={clicked}
      type={type}
      title={title}
      data-testid={testId}
    >
      {children}
    </button>
  );
};

export default Button;
