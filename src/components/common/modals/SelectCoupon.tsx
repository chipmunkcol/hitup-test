import type { Coupon } from '@/data/couponData';
import { TYPOGRAPHY } from '@/styles/typography';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface SelectCouponPortalProps {
  coupons: Coupon[] | undefined;
  closePortal: () => void;
}

const SelectCouponPortal = ({
  coupons,
  closePortal,
}: SelectCouponPortalProps) => {
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
    const updatedOptions = radioOptions.map((_, i) => ({
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
              <input type="radio" checked={radioOptions[index]?.checked} />
              <div>
                <div className={TYPOGRAPHY.Heading124Bold}>
                  {formatedCouponValueText(coupon)}
                </div>
                <div className={`mt-3 ${TYPOGRAPHY.Heading318Medium}`}>
                  [2025년 10월] {formatedCouponValueText(coupon)} 할인 쿠폰
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
        <Button onClick={handleApplyCoupon} className="flex-1" type="primary">
          쿠폰 적용
        </Button>
      </div>
    </div>
  );
};
export default SelectCouponPortal;
