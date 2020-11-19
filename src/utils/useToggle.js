import { useState } from 'react';

export default function useToggle(initialValue) {
  const [toggleValue, setToggleValue] = useState(initialValue);

  const toggle = () => {
    setToggleValue(!toggleValue);
  };
  return [toggleValue, toggle];
}
