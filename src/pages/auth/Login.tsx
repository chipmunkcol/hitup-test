import Button from '@/components/common/Button';
import { useNavi } from '@/hooks/useNavi';
import { useAuthStore, useTokenStore } from '@/store/useAuthStore';
import { createAuthCode, loginUser } from '@/utils/api/api';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'antd';
import { useState } from 'react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isOpenCode, setIsOpenCode] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useTokenStore((state) => state.setToken);
  const { goHome } = useNavi();

  const { mutate: loginMutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('login success data: ', data);
      const {
        accessToken,
        refreshToken,
        accessTokenExpiredDate,
        refreshTokenExpiredDate,
      } = data?.memberToken || {};
      setToken({
        accessToken,
        refreshToken,
        accessTokenExpiredDate,
        refreshTokenExpiredDate,
      });
      setUser(data);
      goHome();
    },
    onError: (error) => {
      console.log('login error: ', error);
    },
  });

  const handleLogin = () => {
    // e.preventDefault();

    loginMutate({
      phoneNumber: phone,
      authenticationCode: code,
    });
  };

  const handleSendCode = () => {
    sendCodeMutate(phone);
  };

  const { mutate: sendCodeMutate } = useMutation({
    mutationFn: createAuthCode,
    onSuccess: (data) => {
      if (data) {
        setIsOpenCode(true);
      }
    },
    onError: (error) => {
      console.log('send code error: ', error);
    },
  });

  return (
    <div className="max-w-xl mx-auto">
      {/* <PurchaseItemCard /> */}
      <div>
        <h2>휴대폰 번호로 간편하게 시작해보세요</h2>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div>
          {/* <label>휴대폰 번호</label> */}
          <Input
            placeholder="휴대폰 번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <Button onClick={handleSendCode}>인증번호 발송</Button>

        {isOpenCode && (
          <>
            <div>
              <label>인증번호</label>
              <Input value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
            <Button onClick={handleLogin} variant="blue">
              로그인
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
