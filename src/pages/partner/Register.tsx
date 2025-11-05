import { 파트너스등록 } from '@/utils/api/api';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';

const Register = () => {
  const [form] = Form.useForm();

  const { mutate: registerMutate } = useMutation({
    mutationFn: 파트너스등록,
    onSuccess: (data) => {
      console.log('파트너스등록 성공: ', data);
    },
    onError: (error) => {
      console.error('파트너스등록 실패: ', error);
      alert(error || '파트너스등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleRegister = (values: any) => {
    // const values = form.getFieldsValue();
    console.log('values: ', values);

    // 파트너스 등록 API 호출

    // 파트너스등록(values['brand-id'], values['brand-password']);
    registerMutate({ id: values['brand-id'], pw: values['brand-password'] });
  };

  return (
    <div className="max-w-xl mx-auto pt-10">
      <Form
        form={form}
        onFinish={handleRegister}
        labelCol={{ style: { width: '130px' } }}
        labelAlign="left"
      >
        <Form.Item
          label="브랜드 아이디"
          name="brand-id"
          rules={[{ required: true, message: '브랜드 아이디를 입력해주세요' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="브랜드 비밀번호"
          name="brand-password"
          rules={[
            { required: true, message: '브랜드 비밀번호를 입력해주세요' },
          ]}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit">파트너스 등록하기</Button>
      </Form>
    </div>
  );
};

export default Register;
