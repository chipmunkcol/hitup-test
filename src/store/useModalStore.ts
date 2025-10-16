import { create } from 'zustand';

interface ModalStore {
  isTrackingVisible: boolean;
  setIsTrackingVisible: (isOpen: boolean) => void;

  isCategoryVisible: boolean;
  setIsCategoryVisible: (isOpen: boolean) => void;
  toggleCategoryVisible: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isTrackingVisible: false,
  setIsTrackingVisible: (isOpen) => set({ isTrackingVisible: isOpen }),

  isCategoryVisible: false,
  setIsCategoryVisible: (isOpen) => set({ isCategoryVisible: isOpen }),
  toggleCategoryVisible: () =>
    set((state) => ({ isCategoryVisible: !state.isCategoryVisible })),
}));
