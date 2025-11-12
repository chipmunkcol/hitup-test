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

  // /address/add
  const goAddAddress = () => {
    navigate('/user/address/add');
  };

  // '/purchase'
  const goPurchase = () => {
    navigate('/user/purchase');
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
  const goDashboard = () => navigate('/partner/management/dashboard');

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
    goAddAddress,
    goPurchase,

    // 파트너 관련
    goPartnerLogin,
    goPartnerRegister,
    goPartnerFindId,
    goPartnerFindPassword,
    goPartnerFindIdFound,
    goPartnerFindPasswordReset,
    goAddProduct,
    goDashboard,
  };
};
