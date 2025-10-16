import { create } from 'zustand';

interface ModalStore {
  isTrackingVisible: boolean;
  setIsTrackingVisible: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isTrackingVisible: false,
  setIsTrackingVisible: (isOpen) => set({ isTrackingVisible: isOpen }),
}));
