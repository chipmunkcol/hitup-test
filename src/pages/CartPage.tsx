import OptionPlusMinusBtn from '@/components/atoms/OptionPlusMinusBtn';
import SelectBox from '@/components/atoms/SelectBox';
import { TYPOGRAPHY } from '@/styles/typography';
import { alertComingSoon } from '@/utils/function';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import useCart from '../hooks/useCart';
import { getAddresses, getAvailableCoupons, getCart } from '../utils/api/api';
import Loading from './common/Loading';
import { useNavi } from '@/hooks/useNavi';

const CartPage = () => {
  const {
    data: CartItems,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const { data: availableCoupons } = useQuery({
    queryKey: ['coupons-available'],
    queryFn: getAvailableCoupons,
  });
  console.log('availableCoupons: ', availableCoupons);

  const {
    allChecked,
    brandItems,
    brandNames,
    toggleAll,
    toggleItem,
    브랜드별배송비,
    // 총선택상품금액,
    총결제금액,
    총상품금액,
    총할인금액,
    총배송비,
    handleRemoveCartItem,
  } = useCart({ data: CartItems || [] });

  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    refetch: refetchAddresses,
  } = useQuery({
    queryKey: ['addressses'],
    queryFn: getAddresses,
    enabled: false, // 자동 실행 방지
  });
  console.log('addresses: ', addresses);

  const [isLoadingRefetch, setIsLoadingRefetch] = useState(false);
  const { goAddAddress, goPurchase } = useNavi();
  const handlePurchase = async () => {
    // refetch 돌리면 query에서 받아오는 data가 undefined 되어서 아래 로직 실행x
    setIsLoadingRefetch(true);
    const { data: refreshedAddresses } = await refetchAddresses();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('addresses: ', refreshedAddresses);
    if (refreshedAddresses && refreshedAddresses?.length === 0) {
      const res = confirm('등록 된 배송지가 없습니다');
      if (res) {
        goAddAddress();
      }
    }

    if (refreshedAddresses && refreshedAddresses?.length > 0) {
      goPurchase();
    }

    setIsLoadingRefetch(false);
  };

  // const getCoupon = async () => {
  //   if (!availableCoupons) return;

  //   if (availableCoupons?.length === 0) {
  //     return alert('발급 가능한 쿠폰이 없습니다.');
  //   }
  //   // availableCoupons 중에서 코드값이 있다고 가정
  //   // const couponCode = availableCoupons;
  //   const couponCode = 'TEMP20251021';
  //   // post 쿠폰 받기 API 호출
  //   getCouponMutate(couponCode);
  // };

  // const [, setCouponBtnText] = useState('쿠폰 받기');

  // const queryClient = useQueryClient();
  // const { mutate: getCouponMutate } = useMutation({
  //   mutationFn: (code: string) => addToAvailableCoupon(code),
  //   onSuccess: () => {
  //     alert('쿠폰이 발급되었습니다.');
  //     queryClient.invalidateQueries({ queryKey: ['coupons-available'] });
  //     setCouponBtnText('쿠폰 받기 완료');
  //   },
  // });

  if (isLoading || isLoadingAddresses || isLoadingRefetch) return <Loading />;
  if (isError) return <div>Error...</div>;

  return (
    <div className="max-w-7xl mask-auto">
      <div className="">
        <div className={`bg-Blue-05 ${TYPOGRAPHY.Heading28Bold} p-5`}>
          장바구니
        </div>
        <div className="bg-Blue-05 px-5 py-3 flex justify-between">
          <div className="flex gap-4 items-center">
            <input
              className="w-[18px]"
              type="checkbox"
              checked={allChecked}
              onChange={(e) => toggleAll(e.target.checked)}
            />
            <div className={`${TYPOGRAPHY.Heading124Bold}`}>전체 선택</div>
          </div>
          <div className="w-auto">
            <div className={`${TYPOGRAPHY.Heading318Bold}`}>선택 삭제</div>
          </div>
        </div>
        {/* 장바구니 상품 */}
        <div className="">
          {/* 브랜드별 */}
          {brandNames.length === 0 && (
            <div className="py-6 text-center text-xl">
              장바구니에 담긴 상품이 없습니다.
            </div>
          )}

          {brandNames.map((brand, index) => (
            <div className="" key={index}>
              <div className="px-5 py-3 bg-Grey-10 flex justify-between items-center">
                <div className={`${TYPOGRAPHY.Heading222Bold}`}>{brand}</div>
                <div>
                  <Button variant="blue" onClick={alertComingSoon}>
                    쿠폰 받기
                  </Button>
                </div>

                {/*
                  <input
                    type="checkbox"
                    checked={brandChecked(brand)}
                    onChange={(e) => toggleBrand(brand, e.target.checked)}
                  /> */}
              </div>
              {/* 상품 목록 */}
              <ul className="">
                {brandItems[index]?.map((item) => {
                  return (
                    <li className="py-3 px-5" key={item.id}>
                      {/* <div className=" flex gap-4"></div> */}
                      <div className="border border-Grey-60 rounded-[20px] px-4 py-5 flex gap-4  ">
                        <div>
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={(e) =>
                              toggleItem(item.id, e.target.checked)
                            }
                          />
                        </div>
                        <div className="">
                          <div
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="w-[140px] h-[140px]"
                          >
                            <img
                              src="https://picsum.photos/200"
                              alt="상품 이미지"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* 상품 소개 */}
                        <div className="flex-1 flex flex-col gap-5">
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-5">
                              <div
                                className={`flex-1 ${TYPOGRAPHY.Heading318Bold}`}
                              >
                                {item.브랜드명}
                              </div>
                              <div
                                onClick={() => handleRemoveCartItem(item.id)}
                                className="cursor-pointer"
                              >
                                X
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className={`${TYPOGRAPHY.Subheading16Bold}`}>
                                {item.상품명}
                              </div>
                              <div
                                className={`${TYPOGRAPHY.Subheading16Medium} text-Grey-70`}
                              >
                                옵션: 옵션1
                              </div>
                            </div>
                          </div>
                          <div className="w-full">
                            <SelectBox
                              placeholder="수량 선택"
                              options={[
                                { value: '1', label: '1개', price: item.가격 },
                                {
                                  value: '2',
                                  label: '2개',
                                  price: item.가격 * 2,
                                },
                                {
                                  value: '3',
                                  label: '3개',
                                  price: item.가격 * 3,
                                },
                              ]}
                            />
                          </div>
                          <div className="flex justify-between">
                            <div className="w-[100px]">
                              <OptionPlusMinusBtn quantity={1} />
                            </div>
                            <div className="flex gap-5">
                              <div className="flex gap-2">
                                <div
                                  className={`text-HITUP_Red ${TYPOGRAPHY.Heading318Bold}`}
                                >
                                  {' '}
                                  10%
                                </div>
                                <div
                                  className={`line-through text-Grey-60 ${TYPOGRAPHY.Subheading16Medium}`}
                                >
                                  89,000 원
                                </div>
                              </div>
                              <div
                                className={`text-HITUP_Blue ${TYPOGRAPHY.Heading318Bold}`}
                              >
                                80,000원
                              </div>
                            </div>
                          </div>
                          {/* <div className="w-[300px] border border-Grey-20 px-2 rounded-md flex items-center justify-between">
                              <button
                                onClick={() =>
                                  handleUpdateCartItem.decrease(item)
                                }
                                className="cursor-pointer"
                              >
                                -
                              </button>
                              <span>{item.수량}</span>
                              <button
                                onClick={() =>
                                  handleUpdateCartItem.increase(item)
                                }
                                className="cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <div className="flex gap-2">
                              {item.할인율 > 0 && (
                                <div className="text-HITUP_Red">
                                  {item.할인율}%
                                </div>
                              )}
                              {item.할인율 > 0 && (
                                <div className={'line-through text-Grey-40'}>
                                  {item.가격}원
                                </div>
                              )}
                              <div>
                                {item.가격 - (item.가격 * item.할인율) / 100}원
                              </div>
                            </div> */}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* 결제 예상 금액 */}
          <div className={`px-5 py-4 bg-Grey-10 ${TYPOGRAPHY.Heading222Bold}`}>
            결제 예상 금액
          </div>
          <div className="p-5 flex flex-col gap-5">
            <div className="flex justify-between">
              <div className={`${TYPOGRAPHY.Heading222Medium}`}>
                총 선택 상품 금액
              </div>
              <div className={`${TYPOGRAPHY.Heading318Bold}`}>
                {총상품금액} 원
              </div>
            </div>

            <div className="flex justify-between">
              <div className={`${TYPOGRAPHY.Heading222Medium}`}>
                상품 할인 금액
              </div>
              <div className={`text-HITUP_Red ${TYPOGRAPHY.Heading318Bold}`}>
                -{총할인금액} 원
              </div>
            </div>

            <div className="flex justify-between">
              <div className={`${TYPOGRAPHY.Heading222Medium}`}>
                쿠폰 할인 적용 시
              </div>
              <div className={`text-HITUP_Blue ${TYPOGRAPHY.Heading318Bold}`}>
                {/* -{총할인금액} 원 */}
                -0 원
              </div>
            </div>

            {/* 쿠폰 메시지 */}
            <div className="flex justify-end">
              <span
                className={`text-HITUP_Blue ${TYPOGRAPHY.Heading318Medium}`}
              >
                쿠폰은 주문/결제할 때 사용 가능합니다.{' '}
              </span>
            </div>

            <div className="flex justify-between">
              <div className={`${TYPOGRAPHY.Heading222Medium}`}>
                최종 배송비
              </div>
              <div className={`${TYPOGRAPHY.Heading318Bold}`}>
                {총배송비} 원
              </div>
            </div>

            <ul className="flex flex-col gap-5">
              {brandNames.map((_, index) => (
                <>
                  <li
                    className="text-Grey-70 flex justify-between"
                    key={`cartPage-배송비-brands-${index}`}
                  >
                    {/* <div>• &nbsp; &nbsp; {brandName}</div> */}
                    <div>• &nbsp; &nbsp; 아부가르시아</div>
                    <div>{브랜드별배송비[index]}원</div>
                  </li>
                  <li
                    className="text-Grey-70 flex justify-between"
                    key={`cartPage-배송비-brands-${index}`}
                  >
                    {/* <div>• &nbsp; &nbsp; {brandName}</div> */}
                    <div>• &nbsp; &nbsp; 시마노</div>
                    <div>{브랜드별배송비[index]}원</div>
                  </li>
                </>
              ))}
            </ul>

            {/* 구분선 */}
            <hr className="border border-Grey-30" />

            <div className="flex justify-between">
              <div className={`${TYPOGRAPHY.Heading222Bold}`}>총 결제 금액</div>
              <div className={`${TYPOGRAPHY.Heading318Bold}`}>
                {총결제금액} 원
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 px-5">
          <Button onClick={handlePurchase} variant="blue">
            {총결제금액 || 0}원 주문하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

{
  /* <Button
              props={{
                disabled: couponBtnText === '쿠폰 받기 완료' ? true : false,
              }}
              onClick={getCoupon}
              variant="grey"
            >
              {couponBtnText}
            </Button> */
}
