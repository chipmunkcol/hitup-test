import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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

export interface UserAuth {
  // id: string;
  memberId: string;
  nickName: string;
  birthDay: string; // "1992-10-31"
  gender: string;
  age: number;
  memberToken: {
    accessTokenExpiredDate: number;
    refreshTokenExpiredDate: number;
    accessToken: string;
    refreshToken: string;
  };
}

interface DuplicatedState {
  isCheckDuplicatedNickname: boolean;
  isDuplicatedNickname: boolean;
  setIsCheckDuplicatedNickname: (status: boolean) => void;
  setIsDuplicatedNickname: (status: boolean) => void;
}

interface AuthState {
  userAuth: UserAuth | null;
  setUserAuth: (user: Partial<UserAuth>) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userAuth: null,
      setUserAuth: (user) =>
        set({
          userAuth: {
            ...get().userAuth,
            ...user, // ✅ 변경된 부분만 반영
          } as UserAuth,
        }),
      logout: () => set({ userAuth: null }),
    }),
    {
      name: 'user-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useDuplicatedStore = create<DuplicatedState>()((set) => ({
  isCheckDuplicatedNickname: false,
  isDuplicatedNickname: false,
  setIsCheckDuplicatedNickname: (status: boolean) =>
    set({ isCheckDuplicatedNickname: status }),
  setIsDuplicatedNickname: (status: boolean) =>
    set({ isDuplicatedNickname: status }),
}));
