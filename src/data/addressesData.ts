export interface Address {
  id: number;
  주소: string;
  상세주소: string;
  수령인: string;
  연락처: string;
  배송지명: string;
  기본배송지: boolean;
}

export const addressesData = [
  {
    id: 1,
    주소: '서울특별시 강남구 테헤란로 123',
    상세주소: '101동 202호',
    수령인: '홍길동',
    연락처: '010-1234-5678',
    배송지명: '회사',
    기본배송지: true,
  },
  {
    id: 2,
    주소: '서울특별시 서초구 반포대로 456',
    상세주소: '303동 404호',
    수령인: '김철수',
    연락처: '010-9876-5432',
    배송지명: '집',
    기본배송지: false,
  },
];
