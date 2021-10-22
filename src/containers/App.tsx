import React, { useRef, useContext, useEffect } from 'react';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import { arrayHaveInvalidUrl, selectText, selectLineTextArea } from '../utils';
import { useToast } from '../hooks/useToast';
import {
  ShowCurrentURLButtonValue,
  SettingsContext,
} from '../contexts/SettingsContext';
import useUrls from '../hooks/useUrls';
import { DecodeContext } from '../contexts/DecodeContext';
import { usePrevious } from '../hooks/usePrevious';

function App(): JSX.Element {
  // this ref is needed for the text selection in the decoded URLs textarea
  const copyUrlsElementRef: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(
    null
  );

  const { isDecode } = useContext(DecodeContext);
  const {
    importUrls,
    urls: exportUrls,
    updateUrls,
    clearStorageUrls,
    swapUrls,
  } = useUrls(isDecode);
  const { showToast } = useToast();
  const { showCurrentUrlButton, trimValue } = useContext(SettingsContext);
  const prevIsDecode: boolean = usePrevious<boolean>(isDecode) ?? false;

  useEffect(() => {
    if (isDecode !== prevIsDecode) {
      swapUrls(trimValue);
    }
    // todo: meed to check this disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDecode]);

  useEffect(() => {
    updateUrls(importUrls, trimValue, isDecode);
    // todo: meed to check this disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trimValue]);

  function toast({ caption = '', description = '', hasError = false }) {
    if (arrayHaveInvalidUrl(exportUrls.originalExportUrls)) {
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
  }

  function handleOnChangeURLs(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const urlsToDecodeEncode: string[] = event.target.value.split('\n');
    updateUrls(urlsToDecodeEncode, trimValue, isDecode);
  }

  async function handleClickedCopyExportUrls(): Promise<void> {
    if (!exportUrls.originalExportUrls.length) {
      toast({
        caption: 'Failed to copy to decoded URLs',
        description: 'You have to decode at least one URL',
        hasError: true,
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(
        exportUrls.originalExportUrls.join('\n')
      );

      toast({
        description: 'The decoded URLs copied to your clipboard',
      });
      if (copyUrlsElementRef.current) {
        selectText(copyUrlsElementRef.current);
      }
    } catch (error) {
      toast({
        description: 'Failed to copy the decoded URLs',
        hasError: true,
      });
      console.error(
        `Failed to copy - '${exportUrls}' to the clipboard!\n${error}`
      );
    }
  }

  function handleCLickedDecodeCurrent() {
    // To prevent the app crashing when working on localhost
    if (!chrome?.tabs) {
      toast({
        description:
          'There is an issue with the extension connection with the browser. Please try again later.',
        hasError: true,
      });
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // extract first value - tabs[0]
      const [currentTab] = tabs;
      const currentTabUrl: string = currentTab.url ?? '';

      // check that the URL is not already exists in state urlsToDecode
      if (!importUrls.includes(currentTabUrl)) {
        const currentUrlsToDecode = [...importUrls, currentTabUrl].filter(
          (url: string) => url.trim().length > 0
        );
        updateUrls(currentUrlsToDecode, trimValue, isDecode);
        toast({
          description: 'Decoded current tab URL',
        });
      } else {
        toast({
          description:
            'The current tab URL is already in text area with the URLs to decode',
          hasError: true,
        });
      }
    });
  }

  const copyAllButtonText: string = isDecode
    ? 'Copy all decoded URLs'
    : 'Copy all encoded URLs';
  const isShowCurrentUrlButton: boolean =
    showCurrentUrlButton === ShowCurrentURLButtonValue.SHOW && isDecode;
  const firstPlaceHolder: string = isDecode
    ? 'Enter one or more URLs to decode'
    : 'Enter one or more URLs to encode';
  const secondPlaceHolder: string = isDecode ? 'Decoded URLs' : 'Encoded URLs';

  return (
    <>
      <div className="flex flex-col justify-center items-center my-5 w-full">
        <TextArea
          textareaPlaceholder={firstPlaceHolder}
          handleOnChange={handleOnChangeURLs}
          value={importUrls}
        />
        <TextArea
          textareaPlaceholder={secondPlaceHolder}
          value={exportUrls.displayExportUrls}
          readonly={true}
          doubleClick={selectLineTextArea}
          ref={copyUrlsElementRef}
        />
      </div>
      <div
        className={`flex w-full ${
          isShowCurrentUrlButton ? 'justify-between' : 'justify-center gap-3'
        } items-center`}
      >
        <Button
          clicked={handleClickedCopyExportUrls}
          autoWidth={isShowCurrentUrlButton}
          testId="button-decode"
        >
          {copyAllButtonText}
        </Button>
        {isShowCurrentUrlButton && (
          <Button clicked={handleCLickedDecodeCurrent} autoWidth>
            Decode current tab URL
          </Button>
        )}
        <Button clicked={clearStorageUrls} autoWidth={isShowCurrentUrlButton}>
          Clear URLs
        </Button>
      </div>
    </>
  );
}

export default App;
