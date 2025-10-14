import { useState } from 'react';
import DropdownInfo from '@/components/common/widgets/DropdownInfo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addToCart, getProduct } from '@/utils/api/api';
import type { CartItem } from '@/data/CartData';
import type { Product } from '@/data/productDetailData';
import { TumbCarousel } from '@/components/common/libs/carousel/TumbCarousel';
import Button from '@/components/common/Button';
import { swalConfirm } from '@/components/common/libs/sweetalert/sweetalert';
import { useNavigate } from 'react-router-dom';

const 배송교환반품안내 =
  '고객님께서 주문하신 상품은 결제 완료 후 순차 발송되며, 배송은 평균 2~3일 소요됩니다. 상품에 하자가 있거나 단순 변심으로 인한 교환·반품은 수령 후 7일 이내 고객센터를 통해 접수해 주셔야 하며, 단순 변심의 경우 왕복 배송비가 발생할 수 있습니다.';
const 상품고시정보안내 =
  '본 상품은 전자상거래법 및 관련 법률에 따른 상품 고시 정보를 제공합니다. 제조사, 원산지, 주요 소재, 품질보증 기준 및 A/S 안내 등 필수 정보는 상세페이지 하단에서 확인하실 수 있으며, 정확한 정보를 제공하기 위해 노력하고 있습니다.';
const 판매자정보 =
  '본 상품은 해당 판매자가 직접 등록·관리하고 있으며, 판매자 상호, 대표자명, 사업자등록번호, 통신판매업 신고번호, 소재지 및 고객센터 연락처 등 필수 정보는 관련 법령에 따라 상세페이지 하단 ‘판매자 정보’에서 확인하실 수 있습니다.';

const id = 1;
const ProductDetail = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProduct(id),
  });

  const [cuttedIndex, setCuttedIndex] = useState(1);
  const handleMore = () => {
    setCuttedIndex(3);
  };

  // 옵션 클릭 시 선택 항목이 보이도록
  const [selectedOption, setSelectedOption] = useState<
    { name: string; quantity: number }[]
  >([]);
  const handleOptionChange = (option: string) => {
    const existingOption = selectedOption.find((item) => item.name === option);
    if (existingOption) {
      setSelectedOption((prev) =>
        prev.map((item) =>
          item.name === option ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setSelectedOption((prev) => [...prev, { name: option, quantity: 1 }]);
    }
  };

  const addOptionQuantity = (option: string) => {
    setSelectedOption((prev) =>
      prev.map((item) =>
        item.name === option ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const subtractOptionQuantity = (option: string) => {
    const isLastItem =
      selectedOption.find((item) => item.name === option)?.quantity === 1;
    if (isLastItem) {
      setSelectedOption((prev) => prev.filter((item) => item.name !== option));
      return;
    }

    setSelectedOption((prev) =>
      prev.map((item) =>
        item.name === option ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeOption = (option: string) => {
    setSelectedOption((prev) => prev.filter((item) => item.name !== option));
  };

  const [tab, setTab] = useState('info');

  // 장바구니 담기
  const mutation = useMutation({
    mutationFn: (newItem: CartItem) => addToCart(newItem),
    onSuccess: async (data) => {
      console.log('data: ', data);
      const res_confirm = await swalConfirm(
        '장바구니',
        `<div>선택한 상품이 장바구니에 담겼어요<br />
      장바구니로 이동하시겠어요?</div>`,
        '네',
        '더 둘러보기'
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
      옵션: selectedOption.map((item) => item.name).join(', '), // 선택한 옵션들을 ,로 구분하여 문자열로 넘겨줄듯
      수량: 1,
    });
  };

  const goContactSeller = (productId: number) => {
    navigate(`/product/${productId}/contact/add`);
  };

  const goContactHistory = () => {
    navigate(`/product/${id}/contacts`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return <div>상품이 존재하지 않습니다.</div>;
  console.log('data: ', data);

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
          <div className="flex justify-between px-15 py-5 text-2xl">
            <div className="cursor-pointer" onClick={() => setTab('info')}>
              상품정보
            </div>
            <div className="cursor-pointer" onClick={() => setTab('review')}>
              리뷰({data?.리뷰?.length})
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
          <div className="flex justify-between text-xl py-5">
            <div>상품문의({data?.상품문의?.length})</div>
            <div className="cursor-pointer" onClick={goContactHistory}>
              더 보기
            </div>
          </div>
          <div className="relative w-full">
            {data.상품문의?.length > 0 &&
              data.상품문의?.slice(0, cuttedIndex).map((item) => (
                <div className="flex px-5  " key={item?.id}>
                  <div
                    className={`w-full py-3 ${cuttedIndex === 1 ? '' : 'border-b border-Grey-40'}`}
                  >
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
              <div className="absolute bottom-[30%] right-[4%]">
                <button onClick={handleMore}>↓</button>
              </div>
            )}

            {data.상품문의.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10">
                <div>아직 등록된 상품 문의가 없습니다.</div>
              </div>
            )}
          </div>
          <div className="px-4 py-4">
            <Button onClick={() => goContactSeller(data.id)} variant="default">
              판매자에게 문의하기
            </Button>
          </div>
          {/* <div>배송/교환/반품 안내</div> */}
          <DropdownInfo title="배송/교환/반품 안내" data={배송교환반품안내} />
          <DropdownInfo title="상품 고시 정보 안내" data={상품고시정보안내} />
          <DropdownInfo title="판매자 정보" data={판매자정보} />
        </div>
        <div className="flex flex-col gap-4 flex-3">
          <div className="text-xl font-semibold">브랜드 명 {'>'}</div>
          <div>상품명상품명상품명</div>
          <div>⭐별점4.6 / 리뷰(6) </div>
          <div className="flex justify-between">
            <div className="text-2xl text-HITUP_Red">{data.할인율}%</div>
            <div>
              <div className="flex gap-2">
                <div className="line-through">{data.가격}원</div>
                <div>{data.가격 - (data.가격 * data.할인율) / 100}원</div>
              </div>
              {data.무료배송 && (
                <div className="bg-Grey-10 px-2 items-end">무료배송</div>
              )}
            </div>
          </div>
          <Button variant="grey">쿠폰받기</Button>
          {/* <div className="border py-2">선택옵션</div> */}
          <select
            className="border border-Bgrey-30 rounded-lg p-2 "
            onChange={(e) => handleOptionChange(e.target.value)}
          >
            <option>선택옵션</option>
            {data.옵션.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          {selectedOption.length > 0 &&
            selectedOption.map((selectedOption) => (
              <div className="border border-Bgrey-30 rounded-lg p-2">
                <div className="flex justify-between">
                  <div className="font-semibold">{selectedOption.name}</div>
                  <div onClick={() => removeOption(selectedOption.name)}>X</div>
                </div>
                <div className="flex justify-between">
                  <div className="flex">
                    <button
                      onClick={() =>
                        subtractOptionQuantity(selectedOption.name)
                      }
                      className="border px-2"
                    >
                      -
                    </button>
                    <div>{selectedOption.quantity}</div>
                    <button
                      onClick={() => addOptionQuantity(selectedOption.name)}
                      className="border px-2"
                    >
                      +
                    </button>
                  </div>
                  <div>가격가격 가격</div>
                </div>
              </div>
            ))}
          <div className="flex gap-2">
            <Button variant="default" onClick={() => handleAddToCart(data)}>
              장바구니 담기
            </Button>
            <Button variant="grey">바로구매</Button>
          </div>
          <div className="border py-2">Npay 구매</div>
          <hr />
          <div className="text-lg font-semibold">브랜드 배송 정보</div>
          <div>14시 이내 결제 주문건 당일 출고 우체국 택배</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
