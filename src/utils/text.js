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
  const selectedText = window.getSelection().toString();
  const textAreaLines = event.target.value.split('\n');
  const selectedLine = textAreaLines.find(line => line.includes(selectText));
  console.log('selectedText', selectedText);
  console.log('textAreaLines', textAreaLines);
  console.log('selectedLine', selectedLine);
};

export { selectText, selectLineTextArea };