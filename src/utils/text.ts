import {
  HTMLElementReactMouseEvent,
  SelectionModify,
} from '../global-types/types';

/**
 * Select all the text inside the provided element.
 * @param element The element with the text which needed to be selected.
 */
const selectText = (element: HTMLElement): void => {
  const range: Range = document.createRange();
  range.selectNode(element);
  // if (element.target) {
  //   range.selectNode(element.target);
  // } else {
  //   range.selectNode(element);
  // }

  const selection: Selection | null = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

const selectLineTextArea = (
  event: HTMLElementReactMouseEvent<HTMLTextAreaElement>
): void => {
  const textAreaValue = event.target?.value;
  const selection = window.getSelection() as SelectionModify;

  if (!selection) {
    return;
  }

  // TODO: check if this function (`modify`) changed in the future because currently is "Non-standard" - https://developer.mozilla.org/en-US/docs/Web/API/Selection/modify
  // I am using the "modify" method because I ran into a problem when the user select word that also appears
  // in another line it will cause the selection to be on the wrong line.
  // Therefore with "modify", I could check what is the whole line, and not only one word.
  if (selection.modify) {
    // the text before the selected word
    selection.modify('extend', 'backward', 'paragraphboundary');
    const selectTextBackward = selection.toString();

    // the rest of the text in line
    selection.modify('extend', 'forward', 'paragraphboundary');
    const selectTextForward = selection.toString();

    const selectedText: string = selectTextBackward + selectTextForward;
    const textAreaLines: string[] = textAreaValue.split('\n');
    const selectedLine: string =
      textAreaLines.find((line) => line.includes(selectedText)) ?? '';

    let startPosition = 0;
    let endPosition: number = textAreaValue.length;

    for (const line of textAreaLines) {
      if (line === selectedLine) {
        break;
      }
      startPosition += line.length + 1;
    }

    endPosition = selectedLine.length + startPosition;

    selection.removeAllRanges();

    const textArea = event.target;
    textArea.focus();
    textArea.selectionStart = startPosition;
    textArea.selectionEnd = endPosition;
  }
};

export { selectText, selectLineTextArea };
