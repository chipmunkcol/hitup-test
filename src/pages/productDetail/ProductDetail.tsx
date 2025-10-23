import { useState } from 'react';
import DropdownInfo from '@/components/common/widgets/DropdownInfo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addToCart, getProduct } from '@/utils/api/api';
import type { CartItem } from '@/data/CartData';
import type { Product } from '@/data/productDetailData';
import { TumbCarousel } from '@/components/common/libs/carousel/TumbCarousel';
import Button from '@/components/common/Button';
import {
  swalAlert,
  swalConfirm,
} from '@/components/common/libs/sweetalert/sweetalert';
import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from '@/styles/typography';
import SelectboxOptions from '@/components/common/widgets/SelectboxOptions';
import { createPortal } from 'react-dom';
import CancelIcon from '@/components/common/icon/CancelIcon';
import SelectboxCheck from '@/components/common/widgets/SelectboxCheck';
import Input from '@/components/common/Input';

import ArrowToRight from '@/components/common/icon/ArrowToRight';
import StarIcon from '@/components/common/icon/StarIcon';
import Download from '@/components/common/icon/Download';
import NpayBtn from '@/components/common/icon/NpayBtn';

// const 배송교환반품안내 =
//   '고객님께서 주문하신 상품은 결제 완료 후 순차 발송되며, 배송은 평균 2~3일 소요됩니다. 상품에 하자가 있거나 단순 변심으로 인한 교환·반품은 수령 후 7일 이내 고객센터를 통해 접수해 주셔야 하며, 단순 변심의 경우 왕복 배송비가 발생할 수 있습니다.';
// const 상품고시정보안내 =
//   '본 상품은 전자상거래법 및 관련 법률에 따른 상품 고시 정보를 제공합니다. 제조사, 원산지, 주요 소재, 품질보증 기준 및 A/S 안내 등 필수 정보는 상세페이지 하단에서 확인하실 수 있으며, 정확한 정보를 제공하기 위해 노력하고 있습니다.';
// const 판매자정보 =
//   '본 상품은 해당 판매자가 직접 등록·관리하고 있으며, 판매자 상호, 대표자명, 사업자등록번호, 통신판매업 신고번호, 소재지 및 고객센터 연락처 등 필수 정보는 관련 법령에 따라 상세페이지 하단 ‘판매자 정보’에서 확인하실 수 있습니다.';

const id = 2;
const ProductDetail = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProduct(id),
  });

  const [tab, setTab] = useState('info');

  // 장바구니 담기
  const mutation = useMutation({
    mutationFn: (newItem: CartItem) => addToCart(newItem),
    onSuccess: async (data) => {
      console.log('data: ', data);
      const res_confirm = await swalConfirm(
        '장바구니에 상품이 담겼습니다',
        '장바구니 바로가기',
        '닫기'
      );
      //  확인 버튼 클릭 시 장바구니 이동
      if (res_confirm.isConfirmed) {
        // 장바구니로 이동
        navigate('/cart');
      }

      // 더 둘러보기 클릭 시 아무 동작 없음
      if (res_confirm.isDismissed) return null;
    },
    onError: (error) => {
      console.error('장바구니 담기 실패: ', error);
      alert('장바구니 담기에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleAddToCart = async (newItem: Product) => {
    mutation.mutate({
      id: newItem.id,
      브랜드명: newItem.브랜드명,
      상품명: newItem.상품명,
      가격: newItem.가격,
      할인율: newItem.할인율,
      이미지: newItem.이미지[0],
      옵션: '', // 선택한 옵션들을 ,로 구분하여 문자열로 넘겨줄듯
      수량: 1,
    });
  };

  const goContactSellerPortal = (productId: number) => {
    navigate(`/product/${productId}/contact/add`);
  };

  const goContactHistory = () => {
    navigate(`/product/${id}/contacts`);
  };

  // react portal
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const closePortal = () => {
    setIsPortalOpen(false);
  };

  const 할인가 = data ? data.가격 - (data.가격 * data.할인율) / 100 : 0;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return <div>상품이 존재하지 않습니다.</div>;
  console.log('data: ', data);

  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className="flex-4">
          {/* <div className="max-w-[736px] px-5"> */}
          <div className=" px-5">
            <TumbCarousel images={data.이미지} />
          </div>
          <div className="flex">
            <div
              className={`${TYPOGRAPHY.Heading124Bold} ${tab === 'info' ? 'border border-HITUP_Blue bg-Grey-05' : 'border border-Grey-40 bg-Grey-10'} flex-1 py-5 flex justify-center items-center cursor-pointer`}
              onClick={() => setTab('info')}
            >
              {/* `font-smoothing`, `text-rendering` */}
              {/* <span
                className={`${tab === 'info' ? 'text-HITUP_Blue' : 'text-Grey-70'} `}
              > */}
              상품 정보
              {/* </span> */}
            </div>
            <div
              className={`${tab === 'review' ? 'border border-HITUP_Blue bg-Grey-05' : 'border border-Grey-40 bg-Grey-10'} flex-1 py-5 flex justify-center items-center cursor-pointer`}
              onClick={() => setTab('review')}
            >
              <span
                className={`${tab === 'review' ? 'text-HITUP_Blue' : 'text-Grey-70'} ${TYPOGRAPHY.Heading124Bold}`}
              >
                리뷰 ({data?.리뷰?.length})
              </span>
            </div>
          </div>
          {tab === 'info' && (
            <div className="h-[400px] bg-Bgrey-20 flex items-center justify-center">
              상품 정보 이미지 + 텍스트
            </div>
          )}
          {tab === 'review' && (
            <ul className="space-y-4">
              {data.리뷰.map((item) => (
                <li className="w-full py-2 border-b flex gap-4" key={item?.id}>
                  <div className="flex flex-4 gap-2">
                    <div className=" w-[40px] h-[40px] rounded-full">
                      <img
                        className="w-full h-full rounded-full"
                        src={item?.작성자프로필}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-2">
                        <div>{item?.작성자}</div>
                        <div>
                          {item?.별점.toFixed(0)}*⭐ {item?.별점}
                        </div>
                      </div>
                      <div>옵션</div>
                      <div>{item?.내용}</div>
                    </div>
                  </div>
                  <div className="h-[128px] relative flex-1">
                    <img className="h-full" src={item?.리뷰이미지[0]} />
                    <div className="absolute bottom-0 right-0 z-10 text-white bg-Grey-70 px-2">
                      {item?.리뷰이미지.length > 0 && item?.리뷰이미지.length}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="px-6 py-4 bg-Blue-05 flex justify-between text-xl">
            <div className={TYPOGRAPHY.Heading124Bold}>
              상품 문의 ({data?.상품문의?.length})
            </div>
            <div
              className={`${TYPOGRAPHY.Heading222Medium} text-Grey-70 underline underline-offset-4 decoration-2 cursor-pointer`}
              onClick={goContactHistory}
            >
              더 보기
            </div>
          </div>

          {/* 상품 문의 컴포넌트 */}
          <div className="w-full">
            {data.상품문의?.length > 0 &&
              data.상품문의?.slice(0, 3).map((item) => (
                <div
                  className={`${TYPOGRAPHY.Heading222Semi} text-Grey-70 py-3 px-6 flex justify-between `}
                  key={item?.id}
                >
                  <div>{item?.제목}</div>
                  <div className="flex gap-3">
                    <div>{item?.작성자}</div>
                    <div>{item?.작성일}</div>
                    <div className="w-[24px] h-[24px] flex justify-center items-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="8"
                        viewBox="0 0 14 8"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.37625 7.37629C7.18872 7.56376 6.93442 7.66907 6.66925 7.66907C6.40409 7.66907 6.14978 7.56376 5.96225 7.37629L0.305251 1.71929C0.209742 1.62704 0.133558 1.5167 0.0811491 1.39469C0.0287409 1.27269 0.0011549 1.14147 9.53674e-07 1.00869C-0.00115299 0.87591 0.0241489 0.744231 0.0744295 0.621335C0.124711 0.498438 0.198965 0.386786 0.292857 0.292893C0.38675 0.199 0.498401 0.124747 0.621297 0.0744663C0.744194 0.0241854 0.875874 -0.00111606 1.00865 3.7757e-05C1.14143 0.00119157 1.27265 0.0287779 1.39466 0.0811869C1.51666 0.133596 1.627 0.209778 1.71925 0.305288L6.66925 5.25529L11.6193 0.305288C11.8079 0.12313 12.0605 0.0223355 12.3227 0.0246139C12.5849 0.0268924 12.8357 0.132061 13.0211 0.317469C13.2065 0.502877 13.3116 0.75369 13.3139 1.01589C13.3162 1.27808 13.2154 1.53069 13.0333 1.71929L7.37625 7.37629Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}

            {data.상품문의?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10">
                <div>아직 등록된 상품 문의가 없습니다.</div>
              </div>
            )}
          </div>
          <div className="px-4 py-4">
            <Button onClick={() => setIsPortalOpen(true)} variant="default">
              판매자에게 문의하기
            </Button>
          </div>
          {/* <div>배송/교환/반품 안내</div> */}
          <DropdownInfo title="배송/교환/반품 안내">
            <ul className={`text-Grey-70 ${TYPOGRAPHY.Heading222Semi}`}>
              <li className="py-4 px-6  flex gap-4">
                <div>• </div>
                <div>마켓 배송 상품은 해당 마켓이 직접 배송해 드려요.</div>
              </li>
              <li className="pb-4 px-6 flex gap-4">
                <div>• </div>
                <div>마켓 배송 상품은 해당 마켓이 직접 배송해 드려요.</div>
              </li>
              <li className="pb-4 px-6 flex gap-4">
                <div>• </div>
                <div>
                  상품 별로 교환/반품 배송비가 다를 수 있으며, 반품 접수 및 상품
                  상세페이지에서 금액 확인 가능해요.
                </div>
              </li>
              <li className="pb-4 px-6 flex gap-4">
                <div>• </div>
                <div>
                  마켓 배송 상품 교환/반품 시 해당 마켓의 반품 주소로
                  반품해주세요.
                </div>
              </li>
            </ul>
          </DropdownInfo>
          <DropdownInfo title="상품 고시 정보 안내">
            <div className={`text-Grey-70 ${TYPOGRAPHY.Heading222Semi}`}>
              <div className="py-3 px-6 flex gap-4">
                <div>품명 및 모델명 :</div>
                <div>[data]</div>
              </div>

              <div className="py-3 px-6 flex gap-4">
                <div>제품의 사용 목적 및 사용 방법 :</div>
                <div>[data]</div>
              </div>
              <div className="py-3 px-6 flex gap-4">
                <div>품질 보증 기준 : </div>
                <div>[data]</div>
              </div>
            </div>
          </DropdownInfo>
          <DropdownInfo title="판매자 정보">
            <div className={`text-Grey-70 ${TYPOGRAPHY.Heading222Semi}`}>
              <div className="py-3 px-6 flex gap-4">
                <div>상호명 :</div>
                <div>[data]</div>
              </div>
              <div className="py-3 px-6 flex gap-4">
                <div>대표자 :</div>
                <div>[data]</div>
              </div>
              <div className="py-3 px-6 flex gap-4">
                <div>주소 :</div>
                <div>[data]</div>
              </div>
              <div className="py-3 px-6 flex gap-4">
                <div>사업자등록번호 :</div>
                <div>[data]</div>
              </div>
              <div className="py-3 px-6 flex gap-4">
                <div>통신판매업신고번호 :</div>
                <div>[data]</div>
              </div>
            </div>
          </DropdownInfo>
          {/* <DropdownInfo title="상품 고시 정보 안내" data={상품고시정보안내} />
          <DropdownInfo title="판매자 정보" data={판매자정보} /> */}
        </div>
        <div className="flex-3">
          <div className="flex flex-col gap-5 ">
            {/* 999피싱부터 별점까지 */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <div className={`${TYPOGRAPHY.Heading124Bold}`}>
                  브랜드 명 [data]
                </div>
                <ArrowToRight />
              </div>
              <div className={`${TYPOGRAPHY.Heading222Medium}`}>
                상품명 [data]
              </div>
              <div className="mt-1 flex items-center gap-2">
                <StarIcon />
                <div className="flex gap-2">
                  <div>별점</div>
                  <div>4.6</div>
                </div>
                <div className={`${TYPOGRAPHY.Subheading16Medium}`}>/</div>
                <div className="flex gap-2">
                  <div>리뷰</div>
                  <div>(6)</div>
                </div>
              </div>
            </div>

            {/* 가격 부분 */}
            <div className="flex flex-col gap-2">
              <div
                className={`line-through ${TYPOGRAPHY.Subheading16Regular} text-Grey-60`}
              >
                {data.가격}원
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3">
                  <div
                    className={`${TYPOGRAPHY.Heading28Bold} text-HITUP_Blue`}
                  >
                    {data.할인율}%
                  </div>
                  <div className={`${TYPOGRAPHY.Heading222Bold}`}>
                    {할인가} 원
                  </div>
                </div>
                <div
                  className={`px-3 py-1 border rounded-xl flex items-center justify-center ${TYPOGRAPHY.Label12Bold}`}
                >
                  무료 배송
                </div>
              </div>
            </div>

            {/* 쿠폰 받기 */}
            <div className="flex justify-end">
              <button className="border border-HITUP_Blue rounded-lg bg-Blue-05 py-1 px-5 flex gap-5 items-center">
                <div
                  className={`${TYPOGRAPHY.Subheading16Bold} text-HITUP_Blue`}
                >
                  할인 쿠폰 받기
                </div>
                <Download />
              </button>
            </div>

            {/* 선택 옵션 등 버튼 부분*/}
            <div className="flex flex-col gap-4">
              <SelectboxOptions
                placeholder="선택 옵션"
                options={[
                  { value: 'option1', label: '옵션1', price: 10000 },
                  { value: 'option2', label: '옵션2', price: 20000 },
                ]}
              ></SelectboxOptions>

              <div className="flex gap-3">
                <Button variant="default" onClick={() => handleAddToCart(data)}>
                  장바구니 담기
                </Button>
                <Button variant="blue">바로구매</Button>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col gap-[2px]">
                  <div
                    className={`${TYPOGRAPHY.Subheading16Bold} text-[#00DE5A]`}
                  >
                    NAVER
                  </div>
                  <div>
                    네이버 ID로 간편 구매 <br />
                    네이버 페이
                  </div>
                </div>
                <NpayBtn />
              </div>
            </div>

            {/* 구분선 */}
            <div className="border-b-2 border-Grey-40" />

            {/* 브랜드 배송 정보 */}
            <div className="flex flex-col gap-3">
              <div className={`${TYPOGRAPHY.Heading222Bold}`}>
                브랜드 배송 정보
              </div>
              <div className={`${TYPOGRAPHY.Heading318Medium}`}>
                14시 이내 결제 주문건 당일 출고 우체국 택배
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 판매자에게 문의하기 portal */}
      {isPortalOpen &&
        createPortal(
          <ContactSellerPortal closePortal={closePortal} />,
          document.body
        )}
    </div>
  );
};

export default ProductDetail;

interface ContactSellerPortalProps {
  closePortal: () => void;
}

const ContactSellerPortal = ({ closePortal }: ContactSellerPortalProps) => {
  return (
    <div
      className="z-[1000] w-full h-full fixed inset-0 flex justify-center items-start"
      style={{ background: 'rgba(0, 0, 0, 0.25)' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  max-w-[720px] mx-auto">
        <div className="border border-Grey-20 bg-Grey-05 rounded-2xl flex flex-col justify-center">
          <div className="w-full py-4 px-5 bg-Blue-05 rounded-t-2xl flex justify-between items-center">
            <h1 className={`${TYPOGRAPHY.Heading124Bold}`}>
              판매자에게 문의하기
            </h1>
            <div className="cursor-pointer" onClick={closePortal}>
              <CancelIcon />
            </div>
          </div>
          <div className="px-5">
            <div className="py-4 flex gap-8">
              <div className="w-[100px] h-[100px] ">
                <img className="w-full h-full bg-Grey-20 rounded-xl" />
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <div>상품명 : [data]</div>
                <div className="flex gap-3">
                  <div>10%</div>
                  <div className="line-through">89,000 원</div>
                  <div>80,100원</div>
                </div>
              </div>
            </div>

            {/* border-svg */}
            <DividerSvg />
            <div className="py-2 flex items-center gap-7">
              <div className={`w-[78px] ${TYPOGRAPHY.Heading222Semi}`}>
                문의 유형
              </div>
              <div className="flex-1">
                <SelectboxCheck placeholder="문의 유형을 선택해주세요" />
              </div>
            </div>
            {/* border-svg */}
            <DividerSvg />
            <div className="py-2 flex items-center gap-7">
              <div className={`w-[78px] ${TYPOGRAPHY.Heading222Semi}`}>
                제목
              </div>
              <div className="flex-1">
                <Input placeholder="제목을 입력해주세요." />
              </div>
            </div>

            {/* border-svg */}
            <DividerSvg />
            <div className="py-3 flex justify-between">
              <div className={`w-[78px] ${TYPOGRAPHY.Heading222Semi}`}>
                문의 내용
              </div>
              <div className="flex justify-center gap-3">
                <input type="checkbox" />
                <div className={`${TYPOGRAPHY.Heading222Medium} text-Grey-70`}>
                  비밀글
                </div>
              </div>
            </div>
            <div className="py-3">
              <textarea
                className={`w-full min-h-[128px] border border-Grey-60 rounded-xl px-4 py-3 ${TYPOGRAPHY.Heading318Medium} text-Grey-60 focus:outline-none focus:border-Grey-60`}
              />
            </div>

            {/* <DividerSvg /> */}
            <DividerSvg />

            <div>
              <div className={`py-4 ${TYPOGRAPHY.Heading222Semi}`}>
                사진 첨부
              </div>
              <div className="flex py-2 gap-6 items-center">
                <div className="w-[100px] h-[100px] flex justify-center items-center bg-Grey-10 border border-Grey-60 rounded-xl cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z"
                      fill="#9A9A9A"
                    />
                  </svg>
                </div>
                <div className={`${TYPOGRAPHY.Heading222Semi}`}>최대 5장</div>
              </div>
            </div>

            <div className="flex gap-4 py-4">
              <Button onClick={closePortal} className="flex-1 ">
                닫기
              </Button>
              <Button
                // onClick={handleApplyCoupon}
                className="flex-1"
                variant="grey"
              >
                등록하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function DividerSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="680"
      height="1"
      viewBox="0 0 680 1"
      fill="none"
    >
      <path d="M0 0.5H680" stroke="#606060" />
    </svg>
  );
}
