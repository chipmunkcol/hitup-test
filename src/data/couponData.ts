export interface Coupon {
  id: number;
  코드: string;
  할인율: number;
  설명: string;
  특이사항: string;
  유효기간: string;
  적용상품: string[];
  사용여부: boolean;
}

export const couponData: Coupon[] = [
  {
    id: 1,
    코드: 'WELCOME10',
    할인율: 10,
    설명: '신규 가입 쿠폰',
    특이사항: '1만원 이상 15% 할인 최대 10만원 할인',
    유효기간: '2025.12.31',
    적용상품: ['productId1', 'productId2'],
    사용여부: false,
  },
  {
    id: 2,
    코드: 'DIAMOND20',
    할인율: 20,
    설명: 'DIAMOND 등급 쿠폰',
    유효기간: '2025.11.30',
    특이사항: '1만원 이상 20% 할인 최대 20만원 할인',
    적용상품: ['productId3', 'productId4'],
    사용여부: false,
  },
  {
    id: 3,
    코드: 'FREESHIP',
    할인율: 0,
    설명: '무료 배송 쿠폰',
    유효기간: '2025.10.31',
    특이사항: '전 상품 무료 배송',
    적용상품: ['productId5', 'productId6'],
    사용여부: false,
  },
];
