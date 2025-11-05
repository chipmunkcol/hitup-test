import { useNavi } from '@/hooks/useNavi';
import { useFindAuthStore } from '@/store/partner/useFindAuthStore';
import { Button } from 'antd';

const FindIdFound = () => {
  const { id } = useFindAuthStore();
  const { goPartnerFindPassword } = useNavi();

  return (
    <div className="max-w-sm mx-auto pt-10">
      <div>
        <h1 className="py-6 text-2xl">아이디 찾기</h1>
        <div>고객님의 정보와 일치하는 아이디입니다.</div>
      </div>

      <div className="py-10">
        <div>아이디: {id}</div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1" type="primary">
          로그인하기
        </Button>
        <Button onClick={goPartnerFindPassword} className="flex-1">
          비밀번호 찾기
        </Button>
      </div>
    </div>
  );
};

export default FindIdFound;
