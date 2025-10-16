import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const goAddress = () => {
    navigate('/address');
  };

  const goPartnership = () => {
    navigate('/partnership');
  };

  const goCoupon = () => {
    navigate('/coupon');
  };

  const goPurchaseHistory = () => {
    navigate('/purchase/history');
  };

  return (
    <div className="max-w-2xl m-auto px-4 py-10">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 px-16">
          <div className="w-[60px] h-[60px] rounded-full bg-Bgrey-20"></div>
          {!user && (
            <div className="flex items-center">
              로그인/회원가입하고 이용해보세요
            </div>
          )}
          {user && (
            <div className="flex flex-col justify-center">
              <div className="font-bold text-lg">{user?.id}님</div>
            </div>
          )}
        </div>
        {/* 구분 선 */}
        <div className="border-b border-Bgrey-20 my-4"></div>

        <div className="flex justify-between px-12 pb-8">
          <div
            onClick={goPurchaseHistory}
            className="flex flex-col gap-2 items-center"
          >
            <div className="w-[50px] h-[50px] bg-HITUP_Blue"></div>
            <div>주문/배송</div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[50px] h-[50px] bg-Bgrey-20"></div>
            <div>리뷰</div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[50px] h-[50px] bg-Bgrey-20"></div>
            <div>최근 본 상품</div>
          </div>
          <div
            onClick={goCoupon}
            className="flex flex-col gap-2 items-center cursor-pointer"
          >
            <div className="w-[50px] h-[50px] bg-HITUP_Blue"></div>
            <div>쿠폰</div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[50px] h-[50px] bg-Bgrey-20"></div>
            <div>이벤트</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-12">
        <div className="cursor-pointer text-HITUP_Blue" onClick={goAddress}>
          배송지 관리
        </div>
        <div className="cursor-pointer text-HITUP_Blue" onClick={goPartnership}>
          입점/제휴 신청
        </div>
        <div>멤버쉽 라운지</div>
        <div>환불계좌관리</div>
        <div>알림설정</div>
        <div>공지사항</div>
        <div>FAQ</div>
        <div>1:1 문의</div>
        <div>상품 문의 내역</div>
      </div>
      {/* 구분 선 */}
      <div className="border-b border-Bgrey-20 my-4"></div>
    </div>
  );
};

export default Mypage;
