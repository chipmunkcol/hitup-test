import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { passwordRegex } from '@/data/const/regex';
import { useNavi } from '@/hooks/useNavi';
import { useFindAuthStore } from '@/store/partner/useFindAuthStore';
import { 파트너스비밀번호변경 } from '@/utils/api/partnerApi';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';

const ResetPassword = () => {
  const { goPartnerLogin } = useNavi();
  const { loginId, companyOwnerPhoneNumber, authenticationCode } =
    useFindAuthStore();

  const handleFindPassword = (values: any) => {
    console.log('values: ', values);
    // 비밀번호 재설정 API 호출
    const payload = {
      ...values,
      loginId,
      companyOwnerPhoneNumber,
      authenticationCode,
    };
    findPasswordMutate(payload);
  };

  const { mutate: findPasswordMutate } = useMutation({
    mutationFn: 파트너스비밀번호변경,
    onSuccess: (data) => {
      console.log('파트너스비밀번호변경 성공: ', data);
      swalAlert('비밀번호가 재설정되었습니다. 로그인 페이지로 이동합니다.');
      goPartnerLogin();
    },
    onError: (error) => {
      console.error('파트너스비밀번호변경 실패: ', error);
      alert(error || '비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return (
    <div className="max-w-sm mx-auto pt-10">
      <div>
        <h1 className="py-6 text-2xl">비밀번호 재설정</h1>
      </div>
      <Form
        // form={form}
        onFinish={handleFindPassword}
        labelCol={{ style: { width: '120px', marginRight: '10px' } }}
        labelAlign="left"
      >
        {/* 새 비밀번호 */}
        <Form.Item
          label="새 비밀번호"
          name="loginPassword"
          rules={[
            { required: true, message: '새 비밀번호를 입력해주세요' },
            {
              pattern: passwordRegex,
              message: '숫자와 영문 조합 8~16자로 입력해주세요.',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* 새 비밀번호 확인 */}
        <Form.Item
          label="새 비밀번호 확인"
          name="loginPassword2"
          rules={[
            { required: true, message: '새 비밀번호 확인을 입력해주세요' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('loginPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('비밀번호가 일치하지 않습니다.')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div>
          비밀번호는 숫자와 영문이 조합된 8~12자리를 포함하여 입력해주세요.
        </div>

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
