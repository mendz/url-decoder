/* globals chrome */

import React, { useState, useEffect, useRef } from "react";
import classes from "./App.module.css";
import TextArea from "../components/TextArea/TextArea";
import StatusMessage from "../components/StatusMessage/StatusMessage";
import Button from "../components/Button/Button";
import DecodedUrlsContainer from "../components/DecodedUrlsContainer/DecodedUrlsContainer";
import { urlsToDecodeKey, decodedUrlsKey } from "../utils/chromeStorageKeys";
import {
  decodeURLs,
  arrayHaveInvalidUrl,
  selectText,
  loadFromStorage,
  saveToStorage,
  clearStorage,
} from "../utils";
import "normalize.css";

const App = () => {
  // this ref is needed for the text selection in the decoded URLs textarea
  const decodedUrlsElementRef = useRef(null);

  const [urlsToDecode, setUrlsToDecode] = useState([]);
  const [decodedUrls, setDecodedUrls] = useState([]);
  const [status, setStatus] = useState({
    message: "",
    error: false,
  });

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

  const setMessageStatus = ({
    message = "",
    error = false,
    decodedUrls = null,
  }) => {
    let status = { message, error };

    if (decodedUrls && arrayHaveInvalidUrl(decodedUrls)) {
      status = {
        message:
          "ERROR: One or more URLs are invalid! Please check that you use the whole URL.",
        error: true,
      };
    }

    setStatus(status);
  };

  const handleOnChangeURLsToDecode = (event) => {
    const onChangeUrlsToDecode = event.target.value.split("\n");
    const onChangeDecodedUrls = decodeURLs(onChangeUrlsToDecode);

    setUrlsToDecode(onChangeUrlsToDecode);
    setDecodedUrls(onChangeDecodedUrls);

    setMessageStatus({ onChangeDecodedUrls });
  };

  const handleClickedCopiedDecodedUrls = async () => {
    if (decodedUrls.length > 0) {
      await navigator.clipboard
        .writeText(decodedUrls.join("\n"))
        .catch((err) => {
          setMessageStatus({
            message: "Failed to copy the decoded URLs",
            error: true,
          });
          console.error(
            `Failed to copy - '${decodedUrls}' to the clipboard!\n${err}`
          );
          return;
        });

      // copied succeed
      setMessageStatus({ message: "The decoded URL copied to your clipboard" });
      selectText(decodedUrlsElementRef.current);
    } else {
      setMessageStatus({
        message:
          "Failed to copy to decoded URLs, you have to decode at least one URL",
        error: true,
      });
    }
  };

  const handleCLickedDecodeCurrent = () => {
    // To prevent the app crashing when working on localhost
    if (chrome && !chrome.tabs) {
      setMessageStatus({
        message:
          "There is an issue with the extension connection with the browser. Please try again later.",
        error: true,
      });
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // extract first value - tabs[0]
      const [currentTab] = tabs;

      // check that the URL is not already exists in state urlsToDecode
      if (!urlsToDecode.includes(currentTab.url)) {
        const currentUrlsToDecode = [...urlsToDecode, currentTab.url].filter(
          (url) => url.trim().length > 0
        );
        const currentDecodedUrls = decodeURLs(currentUrlsToDecode);

        setUrlsToDecode(currentUrlsToDecode);
        setDecodedUrls(currentDecodedUrls);

        setMessageStatus({ message: "Decoded current tab URL", decodedUrls });
      } else {
        setMessageStatus({
          message:
            "The current tab URL is already in text area with the URLs to decode",
          error: true,
        });
      }
    });
  };

  const textareas = (
    <div className={classes.Container}>
      <TextArea
        textareaPlaceholder="Enter one or more URLs to decode"
        buttonText="Decode"
        handleOnChange={handleOnChangeURLsToDecode}
        value={urlsToDecode}
      />
      <DecodedUrlsContainer
        decodedUrls={decodedUrls}
        ref={decodedUrlsElementRef}
      />
    </div>
  );

  const buttons = (
    <div className={classes.ButtonsContainer}>
      <Button clicked={handleClickedCopiedDecodedUrls}>
        Copy all decoded URLs as plain text
      </Button>
      <Button clicked={handleCLickedDecodeCurrent}>
        Decode current tab URL
      </Button>
    </div>
  );

  const { message, error } = status;
  const statusMessage = message ? (
    <StatusMessage message={message} error={error} />
  ) : null;

  return (
    <div className={classes.App}>
      <h1>URL Decoder</h1>
      <Button clicked={clearStorageUrls}>Clear</Button>
      {textareas}
      {buttons}
      {statusMessage}
    </div>
  );
};

export default App;
