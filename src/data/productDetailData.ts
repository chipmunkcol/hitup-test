export interface Product {
  id: number;
  브랜드명: string;
  상품명: string;
  가격: number;
  할인율: number;
  이미지: string[];
  무료배송: boolean;
  별점: number;
  옵션: string[];
  상품정보: string;
  리뷰: {
    id: number;
    작성자: string;
    작성자프로필: string;
    작성일: string;
    내용: string;
    별점: number;
    리뷰이미지: string[];
  }[];
  상품문의: {
    id: number;
    문의유형: string;
    문의상품옵션: string;
    제목: string;
    내용: string;
    이미지: string;
    작성자: string;
    작성일: string;
    답변: {
      완료: boolean;
      내용: string;
      완료일: string;
    };
  }[];
}

export const productDetailData: Product = {
  id: 4,
  브랜드명: 'CCCC',
  상품명: 'C',
  가격: 10000,
  할인율: 10,
  이미지: [
    'https://picsum.photos/200',
    'https://picsum.photos/300',
    'https://picsum.photos/400',
    'https://picsum.photos/500',
    'https://picsum.photos/600',
    'https://picsum.photos/700',
    'https://picsum.photos/800',
  ],
  무료배송: true,
  별점: 4.5,
  옵션: ['옵션 1', '옵션 2', '옵션 3'],
  상품정보: `string 값으로 img data 가 같이 들어가는 형태가 될듯함`,
  리뷰: [
    {
      id: 1,
      작성자: '작성자',
      작성자프로필: 'https://picsum.photos/200',
      작성일: '2023-01-01',
      내용: '리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.',
      별점: 5,
      리뷰이미지: ['https://picsum.photos/200', 'https://picsum.photos/300'],
    },
    {
      id: 2,
      작성자: '작성자',
      작성자프로필: 'https://picsum.photos/200',
      작성일: '2023-01-01',
      내용: '리뷰 내용입니다.',
      별점: 4,
      리뷰이미지: [
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/300',
      ],
    },
    {
      id: 3,
      작성자: '작성자',
      작성자프로필: 'https://picsum.photos/200',
      작성일: '2023-01-01',
      내용: '리뷰 내용입니다.',
      별점: 3,
      리뷰이미지: [],
    },
  ],
  상품문의: [
    {
      id: 1,
      문의유형: '사이즈',
      문의상품옵션: '',
      제목: '사이즈 문의합니다.',
      내용: '사이즈 문의 내용입니다.',
      이미지: 'https://picsum.photos/200',
      작성자: '작성자',
      작성일: '2023-01-01',
      답변: {
        완료: true,
        내용: '답변 내용입니다.',
        완료일: '2023-01-02',
      },
    },
    {
      id: 2,
      문의유형: '배송',
      문의상품옵션: '',
      제목: '배송 문의합니다.',
      내용: '배송 문의 내용입니다.',
      이미지: 'https://picsum.photos/200',
      작성자: '작성자',
      작성일: '2023-01-01',
      답변: {
        완료: false,
        내용: '',
        완료일: '',
      },
    },
    {
      id: 3,
      문의유형: '재입고',
      문의상품옵션: '',
      제목: '재입고 문의합니다.',
      내용: '재입고 문의 내용입니다.',
      이미지: 'https://picsum.photos/200',
      작성자: '작성자',
      작성일: '2023-01-01',
      답변: {
        완료: false,
        내용: '',
        완료일: '',
      },
    },
  ],
};
