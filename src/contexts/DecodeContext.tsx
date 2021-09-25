import { createContext, useState } from 'react';

type Props = { children: JSX.Element[] | JSX.Element };

export interface IDecode {
  isDecode: boolean;
  toggle: () => void;
}

const defaultValues: IDecode = {
  isDecode: true,
  toggle: () => null,
};

const DecodeContext = createContext<IDecode>(defaultValues);
const { Provider } = DecodeContext;

function DecodeProvider({ children }: Props): JSX.Element {
  const [isDecode, setIsDecode] = useState(defaultValues.isDecode);

  function toggle(): void {
    setIsDecode((state) => !state);
  }

  return (
    <Provider
      value={{
        isDecode,
        toggle,
      }}
    >
      {children}
    </Provider>
  );
}

export { DecodeContext, DecodeProvider };
