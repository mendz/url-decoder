import React from 'react';
import styled from 'styled-components';
import { useToggle, selectLineTextArea } from '../../utils';
import Button from '../Button/Button';
import TextArea from '../TextArea/TextArea';
import PropTypes from 'prop-types';

const Container = styled.div`
  margin-bottom: 15px;
  position: relative;
  max-width: 610px;
  min-width: 610px;

  Button {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 1em;
    width: auto;
    min-width: 150px;
    opacity: 60%;
    &:hover {
      opacity: 100%;
    }
  }
`;

const HyperLinkContainer = styled.div`
  height: 144px;
  min-width: 610px;
  max-height: 610px;
  background-color: #bfc9ff;
  font-size: 1.2rem;
  border: 1px solid rgb(118, 118, 118);
  overflow-y: auto;
  padding: 0.5rem;
  font-size: 1.2em;
  word-wrap: break-word;

  p:first-child {
    margin-top: 0;
  }
  p {
    margin: 0.5rem 0;
  }
`;

const DecodedUrlsContainer = React.forwardRef(
  ({ decodedUrls }, decodedUrlsElementRef) => {
    const [swapPlainHyperLinks, toggleSwapPlainHyperLinks] = useToggle(false);

    const urlsWitFormat = (
      <HyperLinkContainer>
        {decodedUrls?.map((url, index) => (
          <p key={index} ref={decodedUrlsElementRef}>
            <a href={url}>{url}</a>
          </p>
        ))}
      </HyperLinkContainer>
    );

    const textarea = (
      <TextArea
        style={{ marginBottom: 0 }}
        textareaPlaceholder="Decoded URLs"
        handleOnChange={() => {}}
        value={decodedUrls}
        readonly={true}
        doubleClick={selectLineTextArea}
        ref={decodedUrlsElementRef}
      />
    );

    return (
      <Container>
        {swapPlainHyperLinks ? textarea : urlsWitFormat}
        <Button clicked={() => toggleSwapPlainHyperLinks()}>
          Swap Plain Text/Hyper Link
        </Button>
      </Container>
    );
  },
);

DecodedUrlsContainer.propTypes = {
  decodedUrls: PropTypes.arrayOf(PropTypes.string),
};

export default DecodedUrlsContainer;
