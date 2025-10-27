import { TYPOGRAPHY } from '@/styles/typography';
import Button from '../Button';

const PurchaseItemCard = () => {
  return (
    <div className="border border-Grey-60 rounded-[20px]">
      <div
        className={`py-3 px-5  border-b border-b-Grey-60 text-HITUP_Blue ${TYPOGRAPHY.Heading222Bold}`}
      >
        배송중
      </div>
      <div className="py-3 px-5 flex gap-5">
        <div className="w-[120px] h-[120px] bg-Grey-10 ">
          <img />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-2">
            <div className="flex gap-5">
              <div className={`flex-1 ${TYPOGRAPHY.Heading318Bold}`}>
                아부가르시아
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className={`${TYPOGRAPHY.Subheading16Bold}`}>
                아부가르시아 슈퍼맥스 S 파워핸들
              </div>
              <div className={`${TYPOGRAPHY.Subheading16Medium} text-Grey-70`}>
                옵션: 옵션1
              </div>
            </div>
            <div>98,000원</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <Button variant="default">배송 현황 조회</Button>
          <Button variant="default">상품 교환 후기</Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItemCard;
