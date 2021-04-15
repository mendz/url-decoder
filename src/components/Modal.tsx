import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../contexts/ModalContext';
import { IModal } from '../hooks/useModal';

const Modal = (): React.ReactPortal | null => {
  const { component, hideModal, isModalShow } = useContext<IModal>(
    ModalContext
  );
  if (isModalShow) {
    return createPortal(
      <div
        className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black bg-opacity-25"
        onClick={hideModal}
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
