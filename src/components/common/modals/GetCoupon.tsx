import lineDashed from '@/assets/images/lineDashed.jpg';

import { TYPOGRAPHY } from '@/styles/typography';
import Button from '@/components/common/Button';

const GetCouponPortal = () => {
  return (
    <div className="px-5 rounded-b-2xl bg-Grey-05 ">
      <ul className="py-3 flex flex-col gap-6">
        <li className="py-4 px-5 flex  justify-between rounded-xl border border-Grey-60 shadow-[0_0_8px_0_rgba(0,0,0,0.40)]">
          <div className="flex flex-col gap-5">
            <div className={`${TYPOGRAPHY.Heading124Bold} text-HITUP_Blue`}>
              20% 할인
            </div>
            <div className="flex flex-col gap-2">
              <div className={`${TYPOGRAPHY.Heading318Medium}`}>
                PLATINUM 등급 전상품 20% 할인 쿠폰
              </div>
              <div className={`${TYPOGRAPHY.Body14Semi} text-Grey-70`}>
                2025. 11. 20일까지 사용가능
              </div>
              <div className={`${TYPOGRAPHY.Subheading16Regular} text-Grey-70`}>
                최대 할인 가능 금액 : 20,000원
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-center gap-5">
            <img src={lineDashed} />
            <div className="flex flex-col items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                  fill="#007CEE"
                />
              </svg>
              <div className={`${TYPOGRAPHY.Heading318Bold} text-HITUP_Blue`}>
                쿠폰 받기
              </div>
            </div>
          </div>
        </li>
        <li className="py-4 px-5 flex  justify-between rounded-xl border border-Grey-60 shadow-[0_0_8px_0_rgba(0,0,0,0.40)]">
          <div className="flex flex-col gap-5">
            <div className={`${TYPOGRAPHY.Heading124Bold} text-HITUP_Blue`}>
              20% 할인
            </div>
            <div className="flex flex-col gap-2">
              <div className={`${TYPOGRAPHY.Heading318Medium}`}>
                PLATINUM 등급 전상품 20% 할인 쿠폰
              </div>
              <div className={`${TYPOGRAPHY.Body14Semi} text-Grey-70`}>
                2025. 11. 20일까지 사용가능
              </div>
              <div className={`${TYPOGRAPHY.Subheading16Regular} text-Grey-70`}>
                최대 할인 가능 금액 : 20,000원
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-center gap-5">
            <img src={lineDashed} />
            <div className="flex flex-col items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                  fill="#007CEE"
                />
              </svg>
              <div className={`${TYPOGRAPHY.Heading318Bold} text-HITUP_Blue`}>
                쿠폰 받기
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div className="py-4">
        <Button className={`${TYPOGRAPHY.Heading318Bold}`} variant="blue">
          쿠폰 한번에 받기
        </Button>
      </div>
    </div>
  );
};

export default GetCouponPortal;
