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
  // {
  //   id: 2,
  //   브랜드명: 'BBBB',
  //   상품명: '상품명2',
  //   가격: 20000,
  //   옵션: '옵션2',
  //   이미지: 'https://picsum.photos/500',
  //   수량: 1,
  //   할인율: 0,
  //   // 쿠폰할인: 10,
  // },
  // {
  //   id: 3,
  //   브랜드명: 'AAAA',
  //   상품명: '상품명3',
  //   가격: 30000,
  //   옵션: '옵션3',
  //   이미지: 'https://picsum.photos/300',
  //   수량: 1,
  //   할인율: 0,
  //   // 쿠폰할인: 0,
  // },
];

// 업데이트 된 카트 데이터 예시
// import image from '@/assets/images/detail_page/detail_main.png';
// import subImage from '@/assets/images/detail_page/detail_sub2.png';

// export interface CartItem {
//   cartId: string;
//   memberId: string;
//   items: {
//     productId: string;
//     brandId: string;
//     name: string;
//     quantity: number;
//     unitPrice: number;
//     subTotal: number;
//     image: string;
//   }[];
//   totalAmount: number;
//   discountAmount: number;
//   finalTotal: number;
//   appliedCoupons: {
//     couponId: string;
//     productId: string;
//     discountType: 'fixed_amount' | 'percentage' | 'shipping_free';
//     discountValue: number;
//     scope: 'item' | 'cart' | 'shipping';
//     title: string;
//   }[];
//   updatedAt: string;
// }

// export const CartItem: CartItem[] = [
//   {
//     cartId: 'C98765',
//     memberId: 'M12345',
//     items: [
//       {
//         productId: 'P12345',
//         name: '기능성 낚시 장갑',
//         quantity: 2,
//         unitPrice: 15000,
//         subTotal: 30000,
//         image: image,
//         brandId: 'B12345',
//       },
//       {
//         productId: 'P54321',
//         name: '히트업 후드티',
//         quantity: 1,
//         unitPrice: 40000,
//         subTotal: 40000,
//         image: subImage,
//         brandId: 'B67890',
//       },
//     ],
//     totalAmount: 70000,
//     discountAmount: 5000,
//     finalTotal: 65000,
//     appliedCoupons: [
//       {
//         productId: 'P12345',
//         couponId: 'COUPON3000',
//         discountType: 'fixed_amount',
//         discountValue: 3000,
//         scope: 'cart',
//         title: '3,000원 할인 쿠폰',
//       },
//       // {
//       //   productId: 'P54321',
//       //   couponId: 'COUPON_SHIPFREE',
//       //   discountType: 'shipping_free',
//       //   discountValue: 2000,
//       //   scope: 'shipping',
//       //   title: '배송비 무료 쿠폰',
//       // },
//     ],
//     updatedAt: '2025-10-21T12:00:00+09:00',
//   },
// ];
