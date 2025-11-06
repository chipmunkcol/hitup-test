import { create } from 'zustand';

interface FindAuthState {
  loginId: string;
  setLoginId: (newId: string) => void;

  companyOwnerName: string;
  setCompanyOwnerName: (newName: string) => void;

  companyOwnerPhoneNumber: string;
  setCompanyOwnerPhoneNumber: (newPhoneNumber: string) => void;

  authenticationCode: string;
  setAuthenticationCode: (newCode: string) => void;
}

export const useFindAuthStore = create<FindAuthState>((set) => ({
  loginId: '',
  setLoginId: (newId: string) => set({ loginId: newId }),

  companyOwnerName: '',
  setCompanyOwnerName: (newName: string) => set({ companyOwnerName: newName }),

  companyOwnerPhoneNumber: '',
  setCompanyOwnerPhoneNumber: (newPhoneNumber: string) =>
    set({ companyOwnerPhoneNumber: newPhoneNumber }),

  authenticationCode: '',
  setAuthenticationCode: (newCode: string) =>
    set({ authenticationCode: newCode }),
}));
