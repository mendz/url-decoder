import React from 'react';

type Props = {
  clicked: React.MouseEventHandler<HTMLButtonElement>;
  children: string;
};

const Button = ({ clicked, children }: Props): JSX.Element => {
  return (
    <button
      className="w-auto min-w-3xs bg-gray-100 hover:bg-gray-50 text-gray-900 border border-gray-400 p-2 rounded text-xl font-medium first:mr-4"
      onClick={clicked}
    >
      {children}
    </button>
  );
};

export default Button;
