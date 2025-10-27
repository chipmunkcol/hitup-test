import { TYPOGRAPHY } from '@/styles/typography';
import { Button } from 'antd';

const AddressInfoPortal = () => {
  return (
    <div>
      <div className="py-3 px-5">
        <button className="w-full border border-Grey-60 rounded-lg py-3 px-5 flex justify-center gap-3">
          <div>+</div>
          <div className={`${TYPOGRAPHY.Heading318Semi}`}>배송지 추가하기</div>
        </button>
      </div>
      <ul>
        <li className=" py-3 px-5">
          <div className=" rounded-xl border border-HITUP_Blue shadow-[0_0_8px_0_rgba(0,124,238,0.4)]">
            <div className="py-3 px-5 flex gap-5">
              <div>
                <input type="radio" checked />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <div className={`${TYPOGRAPHY.Heading124Bold}`}>김산호</div>
                  <div
                    className={`h-6 py-0.5 px-2 rounded-lg bg-Blue-10 text-HITUP_Blue ${TYPOGRAPHY.Subheading16Medium} flex justify-center items-center`}
                  >
                    기본 배송지
                  </div>
                </div>
                <div className=" flex flex-col gap-1">
                  <div className={`${TYPOGRAPHY.Heading318Medium}`}>
                    서울특별시 중구 청계천로 40, 822호
                  </div>
                  <div
                    className={`${TYPOGRAPHY.Subheading16Regular} text-Grey-70`}
                  >
                    010-0000-0000
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 self-center">
                <Button>수정</Button>
                <Button>삭제</Button>
              </div>
            </div>
          </div>
        </li>
        <li className=" py-3 px-5">
          <div className=" rounded-xl border border-Grey-60 shadow-[0_0_8px_0_rgba(0,0,0,0.4)]">
            <div className="py-3 px-5 flex gap-5">
              <div>
                <input type="radio" checked={false} />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className={`${TYPOGRAPHY.Heading124Bold}`}>김산호</div>
                <div className=" flex flex-col gap-1">
                  <div className={`${TYPOGRAPHY.Heading318Medium}`}>
                    서울특별시 중구 청계천로 40, 822호
                  </div>
                  <div
                    className={`${TYPOGRAPHY.Subheading16Regular} text-Grey-70`}
                  >
                    010-0000-0000
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 self-center">
                <Button>수정</Button>
                <Button>삭제</Button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div className="py-3 px-5">
        {/* <div className="w-full"> */}
        <Button style={{ width: '100%' }} type="primary">
          배송지 변경하기
        </Button>
        {/* </div> */}
      </div>
    </div>
    // </div>
  );
};
export default AddressInfoPortal;
