import React, { useState, useEffect, useRef, useContext } from 'react';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import {
  decodeURLs,
  arrayHaveInvalidUrl,
  selectText,
  selectLineTextArea,
  loadFromStorage,
  saveToStorage,
  clearStorage,
} from '../utils';
import { ChromeStorageKeys } from '../global-types/enums';
import { useToast } from '../hooks/useToast';
import { SettingsContext } from '../contexts/SettingsContext';

const App = (): JSX.Element => {
  // this ref is needed for the text selection in the decoded URLs textarea
  const decodedUrlsElementRef = useRef<HTMLTextAreaElement>(null);

  const [urlsToDecode, setUrlsToDecode] = useState<string[]>([]);
  const [decodedUrls, setDecodedUrls] = useState<string[]>([]);
  const { showToast } = useToast();
  const { copyValue, trimValue } = useContext(SettingsContext);

  // componentDidMount
  useEffect(() => {
    const asyncLoadFromStorage = async () => {
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
    };
    asyncLoadFromStorage();
  }, []);

  // componentDidUpdate
  useEffect(() => {
    if (chrome?.storage) {
      saveToStorage(ChromeStorageKeys.URLS_TO_DECODE, urlsToDecode);
      saveToStorage(ChromeStorageKeys.DECODED_URLS, decodedUrls);
    }
  }, [urlsToDecode, decodedUrls]);

  const clearStorageUrls = () => {
    if (chrome?.storage) {
      clearStorage();
    }
    setUrlsToDecode([]);
    setDecodedUrls([]);
  };

  const toast = ({ caption = '', description = '', hasError = false }) => {
    if (decodedUrls && arrayHaveInvalidUrl(decodedUrls)) {
      showToast({
        caption: 'One or more URLs are invalid!',
        description: 'Please check that you use the whole URL',
        hasError: true,
      });
    }

    if (!description?.length) {
      return;
    }

    showToast({
      caption,
      description,
      hasError,
    });
  };

  function handleOnChangeURLsToDecode(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const onChangeUrlsToDecode: string[] = event.target.value.split('\n');
    const onChangeDecodedUrls: string[] = decodeURLs(onChangeUrlsToDecode);

    setUrlsToDecode(onChangeUrlsToDecode);
    setDecodedUrls(onChangeDecodedUrls);
  }

  async function handleClickedCopiedDecodedUrls(): Promise<void> {
    if (!decodedUrls.length) {
      toast({
        caption: 'Failed to copy to decoded URLs',
        description: 'You have to decode at least one URL',
        hasError: true,
      });
      return;
    }
    await navigator.clipboard.writeText(decodedUrls.join('\n')).catch((err) => {
      toast({
        description: 'Failed to copy the decoded URLs',
        hasError: true,
      });
      console.error(
        `Failed to copy - '${decodedUrls}' to the clipboard!\n${err}`
      );
      return;
    });

    // copied succeed
    toast({
      description: 'The decoded URLs copied to your clipboard',
    });
    if (decodedUrlsElementRef.current) {
      selectText(decodedUrlsElementRef.current);
    }
  }

  return (
    <>
      {/* TODO: only for debugging, should be removed later */}
      {copyValue}
      <br />
      {trimValue}
      <div className="flex flex-col justify-center items-center my-5 w-full">
        <TextArea
          textareaPlaceholder="Enter one or more URLs to decode"
          handleOnChange={handleOnChangeURLsToDecode}
          value={urlsToDecode}
        />
        <TextArea
          textareaPlaceholder="Decoded URLs"
          value={decodedUrls}
          readonly={true}
          doubleClick={selectLineTextArea}
          ref={decodedUrlsElementRef}
        />
      </div>
      <div className="flex justify-center items-center">
        <Button clicked={handleClickedCopiedDecodedUrls}>
          Copy all decoded URLs
        </Button>
        <Button clicked={clearStorageUrls}>Clear URLs</Button>
      </div>
    </>
  );
};

export default App;
