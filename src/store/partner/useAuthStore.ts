// {
//     "brandNameKo": "temp",
//     "brandNameEn": "temp",
//     "partnersMemberToken": {
//         "accessTokenExpiredDate": 1762335640586,
//         "refreshTokenExpiredDate": 1777332040586,
//         "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwiZXhwIjoxNzYyMzM1NjQwLCJtZW1iZXJUeXBlIjoiQ09NTUVSQ0UtUEFSVE5FUlMiLCJ1c2VyQWdlbnRIYXNoIjoiOGQzYTQzMTA3ODJlZDExNjU0NzA4NDgxYTk3MTI4OWIyYjQxMzIwYzc4ZmUyY2ExMGMwYmU1ZDljM2FmOWI1YiJ9.wFNXBLxTKF-7Iyv2EqpSophJh3JPS2Wwen-fLVeqBbmLfeYUldllY12Cx_wvIyWTHT74rSrMKOTHYOHnnOA1ug",
//         "refreshToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwiZXhwIjoxNzc3MzMyMDQwLCJtZW1iZXJUeXBlIjoiQ09NTUVSQ0UtUEFSVE5FUlMiLCJ1c2VyQWdlbnRIYXNoIjoiOGQzYTQzMTA3ODJlZDExNjU0NzA4NDgxYTk3MTI4OWIyYjQxMzIwYzc4ZmUyY2ExMGMwYmU1ZDljM2FmOWI1YiJ9.PTDlVRhGosHy3ECtKBAWBGxH5qtEwLapyiomaPAht6tUHigbf1OwmD9ML-fZ0XEm_CwdjLwA3xjnHnS59ELEUg"
//     }
// }

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface PartnerAuth {
  brandNameKo: string;
  brandNameEn: string;
  partnersMemberToken: {
    accessTokenExpiredDate: number;
    refreshTokenExpiredDate: number;
    accessToken: string;
    refreshToken: string;
  };
}

type AuthStoreState = {
  partnerAuth: PartnerAuth | null;
  setPartnerAuth: (authData: Partial<PartnerAuth>) => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      partnerAuth: null,
      setPartnerAuth: (authData) =>
        set({
          partnerAuth: {
            ...get().partnerAuth,
            ...authData, // ✅ 변경된 부분만 반영
          } as PartnerAuth,
        }),
    }),
    {
      name: 'partner-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
