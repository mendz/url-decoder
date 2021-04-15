import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { IModal } from '../hooks/useModal';
import Button from './Button';
import { ReactComponent as CogIcon } from '../assets/cog.svg';
import Settings from '../containers/Settings';

const Header = (): JSX.Element => {
  const { showModal } = useContext<IModal>(ModalContext);
  return (
    <div className="flex w-full items-center">
      <div className="mr-auto">
        <Button autoWidth clicked={() => showModal(<Settings />)}>
          <CogIcon />
        </Button>
      </div>
      <h1 className="mr-auto text-2xl mb-2 font-extrabold">URL Decoder</h1>
    </div>
  );
};

export default Header;
