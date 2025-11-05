import { Button, Form, Input } from 'antd';

const ResetPassword = () => {
  return (
    <div className="max-w-sm mx-auto pt-10">
      <div>
        <h1 className="py-6 text-2xl">비밀번호 찾기</h1>
      </div>
      <Form
        // form={form}
        // onFinish={handleFindPassword}
        labelCol={{ style: { width: '120px', marginRight: '10px' } }}
        labelAlign="left"
      >
        {/* 새 비밀번호 */}
        <Form.Item
          label="새 비밀번호"
          name="newPassword"
          rules={[{ required: true, message: '새 비밀번호를 입력해주세요' }]}
        >
          <Input.Password />
        </Form.Item>

        {/* 새 비밀번호 확인 */}
        <Form.Item
          label="새 비밀번호 확인"
          name="confirmNewPassword"
          rules={[
            { required: true, message: '새 비밀번호 확인을 입력해주세요' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* 비밀번호찾기 버튼 */}
        <div className="py-4">
          <Button htmlType="submit" className="w-full">
            확인
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResetPassword;
