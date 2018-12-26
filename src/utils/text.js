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

export { selectText };