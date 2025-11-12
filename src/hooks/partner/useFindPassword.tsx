import { useFindAuthStore } from '@/store/partner/useFindAuthStore';
import { useNavi } from '../useNavi';
import { Form } from 'antd';
import { useMutation } from '@tanstack/react-query';
import {
  createAuthCodePartner,
  파트너스비밀번호찾기,
} from '@/utils/api/partnerApi';
import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';

const useFindPassword = () => {
  const { setLoginId, setCompanyOwnerPhoneNumber, setAuthenticationCode } =
    useFindAuthStore();
  const { goPartnerFindPasswordReset } = useNavi();
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

  return {
    form,
    handleFindPassword,
    handleCreateAuthCode,
  };
};

export default useFindPassword;
