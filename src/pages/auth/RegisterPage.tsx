import {
  swalAlert,
  swalConfirm,
} from '@/components/common/libs/sweetalert/sweetalert';
import { useAuthStore } from '@/store/useAuthStore';
import { checkDuplicateNickname, registerUser } from '@/utils/api/api';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface RegisterForm {
  phoneNumber: string;
  nickName: string;
  birthDay: string;
  gender: string;
  interestFreshwaterFishingType: boolean;
  interestSeaFishingType: boolean;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    isCheckDuplicatedNickname,
    isDuplicatedNickname,
    setIsCheckDuplicatedNickname,
    setIsDuplicatedNickname,
  } = useAuthStore();
  // const [nickNameValue, setNickNameValue] = useState('');

  const [form, setForm] = useState<RegisterForm>({
    phoneNumber: '',
    nickName: '',
    birthDay: '',
    gender: '',
    interestFreshwaterFishingType: false,
    interestSeaFishingType: false,
  });

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNickNameValue(e.target.value);
  // };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeSelect = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleInterest = (type: 'freshwater' | 'sea') => {
    if (type === 'freshwater') {
      setForm((prev) => ({
        ...prev,
        interestFreshwaterFishingType: !prev.interestFreshwaterFishingType,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        interestSeaFishingType: !prev.interestSeaFishingType,
      }));
    }
  };

  const { mutate: duplicateMutate } = useMutation({
    mutationFn: checkDuplicateNickname,
    onSuccess: (data) => {
      console.log('닉네임 중복 확인 성공:', data);
      if (data.isDuplicate === false) {
        setIsCheckDuplicatedNickname(true);
        setIsDuplicatedNickname(false);
      }

      if (data?.isDuplicate) {
        setIsCheckDuplicatedNickname(false);
        setIsDuplicatedNickname(true);
      }
    },
    onError: (error) => {
      console.error('닉네임 중복 확인 실패:', error);
      alert(error || '이미 사용 중인 닉네임입니다.');
    },
  });

  const handleCheckDuplicate = () => {
    // 여러번 가능해야 될듯 (다른 닉네임으로 시도할 경우)
    // if (isCheckDuplicatedNickname) {
    //   alert('이미 닉네임 중복확인을 하셨습니다.');
    //   return;
    // }

    if (!form.nickName.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    duplicateMutate(form.nickName);
  };

  const { mutate: registerMutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      console.log('회원가입 성공:', data);
      const res = await swalAlert('회원가입 성공', '로그인 하러가기');
      if (res.isConfirmed) {
        navigate('/login');
      }
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert(error || '회원가입에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (닉네임 중복확인 안됐으면 return) <-- 전역상태 필요
    if (!isCheckDuplicatedNickname) {
      alert('닉네임 중복확인을 해주세요.');
      return;
    }

    if (
      form.nickName?.trim() === '' ||
      form?.phoneNumber === '' ||
      form?.birthDay === '' ||
      form?.gender === '' ||
      (!form?.interestFreshwaterFishingType && !form?.interestSeaFishingType)
    ) {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    registerMutate(form);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleRegister} className="flex flex-col gap-6">
        <div>회원가입</div>
        <div>닉네임을 설정해 주세요</div>
        <div>
          <div className="flex gap-4">
            <Input
              name="nickName"
              value={form.nickName}
              onChange={onChangeInput}
            />
            <Button onClick={handleCheckDuplicate}>중복확인</Button>
          </div>
          {isCheckDuplicatedNickname && !isDuplicatedNickname && (
            <div>사용 가능한 닉네임이에요</div>
          )}
          {isDuplicatedNickname && (
            <div className="text-HITUP_Red">사용 불가능한 닉네임이에요</div>
          )}
        </div>

        {/* <div> */}
        <div>
          <label>생년월일</label>
          <Input
            name="birthDay"
            value={form.birthDay}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label>연락처</label>
          <Input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={onChangeInput}
          />
        </div>
        <div className="flex gap-6">
          <label>성별</label>
          <Select
            value={form.gender}
            onChange={(value: string) => onChangeSelect('gender', value)}
            style={{ width: 100 }}
            options={[
              { label: '남성', value: 'MALE' },
              { label: '여성', value: 'FEMALE' },
            ]}
          />
        </div>
        <div>
          <label>관심낚시</label>
          <div>
            <Button
              type={form.interestSeaFishingType ? 'primary' : 'default'}
              onClick={() => toggleInterest('sea')}
            >
              바다
            </Button>
            <Button
              type={form.interestFreshwaterFishingType ? 'primary' : 'default'}
              onClick={() => toggleInterest('freshwater')}
            >
              민물
            </Button>
          </div>
        </div>
        {/* </div> */}
        <Button htmlType="submit">회원가입</Button>
      </form>
    </div>
  );
};

export default RegisterPage;

{
  /* 테스팅 버튼 */
}
{
  /* 테스팅 버튼 */
}
{
  /* 테스팅 버튼 */
}
{
  /* <Button onClick={handleTesting}>테스팅 버튼</Button> */
}
