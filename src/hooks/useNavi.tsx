import { useNavigate } from 'react-router-dom';

export const useNavi = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const goHome = () => navigate('/user');
  const goCart = () => {
    navigate('/user/cart');
  };
  const goMypage = () => {
    navigate('/user/mypage');
  };

  const goLogin = () => navigate('/user/login');
  const goRegister = () => navigate('/user/register');

  const goAddress = () => {
    navigate('/user/address');
  };

  const goCoupon = () => {
    navigate('/user/coupon');
  };

  const goPurchaseHistory = () => {
    navigate('/user/purchase/history');
  };

  const goReviewManage = () => {
    navigate('/user/review/writable');
  };

  // 파트너스 관련 페이지 (임시)
  const goPartnerLogin = () => navigate('/partner/login');
  const goPartnerRegister = () => navigate('/partner/register');

  const goPartnerFindId = () => navigate('/partner/find-id');
  const goPartnerFindPassword = () => navigate('/partner/find-password');
  const goPartnerFindIdFound = () => navigate('/partner/find-id/found');
  const goPartnerFindPasswordReset = () =>
    navigate('/partner/find-password/reset');

  const goAddProduct = () => navigate('/partner/management/product/add');

  return {
    goBack,
    goHome,
    goCart,
    goMypage,
    goLogin,
    goRegister,
    goAddress,
    goCoupon,
    goPurchaseHistory,
    goReviewManage,

    // 파트너 관련
    goPartnerLogin,
    goPartnerRegister,
    goPartnerFindId,
    goPartnerFindPassword,
    goPartnerFindIdFound,
    goPartnerFindPasswordReset,
    goAddProduct,
  };
};
