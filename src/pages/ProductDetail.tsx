import { useState } from 'react';
import { TumbCarousel } from '../components/common/libs/TumbCarousel';
import DropdownInfo from '../components/common/widgets/DropdownInfo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addToCart, getProduct } from '../utils/api/api';
import type { CartItem } from '../data/CartData';
import type { Product } from '../data/productDetailData';

const 배송교환반품안내 =
  '고객님께서 주문하신 상품은 결제 완료 후 순차 발송되며, 배송은 평균 2~3일 소요됩니다. 상품에 하자가 있거나 단순 변심으로 인한 교환·반품은 수령 후 7일 이내 고객센터를 통해 접수해 주셔야 하며, 단순 변심의 경우 왕복 배송비가 발생할 수 있습니다.';
const 상품고시정보안내 =
  '본 상품은 전자상거래법 및 관련 법률에 따른 상품 고시 정보를 제공합니다. 제조사, 원산지, 주요 소재, 품질보증 기준 및 A/S 안내 등 필수 정보는 상세페이지 하단에서 확인하실 수 있으며, 정확한 정보를 제공하기 위해 노력하고 있습니다.';
const 판매자정보 =
  '본 상품은 해당 판매자가 직접 등록·관리하고 있으며, 판매자 상호, 대표자명, 사업자등록번호, 통신판매업 신고번호, 소재지 및 고객센터 연락처 등 필수 정보는 관련 법령에 따라 상세페이지 하단 ‘판매자 정보’에서 확인하실 수 있습니다.';

const ProductDetail = () => {
  const id = 1;

  const { data, isError, isLoading } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProduct(id),
  });

  const [cuttedIndex, setCuttedIndex] = useState(1);
  const handleMore = () => {
    setCuttedIndex(3);
  };

  const [tab, setTab] = useState('info');

  // 장바구니 담기
  const mutation = useMutation({
    mutationFn: (newItem: CartItem) => addToCart(newItem),
    onSuccess: (data) => {
      console.log('장바구니 담기 성공: ', data);
      alert('장바구니에 담겼습니다.');
    },
    onError: (error) => {
      console.error('장바구니 담기 실패: ', error);
      alert('장바구니 담기에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleAddToCart = (newItem: Product) => {
    mutation.mutate({
      id: newItem.id,
      브랜드명: newItem.브랜드명,
      상품명: newItem.상품명,
      가격: newItem.가격,
      할인율: newItem.할인율,
      이미지: newItem.이미지[0],
      수량: 1,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return <div>상품이 존재하지 않습니다.</div>;

  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className="flex-4">
          {/* <div className="w-full h-[500px] bg-Bgrey-40 mb-5">
            상품 이미지 캐러셀
          </div> */}
          <div className="">
            <TumbCarousel images={data.이미지} />
          </div>
          <div className="flex justify-between">
            <div onClick={() => setTab('info')}>상품정보</div>
            <div onClick={() => setTab('review')}>리뷰({data.리뷰.length})</div>
          </div>
          {tab === 'info' && (
            <div className="h-[400px] bg-Bgrey-40">
              상품 정보 이미지 + 텍스트
            </div>
          )}
          {tab === 'review' && (
            <ul className="space-y-4">
              {data.리뷰.map((item) => (
                <li className="w-full py-2 border-b flex gap-4" key={item?.id}>
                  <div className="flex flex-4 gap-2">
                    <div className="w-[40px] h-[40px] rounded-full">
                      <img src={item?.작성자프로필} />
                    </div>
                    <div className="flex flex-col gap-2">
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
                  <div className="relative flex-1">
                    <img src={item?.리뷰이미지[0]} />
                    <div className="absolute bottom-0 right-0 z-10 bg-Grey-70">
                      {item?.리뷰이미지.length}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-between">
            <div>상품문의({data.상품문의.length})</div>
            <div>더보기</div>
          </div>
          <div className="relative w-full">
            {data.상품문의.length > 0 &&
              data.상품문의.slice(0, cuttedIndex).map((item) => (
                <div className="flex" key={item?.id}>
                  <div>
                    <div>{item?.문의유형}</div>
                    <div>{item?.제목}</div>
                    <div>
                      <span>{item?.답변.완료 ? '답변완료' : ''}</span>{' '}
                      <span>{item?.작성자}</span>{' '}
                      <span>{item?.답변?.완료일}</span>
                    </div>
                  </div>
                </div>
              ))}
            {cuttedIndex < data.상품문의.length && (
              <div className="absolute bottom-[30%] right-[5%]">
                <button onClick={handleMore}>↓</button>
              </div>
            )}

            {data.상품문의.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10">
                <div>아직 등록된 상품 문의가 없습니다.</div>
              </div>
            )}
          </div>
          <div className="border py-2">판매자에게 문의하기</div>
          {/* <div>배송/교환/반품 안내</div> */}
          <DropdownInfo title="배송/교환/반품 안내" data={배송교환반품안내} />
          <DropdownInfo title="상품 고시 정보 안내" data={상품고시정보안내} />
          <DropdownInfo title="판매자 정보" data={판매자정보} />
        </div>
        <div className="flex flex-col gap-4 flex-3">
          <div>브랜드 명 {'>'}</div>
          <div>상품명</div>
          <div>⭐별점4.6 / 리뷰(6) </div>
          <div className="flex justify-between">
            <div>{data.할인율}%</div>
            <div className="line-through">{data.가격}</div>
            <div>{data.가격 - (data.가격 * data.할인율) / 100}원</div>
            {data.무료배송 && <div className="bg-Grey-10 px-2">무료배송</div>}
          </div>
          <div className="border py-2">쿠폰받기</div>
          {/* <div className="border py-2">선택옵션</div> */}
          <select className="border p-2">
            <option>선택옵션</option>
            {data.옵션.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <div>
            <div className="border py-2" onClick={() => handleAddToCart(data)}>
              장바구니 담기
            </div>
            <div className="border py-2">바로구매</div>
          </div>
          <div className="border py-2">Npay 구매</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
