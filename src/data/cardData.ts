export interface Product {
  title: string;
  description: string;
  price: number;
  discountRate: number;
  img: string;
  freeShipping?: boolean;
  //   label: "new" | "best"
}

export const 신상품 = [
  {
    title: '아부가르시아',
    description: '맥스Z 더블핸들, 선상 루어 베이트릴',
    price: 89000,
    discountRate: 10,
    img: 'https://m.nbfs.co.kr/web/product/big/202203/f77c14b01535652a84ed1d488039a76f.jpg',
    freeShipping: true,
  },
  {
    title: '999피싱',
    description: '쭈꾸미 갑오징어용 집어제',
    price: 14900,
    discountRate: 10,
    img: 'https://m.nbfs.co.kr/web/product/big/202203/f77c14b01535652a84ed1d488039a76f.jpg',
  },
  {
    title: '시마노',
    description: '25년 고어텍스 레인 로우 캡 CA-0712',
    price: 61800,
    discountRate: 2,
    img: 'https://m.nbfs.co.kr/web/product/big/202203/f77c14b01535652a84ed1d488039a76f.jpg',
  },
  {
    title: '델리온',
    description: '델리리그 2세대',
    price: 4500,
    discountRate: 13,
    img: 'https://m.nbfs.co.kr/web/product/big/202203/f77c14b01535652a84ed1d488039a76f.jpg',
  },
  {
    title: '포세이돈코리아',
    description: '듀얼 고급 카운터기',
    price: 13000,
    discountRate: 0,
    img: 'https://m.nbfs.co.kr/web/product/big/202203/f77c14b01535652a84ed1d488039a76f.jpg',
  },
];
