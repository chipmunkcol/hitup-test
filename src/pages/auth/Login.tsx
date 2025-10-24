import Button from '@/components/common/Button';
import { loginUser } from '@/utils/api/api';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'antd';
import { useState } from 'react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('333333');

  const { mutate: loginMutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('login success data: ', data);
    },
    onError: (error) => {
      console.log('login error: ', error);
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutate({
      phoneNumber: phone,
      authenticationCode: code,
    });
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleLogin} className="flex flex-col gap-6 p-6">
        <div>
          <label>전화번호</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>인증번호</label>
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <Button props={{ type: 'submit' }} variant="blue">
          로그인
        </Button>
      </form>
    </div>
  );
};

export default Login;
