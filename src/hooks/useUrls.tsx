import { Reducer, useEffect, useReducer, useState } from 'react';
import { TrimValue } from '../contexts/SettingsContext';
import { ChromeStorageKeys } from '../global-types/enums';
import {
  clearStorage,
  decodeUrls,
  encodeUrls,
  loadFromStorage,
  saveToStorage,
} from '../utils';

interface IUrls {
  importUrls: string[];
  urls: ExportUrlsState;
  updateUrls: (
    newUrls: string[],
    trimValue: TrimValue,
    isDecode: boolean
  ) => void;
  clearStorageUrls: () => void;
  swapUrls: (trimValue: TrimValue, isDecode: boolean) => void;
}

type ExportUrlsState = {
  displayExportUrls: string[];
  originalExportUrls: string[];
};

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

const exportUrlsInitialState: ExportUrlsState = {
  displayExportUrls: [],
  originalExportUrls: [],
};

function handleDecodeEncode(urls: string[], isDecode: boolean): string[] {
  if (isDecode) {
    return decodeUrls(urls);
  }
  return encodeUrls(urls);
}

function handleTrimDomain(
  urls: string[],
  isDecode: boolean
): Partial<ExportUrlsState> {
  return {
    displayExportUrls: handleDecodeEncode(
      urls.map((url: string) => {
        try {
          const { pathname, search } = new URL(url);
          return pathname + search;
        } catch (error) {
          return url.replace(
            /^[a-z]{4,5}:\/{2}[a-z]{1,}:[0-9]{1,4}.(.*)/,
            '$1'
          );
        }
      }),
      isDecode
    ),
  };
}

function handleTrimPath(
  urls: string[],
  isDecode: boolean
): Partial<ExportUrlsState> {
  return {
    displayExportUrls: handleDecodeEncode(
      urls.map((url: string) => new URL(url).hostname),
      isDecode
    ),
  };
}

function reducer(exportUrls: ExportUrlsState, action: Action): ExportUrlsState {
  const urls: string[] = action.importUrls;
  const importUrlsUpdated: string[] = handleDecodeEncode(urls, action.isDecode);
  switch (action.type) {
    case Types.TRIM_DOMAIN:
      return {
        ...exportUrls,
        originalExportUrls: importUrlsUpdated,
        ...handleTrimDomain(urls, action.isDecode),
      };

    case Types.TRIM_PATH:
      return {
        ...exportUrls,
        originalExportUrls: importUrlsUpdated,
        ...handleTrimPath(urls, action.isDecode),
      };
    case Types.NO_TRIM:
    default:
      const state: ExportUrlsState = {
        originalExportUrls: importUrlsUpdated,
        displayExportUrls: importUrlsUpdated,
      };
      return { ...exportUrls, ...state };
  }
}

/**
 * Handle all the load urls (decoded and the ones to decode) from the local storage and updating it when the value changed
 * @returns {IUrls} IUrls
 */
export function useUrls(initialIsDecodeState: boolean): IUrls {
  const [importUrls, setImportUrls] = useState<string[]>([]);
  const [urls, exportUrlsDispatch] = useReducer<
    Reducer<ExportUrlsState, Action>
  >(reducer, exportUrlsInitialState);
  const [isDecode, setIsDecode] = useState<boolean>(initialIsDecodeState);

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
        saveToStorage(ChromeStorageKeys.DECODED_URLS, urls.displayExportUrls);
      } catch (error) {
        console.error(error);
      }
    }
  }, [urls, importUrls]);

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

  function swapUrls(trimValue: TrimValue, isDecode: boolean) {
    updateUrls(urls.originalExportUrls, trimValue, isDecode);
  }

  return {
    importUrls,
    urls,
    updateUrls,
    clearStorageUrls,
    swapUrls,
  };
}
