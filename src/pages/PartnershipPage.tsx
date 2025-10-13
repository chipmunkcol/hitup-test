import Button from '@/components/common/Button';
import { Input } from 'antd';
import SkeletonInput from 'antd/es/skeleton/Input';

const PartnershipPage = () => {
  return (
    <div className="max-w-xl m-auto h-full py-10 flex flex-col gap-8">
      <div className="text-xl">입점/제휴 신청</div>

      <div>
        <label>상호명</label>

        <Input
          placeholder="사업자등록증에 기재된 상호명을 기재해주세요"
          variant="underlined"
          style={{
            paddingLeft: 0,
          }}
        />
      </div>
      <div>
        <label className="block">브랜드명(국문,영문)</label>
        <Input
          placeholder="브랜드명을 국문,영문으로 함께 입력해주세요"
          variant="underlined"
          style={{
            paddingLeft: 0,
          }}
        />
      </div>
      <div>
        <label>담당자명</label>
        <Input
          placeholder="담당자 성함을 입력해주세요"
          variant="underlined"
          style={{
            paddingLeft: 0,
          }}
        />
      </div>
      <div>
        <label>담당자 이메일</label>
        <Input
          placeholder="담당자 이메일을 입력해주세요"
          variant="underlined"
          style={{
            paddingLeft: 0,
          }}
        />
      </div>
      <div>
        <label>담당자 연락처</label>
        <Input
          placeholder="담당자 연락처를 입력해주세요"
          variant="underlined"
          style={{
            paddingLeft: 0,
          }}
        />
      </div>
      <div>
        <label>신청 내용</label>
        <Input
          placeholder="내용을 입력해주세요"
          variant="underlined"
          style={{
            paddingLeft: 0,
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="border rounded-lg py-4 px-2 text-sm">
          수집·이용목적 : (주)산호오션테크의 입점/제휴에 대한 신청을 위한 사용자
          정보 수집 및 이용 <br />
          개인정보 수집 항목 : 상호명, 브랜드명(국문,영문), 이름, 이메일,
          연락처, 연령대, 이메일, 신청 내용
          <br />
          개인정보 보유 및 이용기간 : 시설 이용 후 3년간 정보 보관
          <br />
          동의거부권 및 불이익 : <br />
          이용 신청자는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
          단, 동의 거부 시에는 (주)산호오션테크 입점/제휴 신청이 제한 될 수
          있습니다.
        </div>
        <div className="flex gap-2">
          <input type="checkbox" id="personal-info" />
          <label htmlFor="personal-info">개인정보수집동의</label>
        </div>
      </div>
      <div>
        <Button variant="grey">신청하기</Button>
      </div>
    </div>
  );
};

export default PartnershipPage;
