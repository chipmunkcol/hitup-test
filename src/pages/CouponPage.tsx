import { Button, Input } from 'antd';
import { addToCoupon, getCoupons } from '@/utils/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const CouponPage = () => {
  const { data: coupons } = useQuery({
    queryKey: ['coupons'],
    queryFn: getCoupons,
  });

  const [code, setCode] = useState('');

  const couponsCount = coupons ? coupons.length : 0;

  const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');
  const 남은일수 = (date: string) => {
    const endDate = new Date(date);
    const todayDate = new Date(today);
    const diffTime = endDate.getTime() - todayDate.getTime();
    return Math.ceil(diffTime / (1000 * 1 * 60 * 60 * 24)); // 일수 계산
  };

  const handleRegisterCoupon = () => {
    if (code.trim() === '') {
      alert('쿠폰 코드를 입력해주세요.');
      return;
    }

    const tempCode = '0123456789451234';
    mutation.mutate(tempCode);
  };

  // useMutate
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (code: string) => addToCoupon(code),
    onSuccess: () => {
      alert('쿠폰이 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error) => {
      alert('쿠폰 등록에 실패했습니다. 다시 시도해주세요. ' + error);
    },
  });

  return (
    <div className="max-w-2xl m-auto px-4 py-10">
      <div className="flex flex-col gap-4">
        <div className="text-xl">쿠폰 </div>
        <div className="px-6 ">
          <div className="flex flex-col gap-4">
            <div>쿠폰 등록</div>
            <div className="flex">
              <Input
                variant="underlined"
                placeholder="쿠폰 코드를 입력해주세요"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <div className="w-[100px]">
                <Button
                  onClick={handleRegisterCoupon}
                  type={code.trim() === '' ? 'default' : 'primary'}
                  disabled={code.trim() === ''}
                >
                  등록
                </Button>
              </div>
            </div>
          </div>

          <ul className="flex flex-col gap-4 py-8">
            <div>보유 쿠폰 {couponsCount}개</div>
            {coupons &&
              coupons.length > 0 &&
              coupons.map((coupon) => (
                <li
                  key={`보유쿠폰-${coupon?.id}`}
                  className="px-6 py-4 bg-Grey-20 rounded-xl"
                >
                  <div className="flex justify-between">
                    <div className="text-xl font-semibold">
                      {coupon?.할인율 > 0
                        ? `${coupon?.할인율}% 할인`
                        : `무료 배송`}
                    </div>
                    <div>{남은일수(coupon?.유효기간)}일 남음</div>
                  </div>
                  <div className="text-lg">
                    {coupon?.설명} {coupon?.할인율}% 쿠폰
                  </div>
                  {/* <div>DIAMOND등급 전상품 15% 쿠폰</div> */}
                  <div className="text-Grey-60">
                    {today} ~ {coupon.유효기간}
                  </div>
                  <div className="flex justify-between">
                    <div className="text-Grey-60">*{coupon.특이사항}</div>
                    <div>적용상품</div>
                  </div>
                </li>
              ))}
          </ul>
          <div>
            <div>쿠폰 유의사항</div>
            <div className="text-sm text-Grey-40 leading-6">
              할인중인 상품에도 쿠폰 적용이 가능합니다. <br />
              쿠폰은 주문 시 전체 주문의 결제금액이 아닌 개별 상품에만 적용이
              가능합니다. <br />
              할인쿠폰의 적용대상은 쿠폰마다 다르며 대상 상품은 변경될 수
              있습니다. <br />
              할인쿠폰은 정해진 기간에 따라 사전 고지 없이 변경 또는 종료될 수
              있습니다. <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponPage;
