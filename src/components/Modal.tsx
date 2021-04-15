import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../contexts/ModalContext';
import { IModal } from '../hooks/useModal';

const Modal = (): React.ReactPortal | null => {
  const { component, hideModal, isModalShow } = useContext<IModal>(
    ModalContext
  );
  const hide = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      hideModal();
    }
  };
  if (isModalShow) {
    return createPortal(
      <div
        className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
        onClick={hide}
      >
        {component}
      </div>,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.querySelector('#modal-root')!
    );
  }
  return null;
};

export default Modal;
