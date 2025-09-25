import { delay, http, HttpResponse } from 'msw';
import { productDetailData } from './data/productDetailData';
import { cardData, type CartItem } from './data/CartData';
import { addressesData, type Address } from './data/addressesData';

let cart = [...cardData];
let addresses = [...addressesData];

export const mockApiHandlers = [
  http.get('/product/:id', ({ params }) => {
    console.log('params: ', params);
    // const { id } = params;

    const product = productDetailData;
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

    await delay(2000); // 2초 지연

    return HttpResponse.json(cart);
  }),

  http.post('/cart', async ({ request }) => {
    const newItem = await request.json();
    console.log('newItem: ', newItem);
    if (!newItem) {
      return HttpResponse.json(
        { message: '장바구니에 추가할 상품 정보가 없습니다.' },
        { status: 400 }
      );
    }
    cart = [...cart, newItem as CartItem];
    return HttpResponse.json(newItem, { status: 201 });
  }),

  // 배송지 관련 (주소, 상세주소, 수령인, 연락처, 배송지명(선택))
  http.get('/addresses', () => {
    return HttpResponse.json(addresses);
  }),

  http.post('/addresses', async ({ request }) => {
    const newAddress = await request.json();
    console.log('newAddress: ', newAddress);
    addresses = [...addresses, newAddress as Address];
    return HttpResponse.json(newAddress, { status: 201 });
  }),

  // http.post('/todos', async ({ request }) => {
  //   const { text } = (await request.json()) as { text: string };
  //   const newTodo = { id: todos.length + 1, text, completed: false };
  //   todos.push(newTodo);
  //   return HttpResponse.json(newTodo, { status: 201 });
  // }),

  // http.put('/todos/:id', async ({ params, request }) => {
  //   const { id } = params;
  //   const updates = (await request.json()) as Record<string, unknown>;
  //   todos = todos.map((todo) =>
  //     todo.id === Number(id) ? { ...todo, ...updates } : todo
  //   );
  //   return HttpResponse.json(todos.find((todo) => todo.id === Number(id)));
  // }),

  // http.delete('/todos/:id', ({ params }) => {
  //   const { id } = params;
  //   todos = todos.filter((todo) => todo.id !== Number(id));
  //   return new HttpResponse(null, { status: 204 });
  // }),
];
