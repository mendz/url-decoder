import { createContext, useEffect, useState } from 'react';
import { ChromeStorageKeys } from '../global-types/enums';
import { loadFromStorage, saveToStorage } from '../utils';

type Props = { children: JSX.Element[] | JSX.Element };

export interface ISettings {
  trimValue: TrimValue;
  showCurrentUrlButton: ShowCurrentURLButtonValue;
  setTrimValue: (timeValue: TrimValue) => void;
  setShowCurrentButtonValue: (
    showCurrentURLValue: ShowCurrentURLButtonValue
  ) => void;
}

export enum TrimValue {
  NO_TRIM = 'NO_TRIM',
  TRIM_DOMAIN = 'TRIM_DOMAIN',
  TRIM_PATH = 'TRIM_PATH',
}

export enum ShowCurrentURLButtonValue {
  SHOW = 'SHOW',
  NOT_SHOW = 'NOT_SHOW',
}

export const settingsDefaultValue: ISettings = {
  trimValue: TrimValue.NO_TRIM,
  showCurrentUrlButton: ShowCurrentURLButtonValue.NOT_SHOW,
  setTrimValue: (timeValue: TrimValue) => null,
  setShowCurrentButtonValue: (copyValue: ShowCurrentURLButtonValue) => null,
};

const SettingsContext = createContext<ISettings>(settingsDefaultValue);
const { Provider } = SettingsContext;

function SettingsProvider({ children }: Props): JSX.Element {
  const [trimValue, setTrimValue] = useState<TrimValue>(
    settingsDefaultValue.trimValue
  );
  const [
    showCurrentUrlButton,
    setShowCurrentButton,
  ] = useState<ShowCurrentURLButtonValue>(
    settingsDefaultValue.showCurrentUrlButton
  );

  // load at start the values
  useEffect(() => {
    async function asyncLoadFromStorage() {
      if (chrome?.storage) {
        const showCurrentUrlValuePromise = loadFromStorage(
          ChromeStorageKeys.COPY_OPTION_VALUE
        );
        const trimOptionValuePromise = loadFromStorage(
          ChromeStorageKeys.TRIM_OPTION_VALUE
        );
        const [showCurrentButton, trimValue] = await Promise.all([
          showCurrentUrlValuePromise,
          trimOptionValuePromise,
        ]);

        setShowCurrentButton(
          showCurrentButton ?? settingsDefaultValue.showCurrentUrlButton
        );
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
        saveToStorage(
          ChromeStorageKeys.COPY_OPTION_VALUE,
          showCurrentUrlButton
        );
        saveToStorage(ChromeStorageKeys.TRIM_OPTION_VALUE, trimValue);
      } catch (error) {
        console.error(error);
      }
    }
  }, [showCurrentUrlButton, trimValue]);

  return (
    <Provider
      value={{
        trimValue,
        showCurrentUrlButton,
        setTrimValue: (value) => setTrimValue(value),
        setShowCurrentButtonValue: (value) => setShowCurrentButton(value),
      }}
    >
      {children}
    </Provider>
  );
}

export { SettingsContext, SettingsProvider };
