import { ModalProvider } from '../contexts/ModalContext';

type Props = { children: JSX.Element | JSX.Element[] };

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <ModalProvider>
      <div className="flex flex-col flex-1 items-center p-3 pb-5 w-[610px]">
        <h1 className="text-2xl mb-2 font-extrabold">URL Decoder</h1>
        {children}
      </div>
    </ModalProvider>
  );
};

export default Layout;
