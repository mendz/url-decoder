/* globals chrome */

import React, { Component } from 'react';
import './App.css';
import TextArea from '../components/TextArea';
import StatusMessage from '../components/StatusMessage';
import Button from '../components/Button';
import { urlsToDecodeKey, decodedUrlsKey } from '../utils/chromeStorageKeys';
import { decodeURLs, arrayHaveInvalidUrl, selectText, selectLineTextArea, loadFromStorage, saveToStorage, clearStorage } from '../utils';

/*
  TODO: change to css modules
  TODO: check it there a need to change to react hooks
  TODO: add testing
*/

class App extends Component {
  decodedUrlsElementRef = React.createRef();

  state = {
    urlsToDecode: [],
    decodedUrls: [],
    status: {
      message: '',
      error: false
    }
  }

  async componentDidMount() {
    if (chrome.storage) {
      const urlToDecodePromise = loadFromStorage(urlsToDecodeKey);
      const decodedUrlsPromise = loadFromStorage(decodedUrlsKey);
      const [urlsToDecode, decodedUrls] = await Promise.all([urlToDecodePromise, decodedUrlsPromise]);

      this.setState({
        urlsToDecode: urlsToDecode || [],
        decodedUrls: decodedUrls || []
      });
    }
  }

  componentDidUpdate() {
    if (chrome.storage) {
      saveToStorage(urlsToDecodeKey, this.state.urlsToDecode);
      saveToStorage(decodedUrlsKey, this.state.decodedUrls);
    }
  }

  clearStorageUrls = () => {
    if (chrome.storage) {
      clearStorage();
    }

    this.setState({
      urlsToDecode: [],
      decodedUrls: []
    });
  }

  setMessageStatus = ({ message = '', error = false, decodedUrls = null }) => {
    let status = { message, error };

    if (decodedUrls && arrayHaveInvalidUrl(decodedUrls)) {
      status = {
        message: 'ERROR: One or more URLs are invalid! Please check that you use the whole URL.',
        error: true
      }
    }

    this.setState({ status });
  }

  handleOnChangeURLsToDecode = event => {
    const urlsToDecode = event.target.value.split('\n');
    const decodedUrls = decodeURLs(urlsToDecode);

    this.setState({
      urlsToDecode,
      decodedUrls
    });

    this.setMessageStatus({ decodedUrls });
  }

  handleClickedCopiedDecodedUrls = async () => {
    if (this.state.decodedUrls.length > 0) {
      await navigator.clipboard.writeText(this.state.decodedUrls.join('\n'))
        .catch(err => {
          this.setMessageStatus({ message: 'Failed to copy the decoded URLs', error: true });
          console.error(`Failed to copy - '${this.state.decodedUrls}' to the clipboard!\n${err}`);
          return;
        });

      // copied succeed
      this.setMessageStatus({ message: 'The decoded URL copied to your clipboard' });
      selectText(this.decodedUrlsElementRef.current);

    } else {
      this.setMessageStatus({ message: 'Failed to copy to decoded URLs, you have to decode at least one URL', error: true });
    }
  }

  handleCLickedDecodeCurrent = () => {

    // To prevent the app crashing when working on localhost
    if (!chrome.tabs) {
      this.setMessageStatus({ message: 'There is an issue with the extension connection with the browser. Please try again later.', error: true })
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      // extract first value - tabs[0]
      const [currentTab] = tabs;

      // check that the URL is not already exists in this.state.urlsToDecode
      if (!this.state.urlsToDecode.includes(currentTab.url)) {
        const urlsToDecode = [...this.state.urlsToDecode, currentTab.url].filter(url => url.trim().length > 0);
        const decodedUrls = decodeURLs(urlsToDecode);

        this.setState({
          urlsToDecode,
          decodedUrls
        });

        this.setMessageStatus({ message: 'Decoded current tab URL', decodedUrls });
      } else {
        this.setMessageStatus({ message: 'The current tab URL is already in text area with the URLs to decode', error: true });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>URL Decoder</h1>
        <Button clicked={this.clearStorageUrls} innerText='Clear' />
        <div className="container">

          <TextArea textareaPlaceholder='Enter one or more URLs to decode'
            buttonText='Decode'
            handleOnChange={this.handleOnChangeURLsToDecode}
            buttonClick={this.handleClickedURLsToDecode}
            value={this.state.urlsToDecode} />
          <TextArea textareaPlaceholder='Decoded URLs'
            handleOnChange={() => { }}
            value={this.state.decodedUrls}
            readonly={true}
            doubleClick={selectLineTextArea}
            ref={this.decodedUrlsElementRef} />

        </div>

        <div className="buttons-container">
          <Button clicked={this.handleClickedCopiedDecodedUrls} innerText='Copy all decoded URLs' />
          <Button clicked={this.handleCLickedDecodeCurrent} innerText='Decode current tab URL' />
        </div>

        <StatusMessage message={this.state.status.message} error={this.state.status.error} />
      </div>
    );
  }
}

export default App;
