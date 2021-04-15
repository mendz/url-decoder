import { createContext } from 'react';
import useModal, { IModal } from '../hooks/useModal';
import Modal from '../components/Modal';

type Props = { children: JSX.Element[] | JSX.Element };

const defaultValue: IModal = {
  component: null,
  isModalShow: false,
  hideModal: () => console.log('hide modal'),
  showModal: () => console.log('show modal'),
};

const ModalContext = createContext<IModal>(defaultValue);
const { Provider } = ModalContext;

const ModalProvider = ({ children }: Props): JSX.Element => {
  const { component, hideModal, isModalShow, showModal } = useModal();
  return (
    <Provider value={{ component, hideModal, isModalShow, showModal }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
