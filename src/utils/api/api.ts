import axios from 'axios';
import type { CartItem } from '../../data/CartItem';
import type { Address } from '../../data/addressesData';
import type { Product, ProductContact } from '../../data/productDetailData';
import type { Coupon } from '@/data/couponData';
import type { Review } from '@/data/reviewableProductData';
import type { RegisterForm } from '@/pages/auth/RegisterPage';
import {
  encryptAes256,
  encryptedAccessKey,
  encryptedData,
  timestamp,
} from '../auth/crypto';

// axios 기본 설정
export const fakeApi = axios.create({
  baseURL: '', // API 서버의 기본 URL
});

export const apiRequest = axios.create({
  baseURL: 'http://dev-hitup.link:27000',
});

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
export const checkDuplicateNickname = async (nickName: string) => {
  return await apiRequest.post(`api/v1/member/check/nickname`, {
    nickName,
  });
};

export const registerUser = async (data: RegisterForm) => {
  const encryptedPhoneNumber = encryptAes256(
    Date.now().toString(),
    import.meta.env.VITE_ACCESS_KEY,
    data.phoneNumber
  );

  return await apiRequest.post(`api/v1/member/signup`, data, {
    headers: {
      'Content-Type': 'application/json',
      'request-time': Date.now().toString(),
      'access-key': encryptedPhoneNumber,
    },
  });
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
