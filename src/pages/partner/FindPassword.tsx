import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { useNavi } from '@/hooks/useNavi';
import { useFindAuthStore } from '@/store/partner/useFindAuthStore';
import {
  createAuthCodePartner,
  파트너스비밀번호찾기,
} from '@/utils/api/partnerApi';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';

const FindPassword = () => {
  const { setLoginId, setCompanyOwnerPhoneNumber, setAuthenticationCode } =
    useFindAuthStore();
  const { goPartnerFindId, goPartnerFindPasswordReset } = useNavi();
  const [form] = Form.useForm();
  const handleCreateAuthCode = () => {
    const phoneNumber = form.getFieldValue('companyOwnerPhoneNumber');

    // phone 번호가 적절한지 validation 필요

    createCodeMutate({ phoneNumber, phoneAuthenticateType: 'FIND_PASSWORD' });
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

  const handleFindPassword = (values: any) => {
    console.log('values: ', values);
    // 비밀번호 찾기 API 호출

    findPasswordMutate({
      loginId: values['loginId'],
      companyOwnerPhoneNumber: values['companyOwnerPhoneNumber'],
      authenticationCode: values['authenticationCode'],
    });
  };

  const { mutate: findPasswordMutate } = useMutation({
    mutationFn: 파트너스비밀번호찾기,
    onSuccess: (data) => {
      console.log('파트너스비밀번호찾기 성공: ', data);

      // 파트너스 계정찾기를 위한 상태저장
      setterFindAuthStore();

      swalAlert('비밀번호 재설정 페이지로 이동합니다.');
      goPartnerFindPasswordReset();
    },
    onError: (error) => {
      console.error('파트너스비밀번호찾기 실패: ', error);
      alert(error || '비밀번호 찾기에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const setterFindAuthStore = () => {
    const formValues = form.getFieldsValue();

    console.log('formValues: ', formValues);
    setLoginId(formValues['loginId']);
    setCompanyOwnerPhoneNumber(formValues['companyOwnerPhoneNumber']);
    setAuthenticationCode(formValues['authenticationCode']);
  };

  return (
    <div className="max-w-sm mx-auto pt-10">
      <div>
        <h1 className="py-6 text-2xl">비밀번호 찾기</h1>
      </div>
      <Form
        form={form}
        onFinish={handleFindPassword}
        labelCol={{ style: { width: '80px', marginRight: '10px' } }}
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
        <div className="py-4">
          <Button htmlType="submit" className="w-full">
            확인
          </Button>
        </div>
      </Form>
      <div className="text-center">
        아이디가 기억나지 않는다면?{' '}
        <span onClick={goPartnerFindId} className="underline">
          아이디 찾기
        </span>
      </div>
    </div>
  );
};

export default FindPassword;
