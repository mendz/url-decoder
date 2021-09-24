import { useEffect, useReducer, useState } from 'react';
import { TrimValue } from '../contexts/SettingsContext';
import { ChromeStorageKeys } from '../global-types/enums';
import {
  clearStorage,
  decodeURLs,
  loadFromStorage,
  saveToStorage,
} from '../utils';

interface IUrls {
  urlsToDecode: string[];
  decodedUrls: string[];
  updateUrls: (newUrls: string[], trimValue: TrimValue) => void;
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
  urlsToDecode: string[];
};

function reducer(decodedUrlsState: State, action: Action): State {
  const decodedUrls: string[] = decodeURLs(action.urlsToDecode);
  switch (action.type) {
    case Types.TRIM_DOMAIN:
      return decodedUrls.map((url: string) => {
        const { pathname, search } = new URL(url);
        return pathname + search;
      });
    case Types.TRIM_PATH:
      return decodedUrls.map((url: string) => new URL(url).hostname);
    case Types.NO_TRIM:
    default:
      return decodedUrls;
  }
}

/**
 * Handle all the load urls (decoded and the ones to decode) from the local storage and updating it when the value changed
 * @returns {IUrls} IUrls
 */
export function useUrls(): IUrls {
  const [urlsToDecode, setUrlsToDecode] = useState<string[]>([]);
  const [decodedUrls, decodedUrlsDispatch] = useReducer(reducer, []);

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

        setUrlsToDecode(urlsToDecode ?? []);
        decodedUrlsDispatch({
          urlsToDecode: decodedUrls ?? [],
          type: Types.NO_TRIM,
        });
      }
    }
    asyncLoadFromStorage();
  }, []);

  // componentDidUpdate
  useEffect(() => {
    if (chrome?.storage) {
      saveToStorage(ChromeStorageKeys.URLS_TO_DECODE, urlsToDecode);
      saveToStorage(ChromeStorageKeys.DECODED_URLS, decodedUrls);
    }
  }, [urlsToDecode, decodedUrls]);

  function clearStorageUrls() {
    if (chrome?.storage) {
      clearStorage();
    }
    setUrlsToDecode([]);
    decodedUrlsDispatch({ urlsToDecode: [], type: Types.NO_TRIM });
  }

  function updateUrls(newUrls: string[], trimValue: TrimValue) {
    setUrlsToDecode(newUrls);
    decodedUrlsDispatch({
      urlsToDecode: newUrls,
      type: Types[trimValue],
    });
  }

  return {
    urlsToDecode,
    decodedUrls,
    updateUrls,
    clearStorageUrls,
  };
}
