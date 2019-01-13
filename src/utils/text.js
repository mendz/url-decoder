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
  const selectedText = window.getSelection().toString();
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