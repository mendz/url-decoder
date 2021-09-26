import { useEffect, useReducer, useState } from 'react';
import { TrimValue } from '../contexts/SettingsContext';
import { ChromeStorageKeys } from '../global-types/enums';
import {
  clearStorage,
  decodeEncodeURLs,
  loadFromStorage,
  saveToStorage,
} from '../utils';

interface IUrls {
  importUrls: string[];
  exportUrls: string[];
  updateUrls: (
    newUrls: string[],
    trimValue: TrimValue,
    isDecode: boolean
  ) => void;
  clearStorageUrls: () => void;
}

type State = string[];
enum Types {
  NO_TRIM = 'NO_TRIM',
  TRIM_DOMAIN = 'TRIM_DOMAIN',
  TRIM_PATH = 'TRIM_PATH',
}

type Action = {
  type: Types;
  importUrls: string[];
  isDecode: boolean;
};

function reducer(exportUrls: State, action: Action): State {
  let urls: string[] = [];
  if (action.isDecode) {
    urls = decodeEncodeURLs(action.importUrls);
  } else {
    urls = decodeEncodeURLs(action.importUrls, false);
  }
  switch (action.type) {
    case Types.TRIM_DOMAIN:
      return urls.map((url: string) => {
        const { pathname, search } = new URL(url);
        return pathname + search;
      });
    case Types.TRIM_PATH:
      return urls.map((url: string) => new URL(url).hostname);
    case Types.NO_TRIM:
    default:
      return urls;
  }
}

/**
 * Handle all the load urls (decoded and the ones to decode) from the local storage and updating it when the value changed
 * @returns {IUrls} IUrls
 */
export function useUrls(): IUrls {
  const [importUrls, setImportUrls] = useState<string[]>([]);
  const [exportUrls, exportUrlsDispatch] = useReducer(reducer, []);
  const [isDecode, setIsDecode] = useState<boolean>(true);

  // componentDidMount
  useEffect(() => {
    async function asyncLoadFromStorage() {
      if (chrome?.storage) {
        const urlToDecodePromise = loadFromStorage(
          ChromeStorageKeys.URLS_TO_DECODE
        );
        const decodedUrlsPromise = loadFromStorage(
          ChromeStorageKeys.DECODED_URLS
        );
        const [urlsToDecode, decodedUrls] = await Promise.all([
          urlToDecodePromise,
          decodedUrlsPromise,
        ]);

        setImportUrls(urlsToDecode ?? []);
        exportUrlsDispatch({
          importUrls: decodedUrls ?? [],
          type: Types.NO_TRIM,
          isDecode,
        });
      }
    }
    try {
      asyncLoadFromStorage();
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // componentDidUpdate
  useEffect(() => {
    if (chrome?.storage) {
      try {
        saveToStorage(ChromeStorageKeys.URLS_TO_DECODE, importUrls);
        saveToStorage(ChromeStorageKeys.DECODED_URLS, exportUrls);
      } catch (error) {
        console.error(error);
      }
    }
  }, [exportUrls, importUrls]);

  function clearStorageUrls() {
    if (chrome?.storage) {
      clearStorage();
    }
    setImportUrls([]);
    exportUrlsDispatch({
      importUrls: [],
      type: Types.NO_TRIM,
      isDecode: true,
    });
  }

  function updateUrls(
    newUrls: string[],
    trimValue: TrimValue,
    isDecode: boolean
  ) {
    setImportUrls(newUrls);
    setIsDecode(isDecode);
    exportUrlsDispatch({
      importUrls: newUrls,
      type: Types[trimValue],
      isDecode,
    });
  }

  return {
    importUrls,
    exportUrls,
    updateUrls,
    clearStorageUrls,
  };
}
