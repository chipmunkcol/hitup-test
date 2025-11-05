import { useNavi } from '@/hooks/useNavi';
import { 파트너스로그인 } from '@/utils/api/api';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';

const Login = () => {
  const { goPartnerFindId, goPartnerFindPassword } = useNavi();
  const [form] = Form.useForm();

  const handleLogin = (values: any) => {
    console.log('values: ', values);
    // 로그인 API 호출
    loginMutate({ id: values['id'], pw: values['password'] });
  };

  const { mutate: loginMutate } = useMutation({
    mutationFn: 파트너스로그인,
    onSuccess: (data) => {
      console.log('파트너스로그인 성공: ', data);
    },
    onError: (error) => {
      console.error('파트너스로그인 실패: ', error);
      alert(error || '로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return (
    <div className="max-w-xl mx-auto pt-10">
      <Form form={form} onFinish={handleLogin}>
        {/* 아이디 */}
        <Form.Item
          label="아이디"
          name="id"
          rules={[{ required: true, message: '아이디를 입력해주세요' }]}
        >
          <Input />
        </Form.Item>

        {/* 비밀번호 */}
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
        >
          <Input.Password />
        </Form.Item>

        {/* 로그인 버튼 */}
        <Button htmlType="submit">로그인</Button>

        {/* 아이디 찾기, 비밀번호 찾기 */}
        <div>
          <div onClick={goPartnerFindId}>아이디 찾기</div>
          <div onClick={goPartnerFindPassword}>비밀번호 찾기</div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
