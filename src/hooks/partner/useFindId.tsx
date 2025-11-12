import { useFindAuthStore } from '@/store/partner/useFindAuthStore';
import { useNavi } from '../useNavi';
import { Form } from 'antd';
import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { useMutation } from '@tanstack/react-query';
import {
  createAuthCodePartner,
  파트너스계정찾기,
} from '@/utils/api/partnerApi';

const useFindId = () => {
  const { setLoginId } = useFindAuthStore();
  const { goPartnerFindIdFound } = useNavi();
  const [form] = Form.useForm();
  const handleCreateAuthCode = () => {
    const phoneNumber = form.getFieldValue('companyOwnerPhoneNumber');
    if (!phoneNumber.trim()) {
      swalAlert('휴대폰 번호를 입력해주세요.');
      return;
    }
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
      setLoginId(data.loginId);
      goPartnerFindIdFound();
    },
    onError: (error) => {
      console.error('파트너스계정찾기 실패: ', error);
      alert(error || '아이디 찾기에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    form,
    handleFindId,
    handleCreateAuthCode,
  };
};

export default useFindId;
