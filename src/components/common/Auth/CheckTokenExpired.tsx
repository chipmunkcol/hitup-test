import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { useNavi } from '@/hooks/useNavi';
import { useAuthStore } from '@/store/useAuthStore';
import { 커머스토큰갱신 } from '@/utils/api/api';
import { useMutation } from '@tanstack/react-query';
import { useEffect, type ReactNode } from 'react';

interface CheckTokenExpiredProps {
  children: ReactNode;
}

const CheckTokenExpired = ({ children }: CheckTokenExpiredProps) => {
  const { goLogin } = useNavi();
  const { userAuth, setUserAuth } = useAuthStore();

  // 로그인 유무 체크 (지금은 임시로 addProduct에서 하나 나중엔 파트너 상위 컴포넌트에서 진행)
  useEffect(() => {
    if (!userAuth) return;

    const { refreshTokenExpiredDate, accessTokenExpiredDate, refreshToken } =
      userAuth.memberToken;
    if (refreshTokenExpiredDate < Date.now()) {
      swalAlert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      goLogin();
    }

    if (accessTokenExpiredDate < Date.now()) {
      // alert('토큰이 만료되어 갱신합니다. 디버깅해보죠!');
      // 토큰 재발급 로직
      userTokenRefresh(refreshToken);
    }
  }, [userAuth]);

  const { mutate: userTokenRefresh } = useMutation({
    mutationFn: 커머스토큰갱신,
    onSuccess: (data) => {
      console.log('파트너스토큰갱신 성공: ', data);
      setUserAuth({
        memberToken: data,
      });
    },
    onError: (error) => {
      console.error('파트너스토큰갱신 실패: ', error);
      alert(error || '토큰 갱신에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return <>{children}</>;
};

export default CheckTokenExpired;
