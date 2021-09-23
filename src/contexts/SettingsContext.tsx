import { createContext, useState } from 'react';
import Modal from '../components/Modal';

type Props = { children: JSX.Element[] | JSX.Element };

export interface ISettings {
  trimValue: TrimValue;
  copyValue: CopyCurrentURLValue;
  setTrimValue: (timeValue: TrimValue) => void;
  setCopyValue: (copyValue: CopyCurrentURLValue) => void;
}

export enum TrimValue {
  NO_TRIM = 'NO_TRIM',
  TRIM_DOMAIN = 'TRIM_DOMAIN',
  TRIM_PATH = 'TRIM_PATH',
}

export enum CopyCurrentURLValue {
  COPY = 'COPY',
  NOT_COPY = 'NOT_COPY',
}

const defaultValue: ISettings = {
  trimValue: TrimValue.NO_TRIM,
  copyValue: CopyCurrentURLValue.COPY,
  setTrimValue: (timeValue: TrimValue) => null,
  setCopyValue: (copyValue: CopyCurrentURLValue) => null,
};

const SettingsContext = createContext<ISettings>(defaultValue);
const { Provider } = SettingsContext;

const SettingsProvider = ({ children }: Props): JSX.Element => {
  const [trimValue, setTrimValue] = useState<TrimValue>(defaultValue.trimValue);
  const [copyValue, setCopyValue] = useState<CopyCurrentURLValue>(
    defaultValue.copyValue
  );
  return (
    <Provider
      value={{
        trimValue,
        copyValue,
        setTrimValue: (value) => setTrimValue(value),
        setCopyValue: (value) => setCopyValue(value),
      }}
    >
      <Modal />
      {children}
    </Provider>
  );
};

export { SettingsContext, SettingsProvider };
