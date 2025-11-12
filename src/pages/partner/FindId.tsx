import useFindId from '@/hooks/partner/useFindId';
import { Button, Form, Input } from 'antd';

const FindId = () => {
  const { form, handleCreateAuthCode, handleFindId } = useFindId();

  return (
    <div className="max-w-sm mx-auto pt-10">
      <div>
        <h1 className="py-6 text-2xl">아이디 찾기</h1>
        <div className="pb-4">
          찾으려는 계정에 등록된 대표자 이름, 휴대폰 번호로 아이디를 찾을 수
          있습니다.
        </div>
      </div>
      <Form
        form={form}
        onFinish={handleFindId}
        labelCol={{
          style: { width: '80px', height: '55px', marginRight: '10px' },
        }}
        labelAlign="left"
      >
        {/* 아이디 */}
        <Form.Item
          label="대표자이름"
          name="companyOwnerName"
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

        <div>
          계정에 등록된 정보는 브랜드 입점사 가입 시점의 대표자 명의의 이름과
          휴대폰번호 입니다. 해외 휴대폰번호는 아이디 찾기 서비스를 제공하지
          않습니다
        </div>

        {/* 아이디찾기 버튼 */}
        <div className="py-4">
          <Button htmlType="submit" className="w-full">
            확인
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FindId;
