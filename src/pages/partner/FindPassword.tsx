import useFindPassword from '@/hooks/partner/useFindPassword';
import { useNavi } from '@/hooks/useNavi';
import { Button, Form, Input } from 'antd';

const FindPassword = () => {
  const { goPartnerFindId } = useNavi();
  const { form, handleCreateAuthCode, handleFindPassword } = useFindPassword();

  return (
    <div className="max-w-sm mx-auto pt-10">
      <div>
        <h1 className="py-6 text-2xl">비밀번호 찾기</h1>
      </div>
      <Form
        form={form}
        onFinish={handleFindPassword}
        labelCol={{
          style: { width: '80px', height: '55px', marginRight: '10px' },
        }}
        labelAlign="left"
      >
        {/* 아이디 */}
        <Form.Item
          label="아이디"
          name="loginId"
          rules={[{ required: true, message: '아이디를 입력해주세요' }]}
        >
          <Input />
        </Form.Item>

        {/* 비밀번호 */}
        <div className="flex gap-2">
          <Form.Item
            label="휴대폰번호"
            name="companyOwnerPhoneNumber"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          >
            <Input />
          </Form.Item>
          <div>
            <Button onClick={handleCreateAuthCode}>인증번호 받기</Button>
          </div>
        </div>

        {/* 인증번호 */}
        <Form.Item
          label="인증번호"
          name="authenticationCode"
          rules={[{ required: true, message: '인증번호를 입력해주세요' }]}
        >
          <Input placeholder="인증번호 숫자 6자리 입력" />
        </Form.Item>

        {/* 비밀번호찾기 버튼 */}
        {/* <div className="py-4"> */}
        <Button htmlType="submit" className="w-full">
          확인
        </Button>
        {/* </div> */}
      </Form>
      <div className="py-2 text-center">
        아이디가 기억나지 않는다면?{' '}
        <span onClick={goPartnerFindId} className="underline">
          아이디 찾기
        </span>
      </div>
    </div>
  );
};

export default FindPassword;
