import { delay, http, HttpResponse } from 'msw';
import { productDetailData } from './data/productDetailData';
import { cardData } from './data/CartData';

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
    const cart = cardData;
    if (!cart) {
      return HttpResponse.json(
        {
          message: '장바구니가 비어있습니다.',
        },
        { status: 404 }
      );
    }

    await delay(2000); // 0.5초 지연

    return HttpResponse.json(cart);
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
