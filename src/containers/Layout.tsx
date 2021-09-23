import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import { ModalProvider } from '../contexts/ModalContext';
import { SettingsProvider } from '../contexts/SettingsContext';

type Props = { children: JSX.Element | JSX.Element[] };

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <ModalProvider>
      <SettingsProvider>
        <div className="flex flex-col flex-1 items-center p-3 pb-5 w-[610px]">
          <Header />
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </SettingsProvider>
    </ModalProvider>
  );
};

export default Layout;
