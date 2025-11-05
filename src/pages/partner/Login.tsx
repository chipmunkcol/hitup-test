import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { useNavi } from '@/hooks/useNavi';
import { useAuthStore } from '@/store/partner/useAuthStore';
import { 파트너스로그인 } from '@/utils/api/partnerApi';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';

const Login = () => {
  const {
    goPartnerFindId,
    goPartnerFindPassword,
    goPartnerRegister,
    goAddProduct,
  } = useNavi();
  const [form] = Form.useForm();
  const setPartnerAuth = useAuthStore((state) => state.setPartnerAuth);

  const handleLogin = (values: any) => {
    console.log('values: ', values);
    // 로그인 API 호출
    loginMutate({ id: values['id'], pw: values['password'] });
  };

  const { mutate: loginMutate } = useMutation({
    mutationFn: 파트너스로그인,
    onSuccess: async (data) => {
      console.log('파트너스로그인 성공: ', data);
      setPartnerAuth(data);
      const result = await swalAlert('로그인 되었습니다');
      if (result.isConfirmed) {
        goAddProduct();
      }
    },
    onError: (error) => {
      console.error('파트너스로그인 실패: ', error);
      alert(error || '로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return (
    <div className="max-w-2xs mx-auto pt-10">
      <div className="py-5 text-center text-2xl text-HITUP_Blue">
        히트업 Mall 파트너스
      </div>
      <Form
        form={form}
        onFinish={handleLogin}
        labelCol={{ style: { width: '80px' } }}
        labelAlign="left"
      >
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
        <Button htmlType="submit" className="w-full">
          로그인
        </Button>

        {/* 아이디 찾기, 비밀번호 찾기 */}
        <div className=" p-4 flex justify-center gap-4">
          <div className="cursor-pointer" onClick={goPartnerFindId}>
            아이디 찾기
          </div>
          <div className="cursor-pointer" onClick={goPartnerFindPassword}>
            비밀번호 찾기
          </div>
        </div>
      </Form>

      <Button className="w-full" onClick={goPartnerRegister}>
        입점/제휴 신청
      </Button>
    </div>
  );
};

export default Login;
