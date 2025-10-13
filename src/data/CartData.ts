export interface CartItem {
  id: number;
  브랜드명: string;
  상품명: string;
  가격: number;
  옵션: string;
  이미지: string;
  수량: number;
  할인율: number;
  쿠폰할인?: number | string;
}

export const cardData: CartItem[] = [
  {
    id: 1,
    브랜드명: 'AAAA',
    상품명: '상품명1',
    가격: 10000,
    옵션: '옵션1',
    이미지: 'https://picsum.photos/200',
    수량: 2,
    할인율: 10,
    // 쿠폰할인: '1000',
  },
  {
    id: 2,
    브랜드명: 'BBBB',
    상품명: '상품명2',
    가격: 20000,
    옵션: '옵션2',
    이미지: 'https://picsum.photos/500',
    수량: 1,
    할인율: 0,
    // 쿠폰할인: 10,
  },
  {
    id: 3,
    브랜드명: 'AAAA',
    상품명: '상품명3',
    가격: 30000,
    옵션: '옵션3',
    이미지: 'https://picsum.photos/300',
    수량: 1,
    할인율: 0,
    // 쿠폰할인: 0,
  },
];
