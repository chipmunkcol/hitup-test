import PortalLayout from '@/components/common/layout/PortalLayout';
import type { Coupon } from '@/data/couponData';
import { TYPOGRAPHY } from '@/styles/typography';
import { useQuery } from '@tanstack/react-query';
import { Button, Radio } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { useDeliveryStore } from '../../store/useDeliveryStore';
import { getAddresses, getCart, getCoupons } from '../../utils/api/api';
import SelectCouponPortal from '@/components/common/modals/SelectCoupon';
import AddressInfoPortal from '@/components/common/modals/AddressInfo';

const PurchasePage = () => {
  const {
    data: CartItems,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const {
    brandItems,
    brandNames,
    브랜드별배송비,
    브랜드별총금액,
    주문상품금액,
    총결제금액,
    총배송비,
  } = useCart({ data: CartItems || [] });

  const { data: addresses } = useQuery({
    queryKey: ['addressses'],
    queryFn: getAddresses,
  });
  console.log('addresses: ', addresses);

  const { getSelectedAddress } = useDeliveryStore();
  const defaultAddress =
    addresses && (addresses.find((addr) => addr.기본배송지) || addresses[0]);
  const currentAddress = getSelectedAddress() || defaultAddress;

  // const deliveryAddress = useDeliveryStore((state) => state.address); // 배송지 상태 (구독)

  // const currentAddress = deliveryAddress ? deliveryAddress : defaultAddress;
  console.log('currentAddress: ', currentAddress);

  const handlePurchase = () => {
    // 필요한 데이터
    console.log('총결제금액 ', 총결제금액);
    console.log('배송지', currentAddress);
  };

  const navigate = useNavigate();

  const goProductDetail = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // const goAddress = () => {
  //   navigate('/address');
  // };

  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const goAddAddress = () => {
    navigate('/address/add');
  };

  const { data: coupons } = useQuery({
    queryKey: ['coupons'],
    queryFn: getCoupons,
  });
  console.log('coupons: ', coupons);

  const couponsCount = coupons ? coupons.length : 0;

  // 쿠폰 함수
  // const [couponPrice, setCouponPrice] = useState(0);

  const couponApply = (price: number, coupon: string | number) => {
    if (typeof coupon === 'string') {
      return parseInt(coupon, 10);
    } else if (typeof coupon === 'number') {
      return (price * coupon) / 100;
    }
  };

  // 결제 수단 선택
  const [paymentMethod, setPaymentMethod] = useState('card');
  console.log('paymentMethod: ', paymentMethod);

  // react portal
  const [isAddressPortalOpen, setIsAddressPortalOpen] = useState(false);
  console.log('isAddressPortalOpen: ', isAddressPortalOpen);
  const closePortal = () => {
    setIsPortalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!CartItems) return <div>결제할 제품이 없습니다</div>;

  return (
    // <div className="w-[500px] mx-auto flex flex-col gap-5 py-10">
    <div className="max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center">
        <div>주문/결제</div>
      </div>

      {isPortalOpen && (
        <PortalLayout title="쿠폰 선택" closePortal={closePortal}>
          <SelectCouponPortal coupons={coupons} closePortal={closePortal} />
        </PortalLayout>
      )}

      {/* 배송지 변경 포탈 */}
      {isAddressPortalOpen && (
        <PortalLayout
          title="배송지 변경"
          closePortal={() => setIsAddressPortalOpen(false)}
        >
          <AddressInfoPortal />
        </PortalLayout>
      )}

      {/* 배송지 */}
      <div>배송지</div>
      {addresses && addresses.length === 0 && (
        <div className="flex flex-col gap-4 p-4 border border-Grey-20">
          <div>등록 된 배송지가 없습니다.</div>
          <Button type="default" onClick={goAddAddress}>
            배송지 추가
          </Button>
        </div>
      )}

      {currentAddress && (
        <div className="flex items-center justify-center">
          <div className="p-5 w-[500px] border border-Grey-50 rounded-2xl">
            <div className="flex justify-between">
              <div>
                {currentAddress?.수령인} ({currentAddress?.배송지명})
              </div>
              <button
                onClick={() => setIsAddressPortalOpen(true)}
                className="border border-Grey-20 px-4 rounded-lg"
              >
                배송지 변경
              </button>
            </div>
            <div>{currentAddress?.연락처}</div>
            <div>
              {currentAddress?.주소} {currentAddress?.상세주소}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {/* 브랜드별 */}
        {brandNames.map((brand, index) => (
          <div className="bg-Grey-20 p-4" key={index}>
            <div>
              <div>브랜드: {brand}</div>
            </div>
            {/* 상품 목록 */}
            <ul className="flex flex-col gap-2">
              {brandItems[index]?.map((item) => {
                return (
                  <li
                    className="flex gap-2 bg-white py-4 px-2 rounded-md"
                    key={item.id}
                  >
                    <div className="w-full flex justify-between ">
                      <div className="flex gap-2">
                        <div
                          className="w-[150px] h-[150px] cursor-pointer"
                          onClick={() => goProductDetail(item?.id)}
                        >
                          <img
                            src="https://picsum.photos/200"
                            alt="상품 이미지"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                          <div>{item.상품명}</div>
                          <div>옵션: {item?.옵션}</div>
                          <div className="flex gap-2">
                            <div>
                              {(item.가격 - (item.가격 * item.할인율) / 100) *
                                item.수량}
                              원
                            </div>

                            <div
                              className={`${item.할인율 > 0 && 'line-through'} text-Grey-40`}
                            >
                              {item.가격}원/{item.수량}개
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-4">
                        {coupons && coupons.length > 0 && (
                          <div className="flex flex-col items-center gap-2">
                            <div>사용 가능 {couponsCount}장</div>
                            <Button
                              onClick={() => setIsPortalOpen(true)}
                              style={{ width: '150px' }}
                            >
                              쿠폰 선택
                            </Button>
                          </div>
                        )}
                        {item.쿠폰할인 && item.쿠폰할인 !== 0 && (
                          <div className="font-semibold">
                            -{couponApply(item.가격, item.쿠폰할인)}원 할인
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* 브랜드별 총 가격 */}
            <div className="flex flex-col  text-end  p-2">
              <div>
                <span>상품 {브랜드별총금액[index]}원</span>
                <span>+</span>
                <span>배송비 {브랜드별배송비[index]}원</span>
                <span>=</span>
                <span>{브랜드별총금액[index] + 브랜드별배송비[index]}원</span>
              </div>
              <div>(30,000원 이상 주문 시 무료배송)</div>
            </div>
          </div>
        ))}
        {/* 결제 수단 */}
        <Radio.Group
          defaultValue={'card'}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          options={[
            { value: 'card', label: '카드결제' },
            { value: 'naverpay', label: '네이버페이' },
          ]}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />

        {/* 결제 예상 금액 */}
        <div className="flex justify-between">
          <div>주문상품 금액 </div>
          <div>{주문상품금액} 원</div>
        </div>
        <div className="flex justify-between">
          <div>배송비 </div>
          <div>{총배송비} 원</div>
        </div>
        <div className="flex justify-between">
          <div>쿠폰 사용</div>
        </div>
        {/* 구분선 */}
        <div className="border-t border-Grey-20" />
        <div className="flex justify-between font-semibold text-lg">
          <div>총 결제 금액 </div>
          <div>{총결제금액} 원</div>
        </div>
      </div>

      {/* <div> */}
      <Button onClick={handlePurchase} type="primary">
        주문하기
      </Button>
      {/* </div> */}
    </div>
  );
};

export default PurchasePage;
