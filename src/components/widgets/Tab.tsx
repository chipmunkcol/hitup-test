import { TYPOGRAPHY } from '../../styles/typography';

const Tab = () => {
  return (
    <div className="px-[20px] flex justify-start gap-[20px]">
      <div className=" flex flex-col  gap-[8px]">
        <div
          className={`w-[20px] flex justify-center ${TYPOGRAPHY.Subheading16Medium}`}
        >
          홈
        </div>
        <div className="border-b-2 border-black"> </div>
      </div>
      <div className={`text-Grey-60 ${TYPOGRAPHY.Subheading16Medium}`}>
        신상품
      </div>
      <div>베스트</div>
    </div>
  );
};

export default Tab;
