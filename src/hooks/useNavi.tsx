import { useNavigate } from 'react-router-dom';

export const useNavi = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const goHome = () => navigate('/');

  const goPartnerFindId = () => navigate('/partner/find-id');
  const goPartnerFindPassword = () => navigate('/partner/find-password');
  return { goBack, goHome, goPartnerFindId, goPartnerFindPassword };
};
