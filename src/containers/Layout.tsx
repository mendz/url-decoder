import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import { DecodeProvider } from '../contexts/DecodeContext';
import { ModalProvider } from '../contexts/ModalContext';
import { SettingsProvider } from '../contexts/SettingsContext';

type Props = { children: JSX.Element | JSX.Element[] };

function Layout({ children }: Props): JSX.Element {
  return (
    <DecodeProvider>
      <SettingsProvider>
        <ModalProvider>
          <div className="flex flex-col flex-1 items-center p-3 pb-5 w-[610px]">
            <Header />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </div>
        </ModalProvider>
      </SettingsProvider>
    </DecodeProvider>
  );
}

export default Layout;
