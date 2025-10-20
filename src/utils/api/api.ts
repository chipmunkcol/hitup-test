import axios from 'axios';
import type { CartItem } from '../../data/CartData';
import type { Address } from '../../data/addressesData';
import type { Product, ProductContact } from '../../data/productDetailData';
import type { Coupon } from '@/data/couponData';
import type { Review } from '@/data/reviewableProductData';

// axios 기본 설정
export const apiRequest = axios.create({
  baseURL: '', // API 서버의 기본 URL
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
export const getCart = () => apiRequest.get('/cart').then((res) => res.data);

// 상품 추가
export const addToCart = (newItem: CartItem) => {
  return apiRequest.post('/cart', newItem);
};
// 상품 수정
export const updateCartItem = (cartItemId: number, quantity: number) =>
  apiRequest.put(`/cart/${cartItemId}`, { quantity });

// 상품 삭제
export const removeCartItem = (cartItemId: number) =>
  apiRequest.delete(`/cart/${cartItemId}`);

// 배송지 관련
export const getAddresses = (): Promise<Address[]> =>
  apiRequest.get('/addresses').then((res) => res.data);

export const addToAddress = (newAddress: Partial<Address>) => {
  return apiRequest.post('/addresses', newAddress);
};

// update addresss
export const updateAddress = (
  addressId: number,
  updatedAddress: Partial<Address>
) => {
  return apiRequest.put(`/addresses/${addressId}`, updatedAddress);
};

// 판매자 문의하기
export const contactSeller = (
  productId: number,
  newContact: Partial<ProductContact>
) => {
  return apiRequest.post(`/product/${productId}/contact`, newContact);
};

export const deleteContact = (productId: number, contactId: number) => {
  return apiRequest.delete(`/product/${productId}/contact/edit/${contactId}`);
};

// 쿠폰 (GET, POST)
export const getCoupons = (): Promise<Coupon[]> =>
  apiRequest.get('/coupon/my').then((res) => res.data);

export const addToCoupon = (code: string) => {
  return apiRequest.post('/coupon/my', { code });
};

// 리뷰 (GET)
export const getReviews = async (): Promise<Review[]> => {
  return apiRequest.get('/review').then((res) => res.data);
};

export const getReview = async (id: string | undefined): Promise<Review> => {
  return apiRequest.get(`/review/${id}`).then((res) => res.data);
};

export const deleteReview = (id: string | undefined) => {
  return apiRequest.delete(`/review/${id}`);
};

// apiRequest.interceptors.request.use(
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
