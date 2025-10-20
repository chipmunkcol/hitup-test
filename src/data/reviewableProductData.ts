import mainImage from '@/assets/images/detail_page/detail_main.png';
import subImage2 from '@/assets/images/detail_page/detail_sub2.png';

export interface ReviewableProduct {
  id: number; // 상품 ID
  브랜드명: string;
  상품명: string; // 상품명
  이미지: string; // 상품 이미지 URL
  옵션: string[]; // 사용자가 주문한 옵션
  배송완료일: string; // ISO 형식 (YYYY-MM-DD)
  // 작성가능여부: boolean; // 오늘 날짜 기준 작성 가능 여부
  작성여부: boolean;

  작성된리뷰?: {
    별점: number;
    내용: string;
    리뷰이미지: string[];
  };
}

export const reviewableData: ReviewableProduct[] = [
  {
    id: 4,
    브랜드명: 'CR',
    상품명: 'CR-다이닝릴',
    이미지: mainImage,
    옵션: ['옵션 1', '옵션 2', '옵션 3'],
    배송완료일: '2025-10-10',
    // 작성가능여부: true,
    작성여부: true,

    작성된리뷰: {
      별점: 5,
      내용: '아주 만족합니다!',
      리뷰이미지: [mainImage],
    },
  },
  {
    id: 56,
    브랜드명: 'SAMSUNG',
    상품명: '무선 블루투스 이어폰',
    이미지: subImage2,
    옵션: ['화이트', '블랙'],
    배송완료일: '2025-08-20',
    // 작성가능여부: true,
    작성여부: false,
  },
  {
    id: 102,
    브랜드명: '로지텍',
    상품명: '게이밍 마우스 패드 XL',
    이미지: subImage2,
    옵션: ['블랙 / 라지 사이즈'],
    배송완료일: '2025-05-15',
    // 작성가능여부: false,
    작성여부: false,
  },
];
