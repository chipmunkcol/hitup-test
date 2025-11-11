import { useState } from 'react';

const useActiveBtn = () => {
  const [isActive, setIsActive] = useState(false);

  const activeBtn = () => {
    setIsActive(true);
  };

  const enableBtn = () => {
    setIsActive(false);
  };

  return {
    isActive,
    activeBtn,
    enableBtn,
  };
};

export default useActiveBtn;
