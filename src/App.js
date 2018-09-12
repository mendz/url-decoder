import React, { Component } from 'react';
import './App.css';
import TextArea from './components/TextArea';
import StatusMessage from './components/StatusMessage';

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

  handleClickedURLsToDecode = () => {
    if (this.state.urlsToDecode.length > 0) {
      const decodedUrls = this.state.urlsToDecode.map(url => decodeURI(url));
      this.setState({ decodedUrls });
      this.setStatus();
    } else {
      this.setStatus('Failed to decode URLs, you have to insert at least one URL', true);
    }
  }

  handleOnChangeURLsToDecode = event => {
    const text = event.target.value;
    this.setState({
      urlsToDecode: text.split('\n'),
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
            buttonText='Copy all decoded URLs'
            handleOnChange={() => { }}
            buttonClick={this.handleClickedDecodedUrls}
            value={this.state.decodedUrls.join('\n')}
            readonly={true}
            width={430} />
        </div>
        <button>Decode current tab URL</button>
        <StatusMessage message={this.state.status.message} error={this.state.status.error} />
      </div>
    );
  }
}

export default App;
