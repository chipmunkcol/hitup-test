// category -> sub -> type -> fish (추가예정)

export const CATEGORY = {
  sea: {
    ship: [
      {
        value: 'all',
        label: '전체',
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
      { value: 'set', label: '세트', fish: ['쭈꾸미'] },
      { value: 'rod', label: '낚싯대', fish: ['문어'] },
      { value: 'reel', label: '릴', fish: ['광어'] },
      { value: 'line', label: '라인', fish: [] },
      { value: 'hook', label: '추/바늘/찌', fish: [] },
      { value: 'lure', label: '루어/미끼', fish: [] },
    ],
    rock: [
      {
        value: 'all',
        label: '전체',
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
      { value: 'set', label: '세트', fish: ['감성돔', '벵에돔'] },
      { value: 'rod', label: '낚싯대', fish: ['쏨뱅이'] },
    ],
    breakwater: [
      {
        value: 'all',
        label: '전체',
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
      { value: 'set', label: '세트', fish: ['고등어', '전갱이'] },
      { value: 'rod', label: '낚싯대', fish: ['갑오징어', '쭈꾸미'] },
    ],
  },
  fresh: {
    lure: [
      {
        value: 'all',
        label: '전체',
        fish: ['배스', '블루길', '가물치', '꺽지', '쏘가리', '송어'],
      },
      { value: 'set', label: '세트', fish: [] },
      { value: 'rod', label: '낚싯대', fish: [] },
    ],
    float: [
      {
        value: 'all',
        label: '전체',
        fish: ['붕어', '잉어', '향어', '미꾸라지', '몰개', '메기', '누치'],
      },
      { value: 'set', label: '세트', fish: [] },
      { value: 'rod', label: '낚싯대', fish: [] },
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
