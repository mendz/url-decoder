import { useEffect, useState } from 'react';
import { ChromeStorageKeys } from '../global-types/enums';
import { clearStorage, loadFromStorage, saveToStorage } from '../utils';

interface IUrls {
  urlsToDecode: string[];
  setUrlsToDecode: React.Dispatch<React.SetStateAction<string[]>>;
  decodedUrls: string[];
  setDecodedUrls: React.Dispatch<React.SetStateAction<string[]>>;
  clearStorageUrls: () => void;
}

/**
 * Handle all the load urls (decoded and the ones to decode) from the local storage and updating it when the value changed
 * @returns {IUrls} IUrls
 */
export function useUrls(): IUrls {
  const [urlsToDecode, setUrlsToDecode] = useState<string[]>([]);
  const [decodedUrls, setDecodedUrls] = useState<string[]>([]);

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

        setUrlsToDecode(urlsToDecode || []);
        setDecodedUrls(decodedUrls || []);
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
    setDecodedUrls([]);
  }

  return {
    urlsToDecode,
    setUrlsToDecode,
    decodedUrls,
    setDecodedUrls,
    clearStorageUrls,
  };
}
