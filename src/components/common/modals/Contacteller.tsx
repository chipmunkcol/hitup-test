import Button from '@/components/atoms/MyButton';
import { TYPOGRAPHY } from '@/styles/typography';
import SelectboxCheck from '../widgets/SelectboxCheck';
import Input from '../../atoms/Input';

interface ContactSellerPortalProps {
  closePortal: () => void;
}

const ContactSellerPortal = ({ closePortal }: ContactSellerPortalProps) => {
  return (
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
        <div className={`w-[78px] ${TYPOGRAPHY.Heading222Semi}`}>문의 유형</div>
        <div className="flex-1">
          <SelectboxCheck placeholder="문의 유형을 선택해주세요" />
        </div>
      </div>
      {/* border-svg */}
      <DividerSvg />
      <div className="py-2 flex items-center gap-7">
        <div className={`w-[78px] ${TYPOGRAPHY.Heading222Semi}`}>제목</div>
        <div className="flex-1">
          <Input placeholder="제목을 입력해주세요." />
        </div>
      </div>

      {/* border-svg */}
      <DividerSvg />
      <div className="py-3 flex justify-between">
        <div className={`w-[78px] ${TYPOGRAPHY.Heading222Semi}`}>문의 내용</div>
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
        <div className={`py-4 ${TYPOGRAPHY.Heading222Semi}`}>사진 첨부</div>
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
export default ContactSellerPortal;
