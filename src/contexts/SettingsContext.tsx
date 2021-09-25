import { createContext, useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { ChromeStorageKeys } from '../global-types/enums';
import { loadFromStorage, saveToStorage } from '../utils';

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

export const settingsDefaultValue: ISettings = {
  trimValue: TrimValue.NO_TRIM,
  copyValue: CopyCurrentURLValue.NOT_COPY,
  setTrimValue: (timeValue: TrimValue) => null,
  setCopyValue: (copyValue: CopyCurrentURLValue) => null,
};

const SettingsContext = createContext<ISettings>(settingsDefaultValue);
const { Provider } = SettingsContext;

function SettingsProvider({ children }: Props): JSX.Element {
  const [trimValue, setTrimValue] = useState<TrimValue>(
    settingsDefaultValue.trimValue
  );
  const [copyValue, setCopyValue] = useState<CopyCurrentURLValue>(
    settingsDefaultValue.copyValue
  );

  // load at start the values
  useEffect(() => {
    async function asyncLoadFromStorage() {
      if (chrome?.storage) {
        const copyOptionValuePromise = loadFromStorage(
          ChromeStorageKeys.COPY_OPTION_VALUE
        );
        const trimOptionValuePromise = loadFromStorage(
          ChromeStorageKeys.TRIM_OPTION_VALUE
        );
        const [copyValue, trimValue] = await Promise.all([
          copyOptionValuePromise,
          trimOptionValuePromise,
        ]);

        setCopyValue(copyValue ?? settingsDefaultValue.copyValue);
        setTrimValue(trimValue ?? settingsDefaultValue.trimValue);
      }
    }
    try {
      asyncLoadFromStorage();
    } catch (error) {
      console.error(error);
    }
  }, []);

  // update the storage values
  useEffect(() => {
    if (chrome?.storage) {
      try {
        saveToStorage(ChromeStorageKeys.COPY_OPTION_VALUE, copyValue);
        saveToStorage(ChromeStorageKeys.TRIM_OPTION_VALUE, trimValue);
      } catch (error) {
        console.error(error);
      }
    }
  }, [copyValue, trimValue]);

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
}

export { SettingsContext, SettingsProvider };
