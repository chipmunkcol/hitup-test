import mainImage from '@/assets/images/detail_page/detail_main.png';
import subImage2 from '@/assets/images/detail_page/detail_sub2.png';
import subImage3 from '@/assets/images/detail_page/detail_sub3.png';
import subImage4 from '@/assets/images/detail_page/detail_sub4.png';

export interface ProductContact {
  id: number;
  상품명: string;
  문의유형: string;
  문의상품옵션: string;
  제목: string;
  내용: string;
  이미지: string[] | string; // 임시로 string 도 넣어둠
  작성자: string;
  작성일: string;
  답변: {
    완료: boolean;
    내용: string;
    완료일: string;
  };
}

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
  상품문의: ProductContact[];
}

// 이미지 변수들이 선언되어 있다는 가정 (mainImage, subImage2 등)
export const productDetailData: Product = {
  id: 2,
  브랜드명: 'CCCC',
  상품명: 'CR-다이닝릴',
  가격: 10000,
  할인율: 10,
  이미지: [
    mainImage,
    subImage2,
    subImage3,
    subImage4,
    subImage2,
    subImage3,
    subImage4,
    subImage2,
    subImage3,
    subImage4,
  ],
  무료배송: true,
  별점: 4.5,
  옵션: ['옵션 1', '옵션 2', '옵션 3'],
  상품정보: `string 값으로 img data 가 같이 들어가는 형태가 될듯함`,
  리뷰: [
    {
      id: 1,
      작성자: '낚시고수1243',
      작성자프로필: 'https://picsum.photos/200',
      작성일: '2023-01-01',
      내용: '리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다.',
      별점: 5,
      리뷰이미지: ['https://picsum.photos/200', 'https://picsum.photos/300'],
    },
    {
      id: 2,
      작성자: 'user1234',
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
      작성자: 'admin',
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
      상품명: '상품명A',
      문의유형: '사이즈',
      문의상품옵션: '옵션1',
      제목: '사이즈 문의합니다.',
      내용: '다른 브랜드는 240 신는데 이 상품은 정사이즈 인가요? 아니면 반업해야할까요? 다른 브랜드는 240 신는데 이 상품은 정사이즈 인가요? 아니면 반업해야할까요?',
      이미지: [],
      작성자: 'admin',
      작성일: '2023-01-01',
      답변: {
        완료: true,
        // 특수문자 제거: 줄바꿈이나 보이지 않는 라인 시퀀스 제거하고 일반 공백/줄바꿈(\n) 사용
        내용: '회원님께 추천드리고 싶은 사이즈는 평소 착용하시는 정 사이즈이며, 발등 및 발볼이 넓으실 경우 반 사이즈 업을 추천드립니다. 다만 개인차가 존재할 수 있으니 추천 사이즈는 참고만 부탁드립니다.',
        완료일: '2023-01-02',
      },
    },
    {
      id: 2,
      상품명: '상품명BB',
      문의유형: '배송',
      문의상품옵션: '옵션22',
      제목: '배송 문의합니다.',
      내용: '배송 문의 내용입니다.',
      이미지: [
        'https://picsum.photos/200',
        'https://picsum.photos/300',
        'https://picsum.photos/400',
      ],
      작성자: 'user123',
      작성일: '2023-01-01',
      답변: {
        완료: false,
        내용: '',
        완료일: '',
      },
    },
    {
      id: 3,
      상품명: '상품명CCC',
      문의유형: '재입고',
      문의상품옵션: '옵션333',
      제목: '재입고 문의합니다.',
      내용: '재입고 문의 내용입니다.재입고 문의 내용입니다.재입고 문의 내용입니다.재입고 문의 내용입니다.재입고 문의 내용입니다.',
      이미지: ['https://picsum.photos/200'],
      작성자: 'user123',
      작성일: '2023-01-01',
      답변: {
        완료: true,
        내용: '회원님께 추천드리고 싶은 사이즈는 평소 착용하시는 정 사이즈이며, 발등 및 발볼이 넓으실 경우 반 사이즈 업을 추천드립니다. 다만 개인차가 존재할 수 있으니 추천 사이즈는 참고만 부탁드립니다.',
        완료일: '2023-01-02',
      },
    },
  ],
};
