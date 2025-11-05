import { useNavi } from '@/hooks/useNavi';
import { useFindAuthStore } from '@/store/partner/useFindAuthStore';
import {
  createAuthCodePartner,
  파트너스계정찾기,
} from '@/utils/api/partnerApi';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';

const FindId = () => {
  const { setId } = useFindAuthStore();
  const { goPartnerFindIdFound } = useNavi();
  const [form] = Form.useForm();
  const handleCreateAuthCode = () => {
    const phoneNumber = form.getFieldValue('companyOwnerPhoneNumber');

    // phone 번호가 적절한지 validation 필요

    createCodeMutate({
      phoneNumber,
      phoneAuthenticateType: 'FIND_ID',
    });
  };

  const { mutate: createCodeMutate } = useMutation({
    mutationFn: createAuthCodePartner,
    onSuccess: (data) => {
      console.log('인증코드 생성 성공: ', data);
      alert('인증코드가 발송되었습니다.');
    },
    onError: (error) => {
      console.error('인증코드 생성 실패: ', error);
      alert(error || '인증코드 생성에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleFindId = (values: any) => {
    console.log('values: ', values);
    // 아이디 찾기 API 호출

    findIdMutate({
      companyOwnerName: values['companyOwnerName'],
      companyOwnerPhoneNumber: values['companyOwnerPhoneNumber'],
      authenticationCode: values['authenticationCode'],
    });
  };

  const { mutate: findIdMutate } = useMutation({
    mutationFn: 파트너스계정찾기,
    onSuccess: (data) => {
      console.log('파트너스계정찾기 성공: ', data);
      // alert(`회원님의 아이디는 ${data.data.memberId} 입니다.`);
      setId(data?.loginId);
      goPartnerFindIdFound();
    },
    onError: (error) => {
      console.error('파트너스계정찾기 실패: ', error);
      alert(error || '아이디 찾기에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return (
    <div className="max-w-sm mx-auto pt-10">
      <div>
        <h1 className="py-6 text-2xl">아이디 찾기</h1>
        <div>
          찾으려는 계정에 등록된 대표자 이름, 휴대폰 번호로 아이디를 찾을 수
          있습니다.
        </div>
      </div>
      <Form
        form={form}
        onFinish={handleFindId}
        labelCol={{ style: { width: '80px', marginRight: '10px' } }}
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
