export type ProductType =
  | '스포츠'
  | '의류'
  | '신발' // '구두/신발'
  | '상품권' // '상품권/쿠폰'
  | '기타재화';

export const enum_options = {
  addProduct상품군: [
    { value: '스포츠', label: '스포츠용품' },
    { value: '의류', label: '의류' },
    { value: '신발', label: '구두/신발' },
    { value: '상품권', label: '상품권/쿠폰' },
    { value: '기타재화', label: '기타 재화' },
  ],
};

// category -> sub -> type -> fish (추가예정)
const 선상물고기 = [
  '갈치',
  '감성돔',
  '갑오징어',
  '고등어',
  '광어',
  '농어',
  '대구',
  '도다리',
  '돌돔',
  '무늬오징어',
  '문어',
  '백조기',
  '벵에돔',
  '볼락',
  '부시리 / 방어',
  '붕장어',
  '삼치',
  '숭어',
  '열기',
  '우럭',
  '전갱이',
  '전어',
  '주꾸미',
  '참가자미',
  '참돔',
  '학꽁치',
  '한치',
  '호래기',
];

const 방파제물고기 = [
  '갈치',
  '감성돔',
  '갑오징어',
  '고등어',
  '광어',
  '농어',
  '대구',
  '도다리',
  '돌돔',
  '무늬오징어',
  '문어',
  '백조기',
  '벵에돔',
  '볼락',
  '부시리 / 방어',
  '붕장어',
  '삼치',
  '숭어',
  '열기',
  '우럭',
  '전갱이',
  '전어',
  '주꾸미',
  '참가자미',
  '참돔',
  '학꽁치',
  '한치',
  '호래기',
];

const 갯바위물고기 = [
  '갈치',
  '감성돔',
  '갑오징어',
  '고등어',
  '광어',
  '농어',
  '대구',
  '도다리',
  '돌돔',
  '무늬오징어',
  '문어',
  '백조기',
  '벵에돔',
  '볼락',
  '부시리 / 방어',
  '붕장어',
  '삼치',
  '숭어',
  '열기',
  '우럭',
  '전갱이',
  '전어',
  '주꾸미',
  '참가자미',
  '참돔',
  '학꽁치',
  '한치',
  '호래기',
];

const 민물루어물고기 = ['붕어', '배스', '쏘가리', '송어', '민물장어'];
const 민물찌물고기 = ['붕어', '배스', '쏘가리', '송어', '민물장어'];

export const CATEGORY = {
  sea: {
    ship: [
      {
        value: 'all',
        label: '전체',
        fish: 선상물고기,
      },
      { value: 'set', label: '세트', fish: 선상물고기 },
      { value: 'rod', label: '낚싯대', fish: 선상물고기 },
      { value: 'reel', label: '릴', fish: 선상물고기 },
      { value: 'line', label: '라인', fish: 선상물고기 },
      { value: 'hook', label: '추/바늘/찌', fish: 선상물고기 },
      { value: 'lure', label: '루어/미끼', fish: 선상물고기 },
    ],
    rock: [
      {
        value: 'all',
        label: '전체',
        fish: 방파제물고기,
      },
      { value: 'set', label: '세트', fish: 방파제물고기 },
      { value: 'rod', label: '낚싯대', fish: 방파제물고기 },
    ],
    breakwater: [
      {
        value: 'all',
        label: '전체',
        fish: 갯바위물고기,
      },
      { value: 'set', label: '세트', fish: 갯바위물고기 },
      { value: 'rod', label: '낚싯대', fish: 갯바위물고기 },
    ],
  },
  fresh: {
    lure: [
      {
        value: 'all',
        label: '전체',
        fish: ['배스', '블루길', '가물치', '꺽지', '쏘가리', '송어'],
      },
      { value: 'set', label: '세트', fish: 민물루어물고기 },
      { value: 'rod', label: '낚싯대', fish: 민물루어물고기 },
    ],
    float: [
      {
        value: 'all',
        label: '전체',
        fish: ['붕어', '잉어', '향어', '미꾸라지', '몰개', '메기', '누치'],
      },
      { value: 'set', label: '세트', fish: 민물찌물고기 },
      { value: 'rod', label: '낚싯대', fish: 민물찌물고기 },
    ],
  },
  supplies: {
    all: [
      { value: 'all', label: '전체' },
      { value: 'tackleBox', label: '태클박스' },
      { value: 'cooler', label: '쿨러/바칸' },
      { value: 'light', label: '집어등/집어제' },
      { value: 'pinOnReel', label: '핀온릴/라인커터' },
      { value: 'knife', label: '가위/칼' },
      { value: 'net', label: '뜰채/부력망' },
      { value: 'rope', label: '로프' },
    ],
  },

  fashion: {
    all: [
      { value: 'all', label: '전체' },
      { value: 'top', label: '상의' },
      { value: 'bottom', label: '하의' },
      { value: 'hat', label: '모자/마스크/워머' },
      { value: 'gloves', label: '장갑/팔토시' },
      { value: 'shoes', label: '신발' },
      { value: 'lifeJacket', label: '구명복' },
      { value: 'accessory', label: '악세서리' },
    ],
  },

  etc: {
    all: [{ value: 'all', label: '전체' }],
  },
};

const ko_CATEGORY = {
  // 대분류
  sea: '바다',
  fresh: '민물',
  supplies: '소품',
  fashion: '의류/패션/잡화',
  etc: '기타',

  // 중분류
  ship: '선상',
  rock: '갯바위',
  breakwater: '방파제',
  lure: '루어',
  float: '찌',
  all: '전체',
  tackleBox: '태클박스',
  cooler: '쿨러/바칸',
  light: '집어등/집어제',
  pinOnReel: '핀온릴/라인커터',
  knife: '가위/칼',
  net: '뜰채/부력망',
  rope: '로프',
  top: '상의',
  bottom: '하의',
  hat: '모자/마스크/워머',
  gloves: '장갑/팔토시',
  shoes: '신발',
  lifeJacket: '구명복',
  accessory: '악세서리',
} as const;

export const getKoCategory = (key: string) => {
  return ko_CATEGORY[key as keyof typeof ko_CATEGORY] || key;
};

export interface CategoryNode {
  key: string;
  label: string;
  parent?: string;
  type: 'category' | 'sub' | 'type';
  value?: string;
  fish?: string[];
}

export const CATEGORY_TREE: CategoryNode[] = [
  // 🌊 바다
  { key: 'sea', label: '바다', type: 'category', value: 'sea' },

  // 바다 - 선상
  { key: 'sea_ship', label: '선상', type: 'sub', parent: 'sea', value: 'ship' },
  {
    key: 'sea_ship_all',
    label: '전체',
    type: 'type',
    parent: 'sea_ship',
    value: 'all',
    fish: [
      '갑오징어',
      '문어',
      '쭈꾸미',
      '광어',
      '우럭',
      '농어',
      '삼치',
      '부시리',
      '전갱이',
      '고등어',
      '참돔',
    ],
  },
  {
    key: 'sea_ship_set',
    label: '세트',
    type: 'type',
    parent: 'sea_ship',
    value: 'set',
    fish: ['쭈꾸미'],
  },
  {
    key: 'sea_ship_rod',
    label: '낚싯대',
    type: 'type',
    parent: 'sea_ship',
    value: 'rod',
    fish: ['문어'],
  },
  {
    key: 'sea_ship_reel',
    label: '릴',
    type: 'type',
    parent: 'sea_ship',
    value: 'reel',
    fish: ['광어'],
  },
  {
    key: 'sea_ship_line',
    label: '라인',
    type: 'type',
    parent: 'sea_ship',
    value: 'line',
    fish: [],
  },
  {
    key: 'sea_ship_hook',
    label: '추/바늘/찌',
    type: 'type',
    parent: 'sea_ship',
    value: 'hook',
    fish: [],
  },
  {
    key: 'sea_ship_lure',
    label: '루어/미끼',
    type: 'type',
    parent: 'sea_ship',
    value: 'lure',
    fish: [],
  },

  // 바다 - 갯바위
  {
    key: 'sea_rock',
    label: '갯바위',
    type: 'sub',
    parent: 'sea',
    value: 'rock',
  },
  {
    key: 'sea_rock_all',
    label: '전체',
    type: 'type',
    parent: 'sea_rock',
    value: 'all',
    fish: [
      '감성돔',
      '벵에돔',
      '돌돔',
      '우럭',
      '농어',
      '노래미',
      '쏨뱅이',
      '볼락',
    ],
  },
  {
    key: 'sea_rock_set',
    label: '세트',
    type: 'type',
    parent: 'sea_rock',
    value: 'set',
    fish: ['감성돔', '벵에돔'],
  },
  {
    key: 'sea_rock_rod',
    label: '낚싯대',
    type: 'type',
    parent: 'sea_rock',
    value: 'rod',
    fish: ['쏨뱅이'],
  },

  // 바다 - 방파제
  {
    key: 'sea_breakwater',
    label: '방파제',
    type: 'sub',
    parent: 'sea',
    value: 'breakwater',
  },
  {
    key: 'sea_breakwater_all',
    label: '전체',
    type: 'type',
    parent: 'sea_breakwater',
    value: 'all',
    fish: [
      '고등어',
      '전갱이',
      '학공치',
      '전어',
      '노래미',
      '망둥어',
      '볼락',
      '갑오징어',
      '쭈꾸미',
    ],
  },
  {
    key: 'sea_breakwater_set',
    label: '세트',
    type: 'type',
    parent: 'sea_breakwater',
    value: 'set',
    fish: ['고등어', '전갱이'],
  },
  {
    key: 'sea_breakwater_rod',
    label: '낚싯대',
    type: 'type',
    parent: 'sea_breakwater',
    value: 'rod',
    fish: ['갑오징어', '쭈꾸미'],
  },

  // 💧 민물
  { key: 'fresh', label: '민물', type: 'category', value: 'fresh' },

  // 민물 - 루어
  {
    key: 'fresh_lure',
    label: '루어',
    type: 'sub',
    parent: 'fresh',
    value: 'lure',
  },
  {
    key: 'fresh_lure_all',
    label: '전체',
    type: 'type',
    parent: 'fresh_lure',
    value: 'all',
    fish: ['배스', '블루길', '가물치', '꺽지', '쏘가리', '송어'],
  },
  {
    key: 'fresh_lure_set',
    label: '세트',
    type: 'type',
    parent: 'fresh_lure',
    value: 'set',
    fish: [],
  },
  {
    key: 'fresh_lure_rod',
    label: '낚싯대',
    type: 'type',
    parent: 'fresh_lure',
    value: 'rod',
    fish: [],
  },

  // 민물 - 찌낚시
  {
    key: 'fresh_float',
    label: '찌낚시',
    type: 'sub',
    parent: 'fresh',
    value: 'float',
  },
  {
    key: 'fresh_float_all',
    label: '전체',
    type: 'type',
    parent: 'fresh_float',
    value: 'all',
    fish: ['붕어', '잉어', '향어', '미꾸라지', '몰개', '메기', '누치'],
  },
  {
    key: 'fresh_float_set',
    label: '세트',
    type: 'type',
    parent: 'fresh_float',
    value: 'set',
    fish: [],
  },
  {
    key: 'fresh_float_rod',
    label: '낚싯대',
    type: 'type',
    parent: 'fresh_float',
    value: 'rod',
    fish: [],
  },

  // 🎣 소품/용품
  { key: 'supplies', label: '소품/용품', type: 'category', value: 'supplies' },
  {
    key: 'supplies_all',
    label: '전체',
    type: 'type',
    parent: 'supplies',
    value: 'all',
  },
  {
    key: 'supplies_tackleBox',
    label: '태클박스',
    type: 'type',
    parent: 'supplies',
    value: 'tackleBox',
  },
  {
    key: 'supplies_cooler',
    label: '쿨러/바칸',
    type: 'type',
    parent: 'supplies',
    value: 'cooler',
  },
  {
    key: 'supplies_light',
    label: '집어등/집어제',
    type: 'type',
    parent: 'supplies',
    value: 'light',
  },
  {
    key: 'supplies_pinOnReel',
    label: '핀온릴/라인커터',
    type: 'type',
    parent: 'supplies',
    value: 'pinOnReel',
  },
  {
    key: 'supplies_knife',
    label: '가위/칼',
    type: 'type',
    parent: 'supplies',
    value: 'knife',
  },
  {
    key: 'supplies_net',
    label: '뜰채/부력망',
    type: 'type',
    parent: 'supplies',
    value: 'net',
  },
  {
    key: 'supplies_rope',
    label: '로프',
    type: 'type',
    parent: 'supplies',
    value: 'rope',
  },

  // 👕 패션
  { key: 'fashion', label: '패션', type: 'category', value: 'fashion' },
  {
    key: 'fashion_all',
    label: '전체',
    type: 'type',
    parent: 'fashion',
    value: 'all',
  },
  {
    key: 'fashion_top',
    label: '상의',
    type: 'type',
    parent: 'fashion',
    value: 'top',
  },
  {
    key: 'fashion_bottom',
    label: '하의',
    type: 'type',
    parent: 'fashion',
    value: 'bottom',
  },
  {
    key: 'fashion_hat',
    label: '모자/마스크/워머',
    type: 'type',
    parent: 'fashion',
    value: 'hat',
  },
  {
    key: 'fashion_gloves',
    label: '장갑/팔토시',
    type: 'type',
    parent: 'fashion',
    value: 'gloves',
  },
  {
    key: 'fashion_shoes',
    label: '신발',
    type: 'type',
    parent: 'fashion',
    value: 'shoes',
  },
  {
    key: 'fashion_lifeJacket',
    label: '구명복',
    type: 'type',
    parent: 'fashion',
    value: 'lifeJacket',
  },
  {
    key: 'fashion_accessory',
    label: '악세서리',
    type: 'type',
    parent: 'fashion',
    value: 'accessory',
  },

  // 🧰 기타
  { key: 'etc', label: '기타', type: 'category', value: 'etc' },
  { key: 'etc_all', label: '전체', type: 'type', parent: 'etc', value: 'all' },
];

const CATEGORY_CATE = CATEGORY_TREE.filter((item) => item.type === 'category');
const CATEGORY_SUB = CATEGORY_TREE.filter((item) => item.type === 'sub');

const CATEGORY_TYPE_선상 = CATEGORY_TREE.filter(
  (item) => item.parent === 'sea_ship'
);
const CATEGORY_TYPE_선상_갯바위 = CATEGORY_TREE.filter(
  (item) => item.parent === 'sea_rock'
);
const CATEGORY_TYPE_선상_방파제 = CATEGORY_TREE.filter(
  (item) => item.parent === 'sea_breakwater'
);
const CATEGORY_TYPE_민물_루어 = CATEGORY_TREE.filter(
  (item) => item.parent === 'fresh_lure'
);
const CATEGORY_TYPE_민물_찌낚시 = CATEGORY_TREE.filter(
  (item) => item.parent === 'fresh_float'
);
const CATEGORY_TYPE_소품 = CATEGORY_TREE.filter(
  (item) => item.parent === 'supplies'
);
const CATEGORY_TYPE_패션 = CATEGORY_TREE.filter(
  (item) => item.parent === 'fashion'
);
const CATEGORY_TYPE_기타 = CATEGORY_TREE.filter(
  (item) => item.parent === 'etc'
);

CATEGORY_TREE.filter((v) => v.parent === 'sea');
export const 중분류 = (category: string) => {
  return CATEGORY_TREE.filter((v) => v.parent === category);
};

export {
  CATEGORY_CATE,
  CATEGORY_SUB,
  CATEGORY_TYPE_선상,
  CATEGORY_TYPE_선상_갯바위,
  CATEGORY_TYPE_선상_방파제,
  CATEGORY_TYPE_민물_루어,
  CATEGORY_TYPE_민물_찌낚시,
  CATEGORY_TYPE_소품,
  CATEGORY_TYPE_패션,
  CATEGORY_TYPE_기타,
};
