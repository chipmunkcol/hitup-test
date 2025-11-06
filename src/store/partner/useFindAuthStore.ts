import { create } from 'zustand';

interface FindAuthState {
  loginId: string;
  setLoginId: (newId: string) => void;

  companyOwnerPhoneNumber: string;
  setCompanyOwnerPhoneNumber: (newPhoneNumber: string) => void;

  authenticationCode: string;
  setAuthenticationCode: (newCode: string) => void;
}

export const useFindAuthStore = create<FindAuthState>((set) => ({
  loginId: '',
  setLoginId: (newId: string) => set({ loginId: newId }),

  companyOwnerPhoneNumber: '',
  setCompanyOwnerPhoneNumber: (newPhoneNumber: string) =>
    set({ companyOwnerPhoneNumber: newPhoneNumber }),

  authenticationCode: '',
  setAuthenticationCode: (newCode: string) =>
    set({ authenticationCode: newCode }),
}));
