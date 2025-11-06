import axios from 'axios';
import { getEncryptedValuePartner } from '../auth/cryptoPartners';
import { getEncryptedHeader } from './api';

export const apiRequestPartners = axios.create({
  baseURL: 'http://dev-hitup.link:29000',
});

const getRequiredDataForEncryptedPartner = () => {
  const timestamp = Date.now().toString();
  const encryptedAccessKey = getEncryptedValuePartner(
    import.meta.env.VITE_ACCESS_KEY_PARTNERS,
    timestamp
  );

  return { timestamp, encryptedAccessKey };
};
//  "accessToken": "string",
//   "refreshToken": "string",
//   "accessTokenExpiredDate": number,
//   "refreshTokenExpiredDate": number
// }
export interface PartnerTokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredDate: number;
  refreshTokenExpiredDate: number;
}

export const 파트너스토큰갱신 = async (refreshToken: string) => {
  const { timestamp: ts, encryptedAccessKey } =
    getRequiredDataForEncryptedPartner();

  try {
    const response = await apiRequestPartners.post(
      '/api/v1/token/refresh',
      null,
      {
        headers: {
          ...getEncryptedHeader(ts, encryptedAccessKey),
          'Refresh-Token': `Bearer ${refreshToken}`,
        },
      }
    );
    if (response.data.code === '200') {
      return JSON.parse(response.data.data) as PartnerTokenRefreshResponse;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log('파트너스 토큰갱신 오류:', error);
    throw error;
  }
};

interface PartnerResetPasswordPayload {
  loginId: 'string';
  companyOwnerPhoneNumber: 'string';
  authenticationCode: 'string';
  loginPassword: 'string';
  loginPassword2: 'string';
}

export const 파트너스비밀번호변경 = async (
  payload: PartnerResetPasswordPayload
) => {
  const {
    loginId,
    companyOwnerPhoneNumber,
    authenticationCode,
    loginPassword,
    loginPassword2,
  } = payload;

  const { timestamp: ts, encryptedAccessKey } =
    getRequiredDataForEncryptedPartner();

  try {
    const response = await apiRequestPartners.post(
      '/api/v1/partners/member/change/password',
      {
        loginId: getEncryptedValuePartner(loginId, ts),
        companyOwnerPhoneNumber: getEncryptedValuePartner(
          companyOwnerPhoneNumber,
          ts
        ),
        loginPassword: getEncryptedValuePartner(loginPassword, ts),
        loginPassword2: getEncryptedValuePartner(loginPassword2, ts),
        authenticationCode: authenticationCode,
      },
      { headers: getEncryptedHeader(ts, encryptedAccessKey) }
    );
    if (response.data.code === '200') {
      return true;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log('파트너스 비밀번호재설정 오류:', error);
    throw error;
  }
};

// 휴대폰 로그인 시 인증코드 받기, 생성
export type phoneAuthenticateType = 'FIND_ID' | 'FIND_PASSWORD';
interface CreateAuthCodePartnerPayload {
  phoneNumber: string;
  phoneAuthenticateType: phoneAuthenticateType;
}

export const createAuthCodePartner = async (
  payload: CreateAuthCodePartnerPayload
) => {
  // const encryptedPhoneNumber = encryptedController(phoneNumber);
  const { phoneNumber, phoneAuthenticateType } = payload;
  const { timestamp: ts, encryptedAccessKey } =
    getRequiredDataForEncryptedPartner();

  try {
    const res = await apiRequestPartners.post(
      '/api/v1/authentication/client/register',
      {
        phoneNumber: getEncryptedValuePartner(phoneNumber, ts),
        // phoneNumber: phoneNumber,
        phoneAuthenticateType: phoneAuthenticateType,
      },
      { headers: getEncryptedHeader(ts, encryptedAccessKey) }
    );

    if (res.data?.code === '200') {
      return res.data.message === 'ok' ? true : false;
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log('인증코드 생성 오류:', error);
    throw error;
  }
};

type PartnerFindPasswordPayload = Omit<
  PartnerFindAccountPayload,
  'companyOwnerName'
> & {
  loginId: string;
};

export const 파트너스비밀번호찾기 = async (
  payload: PartnerFindPasswordPayload
) => {
  const { loginId, companyOwnerPhoneNumber, authenticationCode } = payload;

  const { timestamp: ts, encryptedAccessKey } =
    getRequiredDataForEncryptedPartner();
  try {
    const response = await apiRequestPartners.post(
      '/api/v1/partners/member/find/password',
      {
        loginId: getEncryptedValuePartner(loginId, ts),
        companyOwnerPhoneNumber: getEncryptedValuePartner(
          companyOwnerPhoneNumber,
          ts
        ),
        authenticationCode: authenticationCode,
      },
      {
        headers: getEncryptedHeader(ts, encryptedAccessKey),
      }
    );
    if (response.data.code === '200') {
      return true;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log('파트너스 비밀번호찾기 오류:', error);
    throw error;
  }
};

type PartnerFindAccountPayload = {
  companyOwnerName: string;
  companyOwnerPhoneNumber: string;
  authenticationCode: string;
};

type PartnerFindAccountResponse = {
  loginId: string;
};

export const 파트너스계정찾기 = async (
  payload: PartnerFindAccountPayload
): Promise<PartnerFindAccountResponse> => {
  const { companyOwnerName, companyOwnerPhoneNumber, authenticationCode } =
    payload;

  const { timestamp: ts, encryptedAccessKey } =
    getRequiredDataForEncryptedPartner();

  try {
    const response = await apiRequestPartners.post(
      '/api/v1/partners/member/find/id',
      {
        companyOwnerName: getEncryptedValuePartner(companyOwnerName, ts),
        companyOwnerPhoneNumber: getEncryptedValuePartner(
          companyOwnerPhoneNumber,
          ts
        ),
        authenticationCode: authenticationCode,
      },
      {
        headers: getEncryptedHeader(ts, encryptedAccessKey),
      }
    );

    if (response.data.code === '200') {
      return JSON.parse(response.data.data);
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log('파트너스 계정찾기 오류:', error);
    throw error;
  }
};

type Temp = {
  id: string;
  pw: string;
};
// 임시 id: jack957 pw: 1234
export const 파트너스로그인 = async (payload: Temp) => {
  const { id, pw } = payload;

  const { timestamp: ts, encryptedAccessKey } =
    getRequiredDataForEncryptedPartner();

  try {
    const response = await apiRequestPartners.post(
      '/api/v1/partners/member/login',
      {
        loginId: getEncryptedValuePartner(id, ts),
        loginPassword: getEncryptedValuePartner(pw, ts),
      },
      {
        headers: getEncryptedHeader(ts, encryptedAccessKey),
      }
    );
    if (response.data.code === '200') {
      // console.log('ts: ', ts);
      return JSON.parse(response.data.data);
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log('파트너스 로그인 오류:', error);
    throw error;
  }
};

// 입점 제휴 신청 Temp 타입 변경할것!
// 입점 제휴 신청 Temp 타입 변경할것!
// 입점 제휴 신청 Temp 타입 변경할것!
// 입점 제휴 신청 Temp 타입 변경할것!
type CompanyTypes = 'CORPORATION' | 'SOLE_PROPRIETOR';

export interface 파트너스등록Payload {
  loginId: 'string';
  loginPassword: 'string';
  brandNameKo: 'string';
  brandNameEn: 'string';
  brandHomePage: 'string';
  companyType: CompanyTypes;
  companyNumber: 'string';
  companyName: 'string';
  companyOwnerName: 'string';
  companyOwnerPhoneNumber: 'string';
  companyContactName: 'string';
  companyContactPhoneNumber: 'string';
  companyContactEmail: 'string';
  applyDetail: 'string';
}

export const 파트너스등록 = async (payload: 파트너스등록Payload) => {
  const {
    loginId,
    loginPassword,
    brandNameKo,
    applyDetail,
    brandHomePage,
    brandNameEn,
    companyContactEmail,
    companyContactName,
    companyContactPhoneNumber,
    companyName,
    companyNumber,
    companyOwnerName,
    companyOwnerPhoneNumber,
    companyType,
  } = payload;

  const { timestamp: ts, encryptedAccessKey } =
    getRequiredDataForEncryptedPartner();

  try {
    const resposne = await apiRequestPartners.post(
      '/api/v1/partners/member/apply',
      {
        loginId: getEncryptedValuePartner(loginId, ts),
        loginPassword: getEncryptedValuePartner(loginPassword, ts),
        brandNameKo,
        brandNameEn,
        brandHomePage,
        companyType: 'SOLE_PROPRIETOR', // 'CORPORATION' | 'SOLE_PROPRIETOR'
        companyNumber: getEncryptedValuePartner(companyNumber, ts),
        // companyNumber: companyNumber,
        companyName: getEncryptedValuePartner(companyName, ts),
        companyOwnerName: getEncryptedValuePartner(companyOwnerName, ts),
        companyOwnerPhoneNumber: getEncryptedValuePartner(
          companyOwnerPhoneNumber,
          ts
        ),
        companyContactName: getEncryptedValuePartner(companyContactName, ts),
        companyContactPhoneNumber: getEncryptedValuePartner(
          companyContactPhoneNumber,
          ts
        ),
        companyContactEmail: getEncryptedValuePartner(companyContactEmail, ts),
        applyDetail,
      },
      {
        headers: getEncryptedHeader(ts, encryptedAccessKey),
      }
    );

    if (resposne.data.code === '200') {
      console.log('ts: ', ts);
      // return JSON.parse(resposne.data.data);
      return true;
    } else {
      throw new Error(resposne.data.message);
    }
  } catch (error) {
    console.log('파트너스 등록 오류:', error);
    throw error;
  }
};

// 임시 테스트용
// export const 파트너스등록 = async (payload: 파트너스등록Payload) => {
//   const {
//     loginId,
//     loginPassword,
//     brandNameKo,
//     applyDetail,
//     brandHomePage,
//     brandNameEn,
//     companyContactEmail,
//     companyContactName,
//     companyContactPhoneNumber,
//     companyName,
//     companyNumber,
//     companyOwnerName,
//     companyOwnerPhoneNumber,
//     companyType,
//   } = payload;

//   const { timestamp: ts, encryptedAccessKey } =
//     getRequiredDataForEncryptedPartner();

//   try {
//     const resposne = await apiRequestPartners.post(
//       '/api/v1/partners/member/apply',

//       {
//         loginId: getEncryptedValuePartner(loginId, ts),
//         loginPassword: getEncryptedValuePartner(loginPassword, ts),
//         brandNameKo: 'temp',
//         brandNameEn: 'temp',
//         brandHomePage: 'temp',
//         companyType: 'CORPORATION',
//         companyNumber: '12345678',
//         companyName: getEncryptedValuePartner('산호', ts),
//         companyOwnerName: getEncryptedValuePartner('산호산호', ts),
//         companyOwnerPhoneNumber: getEncryptedValuePartner('01012345679', ts),
//         companyContactName: getEncryptedValuePartner('홍길동', ts),
//         companyContactPhoneNumber: getEncryptedValuePartner('01098765439', ts),
//         companyContactEmail: getEncryptedValuePartner(
//           'honggildong2@example.com',
//           ts
//         ),
//         applyDetail: 'temp2',
//       },
//       {
//         headers: getEncryptedHeader(ts, encryptedAccessKey),
//       }
//     );

//     if (resposne.data.code === '200') {
//       console.log('ts: ', ts);
//       return JSON.parse(resposne.data.data);
//     } else {
//       throw new Error(resposne.data.message);
//     }
//   } catch (error) {
//     console.log('파트너스 등록 오류:', error);
//     throw error;
//   }
// };
