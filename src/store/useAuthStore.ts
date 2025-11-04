import { parseJwt } from '@/utils/auth/function';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// {
//     "memberId": "4a35d1d8-52b2-461e-bf4a-66c8028f2e6f",
//     "nickName": "HK5BeCgR73ZP5R3F2cx/Ag==",
//     "birthDay": "1992-10-31",
//     "gender": "MALE",
//     "age": 33,
//     "memberToken": {
//         "accessTokenExpiredDate": 1762151608677,
//         "refreshTokenExpiredDate": 1777148008677,
//         "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0YTM1ZDFkOC01MmIyLTQ2MWUtYmY0YS02NmM4MDI4ZjJlNmYiLCJleHAiOjE3NjIxNTE2MDgsIm1lbWJlclR5cGUiOiJDT01NRVJDRSIsInVzZXJBZ2VudEhhc2giOiI4ZDNhNDMxMDc4MmVkMTE2NTQ3MDg0ODFhOTcxMjg5YjJiNDEzMjBjNzhmZTJjYTEwYzBiZTVkOWMzYWY5YjViIn0.U7xG15OLl-0W1yRs9xqEBZv3EOAFykU2JRqYBG4tQoO_wNClVZR4hUiOHTJ5JKuXEAAllKfRRDM00QOZaIWX8Q",
//         "refreshToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0YTM1ZDFkOC01MmIyLTQ2MWUtYmY0YS02NmM4MDI4ZjJlNmYiLCJleHAiOjE3NzcxNDgwMDgsIm1lbWJlclR5cGUiOiJDT01NRVJDRSIsInVzZXJBZ2VudEhhc2giOiI4ZDNhNDMxMDc4MmVkMTE2NTQ3MDg0ODFhOTcxMjg5YjJiNDEzMjBjNzhmZTJjYTEwYzBiZTVkOWMzYWY5YjViIn0.1Tq-eXbGqnk8VjVnc77yXNBCBIJOkEdCHx9Ex3YOPsuvL20ti9cTIYIeZ5RlZAKgGjB9s5jrodKtfe63gw_rIA"
//     }
// }

// 일단 로컬에 access_token & refresh_token 저장 후 사용
// 설정된 expired 시간 이후에는 자동 로그아웃 처리 필요

export interface User {
  // id: string;
  memberId: string;
  nickName: string;
  birthDay: string; // "1992-10-31"
  gender: string;
  age: number;
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

// 로컬에 token 정보 저장
export interface Token {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredDate: string;
  refreshTokenExpiredDate: string;
}

interface TokenState {
  token: Token;
  setToken: (tokenData: Token) => void;
  getToken: () => Token;
  clearAccessToken: () => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenState>()(
  persist<TokenState>(
    (set, get) => ({
      token: {
        accessToken: '',
        refreshToken: '',
        accessTokenExpiredDate: '',
        refreshTokenExpiredDate: '',
      },
      setToken: (tokenData: Token) => set({ token: tokenData }),

      getToken: () => {
        return get().token;
      },

      clearAccessToken: () =>
        set({
          token: {
            ...get().token,
            accessToken: '',
            accessTokenExpiredDate: '',
          },
        }),

      clearToken: () =>
        set({
          token: {
            accessToken: '',
            refreshToken: '',
            accessTokenExpiredDate: '',
            refreshTokenExpiredDate: '',
          },
        }),
    }),
    {
      name: 'token', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
