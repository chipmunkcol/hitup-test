import axios, { AxiosError } from 'axios';

export const getProduct = async (id: number) => {
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

// axios 기본 설정
export const apiRequest = axios.create({
  baseURL: '', // API 서버의 기본 URL
});

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

// 장바구니 조회
export const getCart = () => apiRequest.get('/cart').then((res) => res.data);

// 상품 추가
export const addToCart = (productId: number, quantity: number) =>
  apiRequest.post('/cart', { productId, quantity });

// 상품 수정
export const updateCartItem = (cartItemId: number, quantity: number) =>
  apiRequest.put(`/cart/${cartItemId}`, { quantity });

// 상품 삭제
export const removeFromCart = (cartItemId: number) =>
  apiRequest.delete(`/cart/${cartItemId}`);
