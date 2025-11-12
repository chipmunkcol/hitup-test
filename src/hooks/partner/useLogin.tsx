import { Form } from 'antd';
import { useNavi } from '../useNavi';
import { useAuthStore } from '@/store/partner/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { 파트너스로그인 } from '@/utils/api/partnerApi';
import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';

const useLogin = () => {
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

  return {
    form,
    handleLogin,
    goPartnerFindId,
    goPartnerFindPassword,
    goPartnerRegister,
  };
};

export default useLogin;
