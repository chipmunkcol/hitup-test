import { http, HttpResponse } from 'msw';
import { cardData, type CartItem } from './data/CartData';
import { addressesData, type Address } from './data/addressesData';
import { couponData } from './data/couponData';
import {
  productDetailData,
  type ProductContact,
} from './data/productDetailData';

let cart = [...cardData];
let addresses = [...addressesData];
let productDetail = { ...productDetailData };

const myCoupons = [...couponData];

// await delay(2000); // 2초 지연
export const mockApiHandlers = [
  http.get('/product/:id', ({ params }) => {
    console.log('params: ', params);
    // const { id } = params;

    const product = productDetail;
    if (!product) {
      return HttpResponse.json(
        {
          message: '상품을 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(product);
  }),

  http.get('/cart', async () => {
    if (!cart) {
      return HttpResponse.json(
        {
          message: '장바구니가 비어있습니다.',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(cart);
  }),

  http.post('/cart', async ({ request }) => {
    const newItem = (await request.json()) as Partial<CartItem>;
    console.log('newItem: ', newItem);
    if (!newItem) {
      return HttpResponse.json(
        { message: '장바구니에 추가할 상품 정보가 없습니다.' },
        { status: 400 }
      );
    }

    const existedItem = cart.find((item) => item.id === newItem.id);
    if (existedItem) {
      // 이미 장바구니에 있는 상품이면 수량만 증가
      cart = cart.map((item) =>
        item.id === newItem.id ? { ...item, 수량: item.수량 + 1 } : item
      );
    } else {
      cart = [...cart, newItem as CartItem];
    }

    return HttpResponse.json(newItem, { status: 201 });
  }),

  http.put('/cart/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<CartItem>;

    cart = cart.map((item) =>
      item.id === Number(id) ? { ...item, ...updates } : item
    );

    return HttpResponse.json(cart.find((item) => item.id === Number(id)));
  }),

  http.delete('/cart/:id', ({ params }) => {
    const { id } = params;
    cart = cart.filter((item) => item.id !== Number(id));
    return HttpResponse.json({
      message: '장바구니에서 상품이 삭제되었습니다.',
    });
  }),

  // 배송지 관련 (주소, 상세주소, 수령인, 연락처, 배송지명(선택))
  http.get('/addresses', () => {
    return HttpResponse.json(addresses);
    // return HttpResponse.json([]);
  }),

  http.post('/addresses', async ({ request }) => {
    const newAddress = await request.json();
    console.log('newAddress: ', newAddress);
    addresses = [...addresses, newAddress as Address];
    return HttpResponse.json(newAddress, { status: 201 });
  }),

  http.put('/addresses/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<Address>;
    addresses = addresses.map((addr) =>
      addr.id === Number(id) ? { ...addr, ...updates } : addr
    );
    return HttpResponse.json(addresses.find((addr) => addr.id === Number(id)));
  }),

  // 판매자에게 문의하기
  http.post('/product/:id/contact', async ({ params, request }) => {
    const { id } = params;
    console.log('id: ', id);
    const newContact = (await request.json()) as Partial<ProductContact>;
    const contact = {
      id: productDetail.상품문의.length + 1,
      ...newContact,
      작성자: '사용자',
      작성일: new Date().toISOString().split('T')[0],
      답변: { 완료: false, 내용: '', 완료일: '' },
    } as ProductContact;
    productDetail = {
      ...productDetail,
      상품문의: [...(productDetail.상품문의 || []), contact],
    };
    return HttpResponse.json(contact, { status: 201 });
  }),

  http.delete('/product/:id/contact/edit/:contactId', async ({ params }) => {
    const { id, contactId } = params;
    console.log('id, contactId: ', id, contactId);

    // 백엔드에서 token 검증 로직 필요
    productDetail = {
      ...productDetail,
      상품문의: productDetail.상품문의.filter(
        (contact) => contact.id !== Number(contactId)
      ),
    };
    return HttpResponse.json(
      { message: '문의가 삭제되었습니다.' },
      { status: 200 }
    );
  }),

  // 유저 데이터 (쿠폰, 나의 등급, 리뷰, 주문/배송) 최근 본 상품 (local?)

  // GET 쿠폰

  http.get('coupon/my', () => {
    return HttpResponse.json(myCoupons);
  }),

  // POST 쿠폰
  http.post('/coupon/my', ({ request }) => {
    const payload = request.json() as Promise<{ code: string }>;
    console.log('payload: ', payload);

    // code -> 쿠폰 데이터 변환하는 코드
    const newCoupon = {
      id: myCoupons.length + 1,
      코드: 'DIAMOND15',
      할인율: 15,
      설명: 'DIAMOND 등급 쿠폰',
      특이사항: '1만원 이상 15% 할인 최대 10만원 할인',
      유효기간: '2026.03.31',
      적용상품: ['productId1', 'productId2'],
      사용여부: false,
    };
    myCoupons.push(newCoupon);
    return HttpResponse.json(newCoupon, { status: 201 });
  }),
];
