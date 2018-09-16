import React, { Component } from 'react';
import './App.css';
import TextArea from './components/TextArea';
import StatusMessage from './components/StatusMessage';
import Button from './components/Button';

class App extends Component {
  state = {
    urlsToDecode: [],
    decodedUrls: [],
    status: {
      message: '',
      error: false
    }
  }

  setStatus = (message = '', error = false) => {
    this.setState({
      status: { message, error }
    });
  }

  handleOnChangeURLsToDecode = event => {
    const urlsToDecode = event.target.value.split('\n');
    const decodedUrls = urlsToDecode.map(url => decodeURI(url));
    this.setState({
      urlsToDecode,
      decodedUrls
    });
    this.setStatus();
  }

  handleClickedDecodedUrls = () => {
    if (this.state.decodedUrls.length > 0) {
      navigator.clipboard.writeText(this.state.decodedUrls.join('\n'))
        .then(() => {
          this.setStatus('The decoded URL copied to your clipboard');
        })
        .catch(err => {
          this.setStatus('Failed to copy to decoded URLs', true);
          console.error(`Failed to copy - '${this.state.decodedUrls}' to the clipboard!\n${err}`)
        });
    } else {
      this.setStatus('Failed to copy to decoded URLs, you have to decode at least one URL', true);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>URL Decoder</h1>
        <div className="container">
          <TextArea textareaPlaceholder='Enter one or more URLs to decode'
            buttonText='Decode'
            handleOnChange={this.handleOnChangeURLsToDecode}
            buttonClick={this.handleClickedURLsToDecode}
            value={this.state.urlsToDecode.join('\n')}
            width={600} />
          <TextArea textareaPlaceholder='Copy the decoded URLs'
            handleOnChange={() => { }}
            value={this.state.decodedUrls.join('\n')}
            readonly={true}
            width={430} />
        </div>
        <div className="buttons-container">
          <button onClick={this.handleClickedDecodedUrls}>Copy all decoded URLs</button>
          <button>Decode current tab URL</button>
        </div>
        <StatusMessage message={this.state.status.message} error={this.state.status.error} />
      </div>
    );
  }
}

export default App;
