import axios from 'axios';
import type { CartItem } from '@/data/cardData';
import type { Address } from '../../data/addressesData';
import type { Product, ProductContact } from '../../data/productDetailData';
import type { Coupon } from '@/data/couponData';
import type { Review } from '@/data/reviewableProductData';
import type { RegisterForm } from '@/pages/auth/RegisterPage';
import {
  encryptAes256,
  encryptedAccessKey,
  encryptedController,
  encryptedData,
  timestamp,
} from '../auth/crypto';
import dayjs from 'dayjs';
import { useAuthStore } from '@/store/useAuthStore';
import { encryptedPartnerController } from '../auth/cryptoPartners';

// axios 기본 설정
export const fakeApi = axios.create({
  baseURL: '', // API 서버의 기본 URL
});

export const apiRequest = axios.create({
  baseURL: 'http://dev-hitup.link:27000',
});

export const apiRequestPartners = axios.create({
  baseURL: 'http://dev-hitup.link:29000',
});

export const apiRequestEncrypted = axios.create({
  baseURL: 'http://dev-hitup.link:27000',
});

apiRequestEncrypted.interceptors.request.use(
  (config) => {
    const timestamp = useAuthStore.getState().lastRequestTimestamp;
    const encryptedAccessKey = encryptAes256(
      timestamp,
      import.meta.env.VITE_ACCESS_KEY,
      import.meta.env.VITE_ACCESS_KEY
    );

    config.headers['Content-Type'] = 'application/json';
    config.headers['request-time'] = timestamp;
    config.headers['access-key'] = encryptedAccessKey;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getProduct = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`/product/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('상품 정보를 불러오지 못했습니다.', error);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

// 장바구니 조회
export const getCart = () => fakeApi.get('/cart').then((res) => res.data);

// 상품 추가
export const addToCart = (newItem: CartItem) => {
  return fakeApi.post('/cart', newItem);
};
// 상품 수정
export const updateCartItem = (CartItemId: number, quantity: number) =>
  fakeApi.put(`/cart/${CartItemId}`, { quantity });

// 상품 삭제
export const removeCartItem = (CartItemId: number) =>
  fakeApi.delete(`/cart/${CartItemId}`);

// 배송지 관련
export const getAddresses = (): Promise<Address[]> =>
  fakeApi.get('/addresses').then((res) => res.data);

export const addToAddress = (newAddress: Partial<Address>) => {
  return fakeApi.post('/addresses', newAddress);
};

// update addresss
export const updateAddress = (
  addressId: number,
  updatedAddress: Partial<Address>
) => {
  return fakeApi.put(`/addresses/${addressId}`, updatedAddress);
};

// 판매자 문의하기
export const contactSeller = (
  productId: number,
  newContact: Partial<ProductContact>
) => {
  return fakeApi.post(`/product/${productId}/contact`, newContact);
};

export const deleteContact = (productId: number, contactId: number) => {
  return fakeApi.delete(`/product/${productId}/contact/edit/${contactId}`);
};

// 쿠폰 (GET, POST)
export const getCoupons = (): Promise<Coupon[]> =>
  fakeApi.get('/coupon/my').then((res) => res.data);

export const getAvailableCoupons = () => {
  return fakeApi.get('/coupon/available').then((res) => res.data);
};

export const addToAvailableCoupon = (code: string) => {
  return fakeApi.post('/coupon/available', { code });
};

export const addToCoupon = (code: string) => {
  return fakeApi.post('/coupon/my', { code });
};

// 리뷰 (GET)
export const getReviews = async (): Promise<Review[]> => {
  return fakeApi.get('/review').then((res) => res.data);
};

export const getReview = async (id: string | undefined): Promise<Review> => {
  return fakeApi.get(`/review/${id}`).then((res) => res.data);
};

export const deleteReview = (id: string | undefined) => {
  return fakeApi.delete(`/review/${id}`);
};

// Auth (인증)

interface LoginData {
  phoneNumber: string;
  authenticationCode: string;
}

export const checkDuplicateNickname = async (nickName: string) => {
  return await apiRequest
    .post(
      `api/v1/member/check/nickname`,
      {
        nickName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'request-time': timestamp,
          'access-key': encryptedAccessKey,
        },
      }
    )
    .then((res) => {
      if (res.data.data) {
        return JSON.parse(res.data.data);
      }
    });
};

interface RegisterUserResponse {
  memberId: string;
  nickName: string;
  birthDay: string;
  gender: string;
  age: number;
  memberToken: {
    accessTokenExpiredDate: number;
    refreshTokenExpiredDate: number;
    accessToken: string;
    refreshToken: string;
  };
}

export const registerUser = async (
  data: RegisterForm
): Promise<RegisterUserResponse> => {
  // const timestamp = Date.now().toString();
  const encrytedNickName = encryptAes256(
    timestamp,
    import.meta.env.VITE_ACCESS_KEY,
    data.nickName
  );
  const encryptedPhoneNumber = encryptAes256(
    timestamp,
    import.meta.env.VITE_ACCESS_KEY,
    data.phoneNumber
  );

  // const encryptedAccessKey = encryptAes256(
  //   timestamp,
  //   import.meta.env.VITE_ACCESS_KEY,
  //   import.meta.env.VITE_ACCESS_KEY
  // );

  const newForm: RegisterForm = {
    ...data,

    birthDay: dayjs(data.birthDay).format('YYYY-MM-DD'),
    nickName: encrytedNickName,
    phoneNumber: encryptedPhoneNumber,
  };

  return await apiRequest
    .post(`api/v1/member/signup`, newForm, {
      headers: {
        'Content-Type': 'application/json',
        'request-time': timestamp,
        'access-key': encryptedAccessKey,
      },
    })
    .then((res) => {
      if (res.data.code === '200') {
        return JSON.parse(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    });
};

// 휴대폰 로그인 시 인증코드 생성
export const createAuthCode = async (phoneNumber: string) => {
  const encryptedPhoneNumber = encryptedController(phoneNumber);

  return await apiRequestEncrypted
    .post('/api/v1/authentication/client/register', {
      phoneNumber: encryptedPhoneNumber,
    })
    .then((res) => {
      if (res.data?.code === '200') {
        return res.data.message === 'ok' ? true : false;
      } else {
        throw new Error(res.data.message);
      }
    });
};

export const loginUser = async (loginData: LoginData) => {
  const encryptedPhoneNumber = encryptedController(loginData.phoneNumber);

  const newData = {
    ...loginData,
    phoneNumber: encryptedPhoneNumber,
  };

  return await apiRequestEncrypted
    .post('/api/v1/member/login', newData)
    .then((res) => {
      if (res.data?.code === '200') {
        return JSON.parse(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    });

  // return await apiRequest.post('/api/v1/member/login', newData, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'request-time': timestamp,
  //     'access-key': encryptedAccessKey,
  //   },
  // });
};

// fakeApi.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

type PartnerFindAccountPayload = {
  name: string;
  phoneNumber: string;
  code: string;
};
export const 파트너스계정찾기 = async (payload: PartnerFindAccountPayload) => {
  const { name, phoneNumber, code } = payload;

  const ts = Date.now().toString();
  const encryptedAccessKey = encryptedPartnerController(
    import.meta.env.VITE_ACCESS_KEY_PARTNERS,
    ts
  );

  try {
    const response = await apiRequestPartners.post(
      '/api/v1/partners/member/find/id',
      {
        companyOwnerName: encryptedPartnerController(name, ts),
        companyOwnerPhoneNumber: encryptedPartnerController(phoneNumber, ts),
        authenticationCode: code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'request-time': ts,
          'access-key': encryptedAccessKey,
        },
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

  const ts = Date.now().toString();
  const encryptedAccessKey = encryptedPartnerController(
    import.meta.env.VITE_ACCESS_KEY_PARTNERS,
    ts
  );

  try {
    const response = await apiRequestPartners.post(
      '/api/v1/partners/member/login',
      {
        loginId: encryptedPartnerController(id, ts),
        loginPassword: encryptedPartnerController(pw, ts),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'request-time': ts,
          'access-key': encryptedAccessKey,
        },
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

export const 파트너스등록 = async (payload: Temp) => {
  const { id, pw } = payload;

  const ts = Date.now().toString();
  const accesskey = import.meta.env.VITE_ACCESS_KEY_PARTNERS;

  const encryptedAccessKey = encryptedPartnerController(
    // import.meta.env.VITE_ACCESS_KEY_PARTNERS,
    accesskey,
    ts
  );

  try {
    const resposne = await apiRequestPartners.post(
      '/api/v1/partners/member/apply',
      {
        loginId: encryptedPartnerController(id, ts),
        loginPassword: encryptedPartnerController(pw, ts),
        brandNameKo: 'temp2',
        brandNameEn: 'temp2',
        brandHomePage: 'temp2',
        companyType: 'CORPORATION',
        companyNumber: '12345678',
        companyName: encryptedPartnerController('산호2', ts),
        companyOwnerName: encryptedPartnerController('산호산호2', ts),
        companyOwnerPhoneNumber: encryptedPartnerController('01012345679', ts),
        companyContactName: encryptedPartnerController('홍길동2', ts),
        companyContactPhoneNumber: encryptedPartnerController(
          '01098765439',
          ts
        ),
        companyContactEmail: encryptedPartnerController(
          'honggildong2@example.com',
          ts
        ),
        applyDetail: 'temp2',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'request-time': ts,
          'access-key': encryptedAccessKey,
        },
      }
    );

    if (resposne.data.code === '200') {
      console.log('ts: ', ts);
      return JSON.parse(resposne.data.data);
    } else {
      throw new Error(resposne.data.message);
    }
  } catch (error) {
    console.log('파트너스 등록 오류:', error);
    throw error;
  }
  // .then((res) => {
  //   console.log('res: ', res);
  //   if (res.data.code === '200') {
  //     return JSON.parse(res.data.data);
  //     ts
  //   } else {
  //     throw new Error(res.data.message);
  //   }
  // })
  // .catch((error) => {
  //   console.log('파트너스 등록 오류:', error);
  //   throw error;
  // });
};

export const testingAPI = async () => {
  const res = await fetch(
    'http://dev-hitup.link:27000/api/v1/authentication/client/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // "X-Timestamp": timestamp,   // 백엔드가 복호화에 사용할 timestamp
        'request-time': timestamp,
        'access-key': encryptedAccessKey,
      },
      body: JSON.stringify({
        phoneNumber: encryptedData, // Base64로 인코딩된 암호화된 전화번호
      }),
    }
  );

  console.log('res: ', res);
  const result = await res.json();
  console.log(result);
};
