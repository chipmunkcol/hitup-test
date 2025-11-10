import { useNavi } from '@/hooks/useNavi';
import { Button } from 'antd';

const TempNaviHeader = () => {
  const { goHome, goPartnerLogin, goAddProduct } = useNavi();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Button onClick={goHome}>커머스 바로가기</Button>
      <Button onClick={goPartnerLogin}>파트너스 로그인 바로가기</Button>
      <Button onClick={goAddProduct}>파트너스 상품등록 바로가기</Button>
    </div>
  );
};

export default TempNaviHeader;
