import { useNavigate } from 'react-router-dom';

export const useNavi = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const goHome = () => navigate('/');
  const goCart = () => {
    navigate('/cart');
  };
  const goMypage = () => {
    navigate('/mypage');
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
