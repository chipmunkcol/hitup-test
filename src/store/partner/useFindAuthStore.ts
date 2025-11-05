import { create } from 'zustand';

interface FindAuthState {
  id: string;
  setId: (newId: string) => void;
}

export const useFindAuthStore = create<FindAuthState>((set) => ({
  id: '',
  setId: (newId: string) => set({ id: newId }),
}));
