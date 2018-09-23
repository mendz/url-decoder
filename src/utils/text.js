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