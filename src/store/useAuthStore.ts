import { parseJwt } from '@/utils/auth/function';
import { create } from 'zustand';

// const jwt_key = 'test';
export interface User {
  id: string;
}

interface AuthState {
  lastRequestTimestamp: string;
  setLastRequestTimestamp: (timestamp: string) => void;

  isCheckDuplicatedNickname: boolean;
  isDuplicatedNickname: boolean;
  setIsCheckDuplicatedNickname: (status: boolean) => void;
  setIsDuplicatedNickname: (status: boolean) => void;

  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // 암호화 복호화 관련
  lastRequestTimestamp: '',
  setLastRequestTimestamp: (timestamp: string) =>
    set({ lastRequestTimestamp: timestamp }),

  // 닉네임 중복 확인
  isCheckDuplicatedNickname: false,
  isDuplicatedNickname: false,
  setIsCheckDuplicatedNickname: (status: boolean) =>
    set({ isCheckDuplicatedNickname: status }),
  setIsDuplicatedNickname: (status: boolean) =>
    set({ isDuplicatedNickname: status }),
  // accesstoken 에서 디코딩한 사용자 정보
  user: null,
  setUser: (user: User | null) => set({ user: user }),
  fetchUser: async () => {
    try {
      const token = localStorage.getItem('access_token');
      // const token =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXIxMjMiLCJpYXQiOjE3NjA0MDg2MDh9.21K6TDJbE03tc4BA0TzAsXnbyLzUILQC_kCuAH6klVU';

      if (!token) {
        set({ user: null });
        return;
      }

      const user = parseJwt(token);
      set({ user: user });
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      localStorage.removeItem('access_token');
      set({ user: null });
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    set({ user: null });
  },
}));
