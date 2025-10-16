import subImage from '@/assets/images/detail_page/detail_sub2.png';
import subImage2 from '@/assets/images/detail_page/detail_sub4.png';

export const purchaseData = [
  {
    orderId: 'ORD20251015001',
    purchaseDate: '2025.10.14',
    product: {
      productId: 'PRD10001',
      imageUrl: subImage,
      brand: {
        brandId: 'BRD500',
        name: '브랜드AA',
        brandPageUrl: '/brands/BRD500',
      },
      name: '상품명AA',
      option: {
        name: '색상: 블랙, 사이즈: M',
        quantity: 2,
      },
      price: 45000,
    },
    status: '배송 중',
    trackingUrl: '/tracking/ORD20251015001',
  },
  {
    orderId: 'ORD20251014002',
    purchaseDate: '2025.10.13',
    product: {
      productId: 'PRD10002',
      imageUrl: subImage2,
      brand: {
        brandId: 'BRD501',
        name: '브랜드AB',
        brandPageUrl: '/brands/BRD501',
      },
      name: '상품명AB',
      option: {
        name: '색상: 화이트, 사이즈: L',
        quantity: 1,
      },
      price: 55000,
    },
    status: '배송 완료',
    trackingUrl: '/tracking/ORD20251014002',
  },
  {
    orderId: 'ORD20251013003',
    purchaseDate: '2025.10.12',
    product: {
      productId: 'PRD10003',
      imageUrl: subImage,
      brand: {
        brandId: 'BRD502',
        name: '브랜드AC',
        brandPageUrl: '/brands/BRD502',
      },
      name: '상품명AC',
      option: {
        name: '색상: 블랙, 사이즈: L',
        quantity: 1,
      },
      price: 60000,
    },
    status: '배송 완료',
    trackingUrl: '/tracking/ORD20251013003',
  },
];

export const purchaseDetail = {
  주문번호: '190250913122514',
  주문일자: '2025.09.13',
  상품목록: [
    {
      상품id: 101,
      상품이미지: subImage,
      상품명: '상품명 예시',
      옵션: '옵션A',
      가격: 22000,
      배송상태: '배송 준비 중',
    },
    {
      상품id: 102,
      상품이미지: subImage2,
      상품명: '상품명 예시2',
      옵션: '옵션B',
      가격: 17000,
      배송상태: '배송 완료',
    },
  ],
  배송정보: {
    수령인: '김산호',
    휴대폰: '010-0000-0000',
    주소: '서울특별시 중구 청계천로40, 822호 두줄두줄두줄두줄 한국 관광 공사 두줄두줄두줄두줄',
  },
  결제정보: {
    결제수단: '신용카드(신한카드/일시불)',
    총결제금액: 39000,
    결제상세: {
      상품금액: 44000,
      배송비: 0,
      쿠폰할인: -5000,
    },
  },
  환불정보: {
    환불상품금액: 17000,
    차감금액: -5000,
    총환불예정금액: 12000,
  },
};
