import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
} from '../utils';

const App = () => {
  // this ref is needed for the text selection in the decoded URLs textarea
  const decodedUrlsElementRef = useRef(null);

  const [urlsToDecode, setUrlsToDecode] = useState([]);
  const [decodedUrls, setDecodedUrls] = useState([]);

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

  const showToast = ({ message = '', error = false, decodedUrls = null }) => {
    let status = { message, error };
    const toastPreferences = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      className: 'text-base',
    };

    if (decodedUrls && arrayHaveInvalidUrl(decodedUrls)) {
      status = {
        message:
          'ERROR: One or more URLs are invalid! Please check that you use the whole URL.',
        error: true,
      };
    }

    if (!status.message?.length) {
      return;
    }

    if (status.error) {
      toast.error(status.message, toastPreferences);
    } else {
      toast.success(status.message, toastPreferences);
    }
  };

  const handleOnChangeURLsToDecode = (event) => {
    const onChangeUrlsToDecode = event.target.value.split('\n');
    const onChangeDecodedUrls = decodeURLs(onChangeUrlsToDecode);

    setUrlsToDecode(onChangeUrlsToDecode);
    setDecodedUrls(onChangeDecodedUrls);

    showToast({ decodedUrls: onChangeDecodedUrls });
  };

  const handleClickedCopiedDecodedUrls = async () => {
    if (decodedUrls.length > 0) {
      await navigator.clipboard
        .writeText(decodedUrls.join('\n'))
        .catch((err) => {
          showToast({
            message: 'Failed to copy the decoded URLs',
            error: true,
          });
          console.error(
            `Failed to copy - '${decodedUrls}' to the clipboard!\n${err}`
          );
          return;
        });

      // copied succeed
      showToast({ message: 'The decoded URL copied to your clipboard' });
      selectText(decodedUrlsElementRef.current);
    } else {
      showToast({
        message:
          'Failed to copy to decoded URLs, you have to decode at least one URL',
        error: true,
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
      <Button clicked={clearStorageUrls}>Clear</Button>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 items-center p-3 pb-5 w-610px">
      <h1 className="text-2xl mb-2 font-extrabold">URL Decoder</h1>
      {textareas}
      {buttons}
      <ToastContainer />
    </div>
  );
};

export default App;
