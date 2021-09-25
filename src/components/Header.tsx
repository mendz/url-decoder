import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { DecodeContext, IDecode } from '../contexts/DecodeContext';
import { IModal } from '../hooks/useModal';
import Button from './Button';
import { HiCog, HiRefresh } from 'react-icons/hi';
import Settings from '../containers/Settings';

const Header = (): JSX.Element => {
  const { showModal } = useContext<IModal>(ModalContext);
  const { toggle, isDecode } = useContext<IDecode>(DecodeContext);

  const headerText: string = isDecode ? 'URL Decoder' : 'URL Encoder';

  return (
    <div className="flex w-full items-center">
      <div className="mr-auto">
        <Button
          classes="mr-4"
          autoWidth
          clicked={() => showModal(<Settings />)}
        >
          <HiCog size="1.5rem" />
        </Button>
        <Button autoWidth clicked={toggle}>
          <HiRefresh size="1.5rem" />
        </Button>
      </div>
      <h1 className="mr-auto text-2xl mb-2 font-extrabold">{headerText}</h1>
    </div>
  );
};

export default Header;
