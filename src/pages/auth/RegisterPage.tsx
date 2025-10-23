import { checkDuplicateNickname, registerUser } from '@/utils/api/api';
import { encryptAes256 } from '@/utils/auth/crypto';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

export interface RegisterForm {
  phoneNumber: string;
  nickName: string;
  birthDay: string;
  gender: string;
  interestFreshwaterFishingType: boolean;
  interestSeaFishingType: boolean;
}

const RegisterPage = () => {
  const [nickNameValue, setNickNameValue] = useState('');

  const [form, setForm] = useState<RegisterForm>({
    phoneNumber: '',
    nickName: '',
    birthDay: '',
    gender: '',
    interestFreshwaterFishingType: false,
    interestSeaFishingType: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickNameValue(e.target.value);
  };

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
    },
    onError: (error) => {
      console.error('닉네임 중복 확인 실패:', error);
      alert(error || '이미 사용 중인 닉네임입니다.');
    },
  });

  const handleCheckDuplicate = () => {
    if (!nickNameValue.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    duplicateMutate(nickNameValue);
  };

  const { mutate: registerMutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert(error || '회원가입에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (닉네임 중복확인 안됐으면 return) <-- 전역상태 필요
    if (
      nickNameValue?.trim() === '' ||
      form?.phoneNumber === '' ||
      form?.birthDay === '' ||
      form?.gender === '' ||
      (!form?.interestFreshwaterFishingType && !form?.interestSeaFishingType)
    ) {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    const timestamp = Date.now().toString();
    const encrytedNickName = encryptAes256(
      timestamp,
      import.meta.env.VITE_ACCESS_KEY,
      nickNameValue
    );
    const encryptedPhoneNumber = encryptAes256(
      timestamp,
      import.meta.env.VITE_ACCESS_KEY,
      form.phoneNumber
    );
    const newForm: RegisterForm = {
      ...form,

      birthDay: dayjs(form.birthDay).format('YYYY-MM-DD'),
      nickName: encrytedNickName,
      phoneNumber: encryptedPhoneNumber,
    };

    registerMutate(newForm);
  };

  // const handleTesting = () => {
  //   testingAPI();
  // };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleRegister} className="flex flex-col gap-6">
        <div>회원가입</div>
        <div>닉네임을 설정해 주세요</div>
        <div className="flex gap-4">
          <Input
            name="nickName"
            value={nickNameValue}
            onChange={handleInputChange}
          />
          <Button onClick={handleCheckDuplicate}>중복확인</Button>
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
