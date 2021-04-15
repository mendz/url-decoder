import { useState } from 'react';

export interface IModal {
  isModalShow: boolean;
  showModal: (modelComponent: JSX.Element) => void;
  hideModal: () => void;
  component: JSX.Element | null;
}

function useModal(): IModal {
  const [isModalShow, setIsModalShow] = useState(false);
  const [component, setComponent] = useState<JSX.Element | null>(<p>test!</p>);

  const showModal = (modelComponent: JSX.Element): void => {
    setIsModalShow(true);
    setComponent(modelComponent);
  };

  const hideModal = (): void => {
    setIsModalShow(false);
    setComponent(null);
  };

  return {
    isModalShow,
    showModal,
    hideModal,
    component,
  };
}

export default useModal;
