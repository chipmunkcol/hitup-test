import { useNavigate } from 'react-router-dom';

export const useNavi = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const goHome = () => navigate('/');
  return { goBack, goHome };
};
