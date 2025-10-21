import image from '@/assets/images/detail_page/detail_main.png';
import subImage from '@/assets/images/detail_page/detail_sub2.png';

export interface CartItem {
  cartId: string;
  memberId: string;
  items: {
    productId: string;
    brandId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
    image: string;
  }[];
  totalAmount: number;
  discountAmount: number;
  finalTotal: number;
  appliedCoupons: {
    couponId: string;
    productId: string;
    discountType: 'fixed_amount' | 'percentage' | 'shipping_free';
    discountValue: number;
    scope: 'item' | 'cart' | 'shipping';
    title: string;
  }[];
  updatedAt: string;
}

export const cardData: CartItem[] = [
  {
    cartId: 'C98765',
    memberId: 'M12345',
    items: [
      {
        productId: 'P12345',
        name: '기능성 낚시 장갑',
        quantity: 2,
        unitPrice: 15000,
        subTotal: 30000,
        image: image,
        brandId: 'B12345',
      },
      {
        productId: 'P54321',
        name: '히트업 후드티',
        quantity: 1,
        unitPrice: 40000,
        subTotal: 40000,
        image: subImage,
        brandId: 'B67890',
      },
    ],
    totalAmount: 70000,
    discountAmount: 5000,
    finalTotal: 65000,
    appliedCoupons: [
      {
        productId: 'P12345',
        couponId: 'COUPON3000',
        discountType: 'fixed_amount',
        discountValue: 3000,
        scope: 'cart',
        title: '3,000원 할인 쿠폰',
      },
      // {
      //   productId: 'P54321',
      //   couponId: 'COUPON_SHIPFREE',
      //   discountType: 'shipping_free',
      //   discountValue: 2000,
      //   scope: 'shipping',
      //   title: '배송비 무료 쿠폰',
      // },
    ],
    updatedAt: '2025-10-21T12:00:00+09:00',
  },
];
