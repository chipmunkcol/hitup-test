import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { useDeliveryStore } from '../../store/useDeliveryStore';
import {
  getAddresses,
  getAvailableCoupons,
  getCart,
  getCoupons,
} from '../../utils/api/api';
import { Button, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TYPOGRAPHY } from '@/styles/typography';
import type { Coupon } from '@/data/couponData';
import dayjs from 'dayjs';

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

  const goAddress = () => {
    navigate('/address');
  };

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
  const [isPortalOpen, setIsPortalOpen] = useState(false);
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

      {isPortalOpen &&
        createPortal(
          <TestPortal coupons={coupons} closePortal={closePortal} />,
          document.body
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
                onClick={goAddress}
                className="border border-Grey-20 px-4 rounded-lg"
              >
                변경
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

interface TestPortalProps {
  coupons: Coupon[] | undefined;
  closePortal: () => void;
}

const TestPortal = ({ coupons, closePortal }: TestPortalProps) => {
  const formatedCouponValueText = (coupon: Coupon) => {
    if (coupon.할인?.타입 === '정액') {
      return `${coupon.할인.값}원`;
    } else {
      return `${coupon.할인.값}%`;
    }
  };

  const [radioOptions, setRadioOptions] = useState<{ checked: boolean }[]>([]);
  useEffect(() => {
    if (!coupons) return;
    const initialOptions = Array.from({ length: coupons.length }, () => ({
      checked: false,
    }));
    setRadioOptions(initialOptions);
  }, [coupons]);

  const onChangeRadio = (index: number) => {
    const updatedOptions = radioOptions.map((option, i) => ({
      checked: i === index,
    }));
    setRadioOptions(updatedOptions);
  };

  const handleApplyCoupon = () => {
    const checkedCouponIndex = radioOptions.findIndex(
      (option) => option.checked
    );
    console.log('적용할 쿠폰 인덱스: ', checkedCouponIndex);
  };

  if (!coupons) return <div>쿠폰 불러오는중 ...</div>;
  return (
    <div
      className="z-[1000] w-full h-full fixed inset-0 flex justify-center items-start"
      style={{ background: 'rgba(0, 0, 0, 0.25)' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  max-w-[720px] mx-auto">
        <div className="border border-Grey-20 bg-Grey-05 rounded-2xl flex flex-col justify-center">
          <div className="w-full py-4 px-5 bg-Blue-05 rounded-t-2xl flex justify-between items-center">
            <h1>쿠폰 선택</h1>
            <div className="cursor-pointer" onClick={closePortal}>
              X
            </div>
          </div>
          <div className="px-5">
            <div className="py-4">사용 가능한 쿠폰</div>
            <div>
              할인 쿠폰은 브랜드당 1회만 사용 가능하며, 장바구니 상품 중 하나의
              브랜드에만 적용됩니다.
            </div>
            <ul className="w-full py-3 flex flex-col gap-6">
              {coupons.length === 0 && <div>사용 가능한 쿠폰이 없습니다.</div>}
              {coupons.length > 0 &&
                coupons.map((coupon, index) => (
                  <li
                    onClick={() => onChangeRadio(index)}
                    className="py-4 px-5 flex gap-5 rounded-xl border border-Grey-60 shadow-[0_0_8px_0_rgba(0,0,0,0.40)]"
                  >
                    <input
                      type="radio"
                      checked={radioOptions[index]?.checked}
                    />
                    <div>
                      <div className={TYPOGRAPHY.Heading124Bold}>
                        {formatedCouponValueText(coupon)}
                      </div>
                      <div className={`mt-3 ${TYPOGRAPHY.Heading318Medium}`}>
                        [2025년 10월] {formatedCouponValueText(coupon)} 할인
                        쿠폰
                      </div>
                      <div
                        className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Regular}`}
                      >
                        일부 브랜드 상품 제외
                      </div>
                      <div
                        className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Regular}`}
                      >
                        {coupon.특이사항}
                      </div>
                      <div className="flex gap-4 mt-3">
                        <div
                          className={`${TYPOGRAPHY.Subheading16Bold} text-HITUP_Blue`}
                        >
                          {/* 남은일자 구해주자 */}
                          {dayjs(coupon.유효기간).diff(dayjs(), 'day')} 일 남음
                        </div>
                        <div
                          className={`${TYPOGRAPHY.Subheading16Medium} text-Grey-70`}
                        >
                          {coupon.유효기간} 까지 사용 가능
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            <div className="flex gap-4 py-4">
              <Button onClick={closePortal} className="flex-1">
                선택 안함
              </Button>
              <Button
                onClick={handleApplyCoupon}
                className="flex-1"
                type="primary"
              >
                쿠폰 적용
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
