import Button from '@/components/atoms/MyButton';
import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { useNavi } from '@/hooks/useNavi';
import { useAuthStore } from '@/store/useAuthStore';
import { createAuthCode, loginUser } from '@/utils/api/api';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'antd';
import { useState } from 'react';

const Login = () => {
  const { goRegister } = useNavi();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isOpenCode, setIsOpenCode] = useState(false);
  const { setUserAuth } = useAuthStore();
  const { goHome } = useNavi();

  const { mutate: loginMutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('login success data: ', data);
      setUserAuth(data);
      goHome();
    },
    onError: (error) => {
      console.log('login error: ', error);
    },
  });

  const handleLogin = () => {
    if (!phone || !code) {
      swalAlert('휴대폰 번호와 인증번호를 모두 입력해주세요.');
      return;
    }

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
        <div>
          회원가입이 아직이신가요?{' '}
          <span onClick={goRegister} className="underline">
            (회원가입 하기)
          </span>
        </div>
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
