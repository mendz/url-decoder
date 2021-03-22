import React, { useState, useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import { urlsToDecodeKey, decodedUrlsKey } from '../utils/chromeStorageKeys';
import {
  decodeURLs,
  arrayHaveInvalidUrl,
  selectText,
  selectLineTextArea,
  loadFromStorage,
  saveToStorage,
  clearStorage,
  useToast,
} from '../utils';

const App = () => {
  // this ref is needed for the text selection in the decoded URLs textarea
  const decodedUrlsElementRef = useRef(null);

  const [urlsToDecode, setUrlsToDecode] = useState([]);
  const [decodedUrls, setDecodedUrls] = useState([]);
  const { showToast } = useToast();

  // componentDidMount
  useEffect(() => {
    const asyncLoadFromStorage = async () => {
      if (chrome && chrome.storage) {
        const urlToDecodePromise = loadFromStorage(urlsToDecodeKey);
        const decodedUrlsPromise = loadFromStorage(decodedUrlsKey);
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
    if (chrome && chrome.storage) {
      saveToStorage(urlsToDecodeKey, urlsToDecode);
      saveToStorage(decodedUrlsKey, decodedUrls);
    }
  }, [urlsToDecode, decodedUrls]);

  const clearStorageUrls = () => {
    if (chrome && chrome.storage) {
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
      caption: caption,
      description: description,
      hasError: hasError,
    });
  };

  const handleOnChangeURLsToDecode = (event) => {
    const onChangeUrlsToDecode = event.target.value.split('\n');
    const onChangeDecodedUrls = decodeURLs(onChangeUrlsToDecode);

    setUrlsToDecode(onChangeUrlsToDecode);
    setDecodedUrls(onChangeDecodedUrls);
  };

  const handleClickedCopiedDecodedUrls = async () => {
    if (decodedUrls.length > 0) {
      await navigator.clipboard
        .writeText(decodedUrls.join('\n'))
        .catch((err) => {
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
      selectText(decodedUrlsElementRef.current);
    } else {
      toast({
        caption: 'Failed to copy to decoded URLs',
        description: 'You have to decode at least one URL',
        hasError: true,
      });
    }
  };

  const textareas = (
    <div className="flex flex-col justify-center items-center my-5 w-full">
      <TextArea
        textareaPlaceholder="Enter one or more URLs to decode"
        buttonText="Decode"
        handleOnChange={handleOnChangeURLsToDecode}
        value={urlsToDecode}
      />
      <TextArea
        textareaPlaceholder="Decoded URLs"
        handleOnChange={() => {}}
        value={decodedUrls}
        readonly={true}
        doubleClick={selectLineTextArea}
        ref={decodedUrlsElementRef}
      />
    </div>
  );

  const buttons = (
    <div className="flex justify-center items-center">
      <Button clicked={handleClickedCopiedDecodedUrls}>
        Copy all decoded URLs
      </Button>
      <Button clicked={clearStorageUrls}>Clear URLs</Button>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 items-center p-3 pb-5 w-610px">
      <h1 className="text-2xl mb-2 font-extrabold">URL Decoder</h1>
      {textareas}
      {buttons}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
