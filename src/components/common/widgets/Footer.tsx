import { TYPOGRAPHY } from '../../../styles/typography';

const Footer = () => {
  return (
    <footer className="w-full max-w-[1280px] py-[40px] h-[236px] flex justify-center gap-[100px] bg-Grey-10">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-[12px]">
          <div className={TYPOGRAPHY.Subheading16Bold}>고객 센터</div>
          <div className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Regular}`}>
            히트업 직접 배송 주문건 상담
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className={TYPOGRAPHY.Subheading16Bold}>
            카톡 상담 (평일 10:00 ~ 17:00)
          </div>
          <div className={TYPOGRAPHY.Subheading16Bold}>이메일 문의</div>
        </div>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className={TYPOGRAPHY.Subheading16Bold}>입점 | 제휴문의</div>
        <div className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Medium}`}>
          이용약관
        </div>
        <div className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Medium}`}>
          개인정보 처리 방침
        </div>
        <div className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Medium}`}>
          환불정책
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex gap-[10px]">
          <div className={`w-[256px] ${TYPOGRAPHY.Subheading16Bold}`}>
            (주) 산호오션테크
          </div>
          <div className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Bold}`}>
            대표이사 : 박교열
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className=" flex justify-between">
            <div className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Medium}`}>
              사업자 등록번호: 530-81-02115
            </div>
            <div className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Bold}`}>
              사업자 정보 확인
            </div>
          </div>
          <div className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Medium}`}>
            주소 : 서울특별시 중구 청계천로 40 8층, 822호
          </div>
          <div className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Medium}`}>
            통신판매업 신고번호 : 0000000000{' '}
          </div>
          <div className={`text-Grey-70 ${TYPOGRAPHY.Subheading16Medium}`}>
            {' '}
            이메일 : rancho@the-hitup.com
          </div>
        </div>
      </div>
      <div>Figma 진행중 </div>
    </footer>
  );
};

export default Footer;
