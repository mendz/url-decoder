import React, { useRef, useContext, useEffect } from 'react';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import { arrayHaveInvalidUrl, selectText, selectLineTextArea } from '../utils';
import { useToast } from '../hooks/useToast';
import {
  CopyCurrentURLValue,
  SettingsContext,
} from '../contexts/SettingsContext';
import { useUrls } from '../hooks/useUrls';
import { DecodeContext } from '../contexts/DecodeContext';

function App(): JSX.Element {
  // this ref is needed for the text selection in the decoded URLs textarea
  const decodedUrlsElementRef: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(
    null
  );

  const { decodedUrls, updateUrls, urlsToDecode, clearStorageUrls } = useUrls();
  const { showToast } = useToast();
  const { copyValue, trimValue } = useContext(SettingsContext);
  const { isDecode } = useContext(DecodeContext);

  useEffect(() => {
    updateUrls(urlsToDecode, trimValue);
    // todo: meed to check this disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trimValue]);

  function toast({ caption = '', description = '', hasError = false }) {
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
  }

  function handleOnChangeURLsToDecode(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const onChangeUrlsToDecode: string[] = event.target.value.split('\n');
    updateUrls(onChangeUrlsToDecode, trimValue);
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

    try {
      await navigator.clipboard.writeText(decodedUrls.join('\n'));

      toast({
        description: 'The decoded URLs copied to your clipboard',
      });
      if (decodedUrlsElementRef.current) {
        selectText(decodedUrlsElementRef.current);
      }
    } catch (error) {
      toast({
        description: 'Failed to copy the decoded URLs',
        hasError: true,
      });
      console.error(
        `Failed to copy - '${decodedUrls}' to the clipboard!\n${error}`
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
      if (!urlsToDecode.includes(currentTabUrl)) {
        const currentUrlsToDecode = [...urlsToDecode, currentTabUrl].filter(
          (url: string) => url.trim().length > 0
        );
        updateUrls(currentUrlsToDecode, trimValue);
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

  const isCopyValue: boolean = copyValue === CopyCurrentURLValue.COPY;
  const copyAllButtonText: string = isDecode
    ? 'Copy all decoded URLs'
    : 'Copy all encoded URLs';
  const showCopyButton: boolean = isCopyValue && isDecode;

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
      <div
        className={`flex ${
          showCopyButton ? 'justify-between' : 'justify-center w-full gap-3'
        } items-center`}
      >
        <Button clicked={handleClickedCopiedDecodedUrls}>
          {copyAllButtonText}
        </Button>
        {showCopyButton && (
          <Button clicked={handleCLickedDecodeCurrent}>
            Decode current tab URL
          </Button>
        )}
        <Button clicked={clearStorageUrls}>Clear URLs</Button>
      </div>
    </>
  );
}

export default App;
