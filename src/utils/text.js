/**
 * Select all the text inside the provided element.
 * @param {HTMLElement} element The element with the text which needed to be selected.
 */
const selectText = element => {
  const range = document.createRange();

  if (element.target) {
    range.selectNode(element.target);
  } else {
    range.selectNode(element);
  }

  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
};

const selectLineTextArea = event => {
  const textAreaValue = event.target.value;
  // TODO: check if this function (`modify`) changed in the future because currently is "Non-standard" - https://developer.mozilla.org/en-US/docs/Web/API/Selection/modify
  // I am using the "modify" method because I ran into a problem when the user select word that also appears in another line it will cause the selection to be on the wrong line. Therefore with "modify", I could check what is the whole line, and not only one word.

  // the text before the selected word
  window.getSelection().modify('extend','backward', 'lineboundary');
  const selectTextBackward= window.getSelection().toString();

  // the rest of the text in line
  window.getSelection().modify('extend','forward', 'lineboundary');
  const selectTextForward = window.getSelection().toString();

  const selectedText = selectTextBackward + selectTextForward;
  const textAreaLines = textAreaValue.split('\n');
  const selectedLine = textAreaLines.find(line => line.includes(selectedText));

  let startPosition = 0;
  let endPosition = textAreaValue.length;

  for (const line of textAreaLines) {
    if (line === selectedLine) {
      break;
    }
    startPosition += line.length + 1;
  }

  endPosition = selectedLine.length + startPosition;

  window.getSelection().removeAllRanges();

  const textArea = event.target;
  textArea.focus();
  textArea.selectionStart = startPosition;
  textArea.selectionEnd = endPosition;
};

export { selectText, selectLineTextArea };