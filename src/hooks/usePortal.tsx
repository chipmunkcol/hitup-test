import { useState } from 'react';

const usePortal = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const closePortal = () => {
    setIsPortalOpen(false);
  };

  const openPortal = () => {
    setIsPortalOpen(true);
  };

  return {
    isPortalOpen,
    openPortal,
    closePortal,
  };
};

export default usePortal;
