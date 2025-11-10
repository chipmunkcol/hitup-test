import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { useNavi } from '@/hooks/useNavi';
import { useDuplicatedStore } from '@/store/useAuthStore';
import { checkDuplicateNickname, registerUser } from '@/utils/api/api';
import { useMutation } from '@tanstack/react-query';
import { Button, Checkbox, Form, Input, type CheckboxProps } from 'antd';
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
  const { goLogin } = useNavi();
  const {
    isCheckDuplicatedNickname,
    isDuplicatedNickname,
    setIsCheckDuplicatedNickname,
    setIsDuplicatedNickname,
  } = useDuplicatedStore();
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
        goLogin();
      }
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert(error || '회원가입에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleRegister = (value: any) => {
    console.log('value: ', value);

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

  // step (이용약관 동의 / 회원가입)
  const [step, setStep] = useState(1);

  const plainOptions = [
    { label: '만 14세 이상입니다(필수)', value: 'age' },
    { label: '서비스 이용 약관 동의(필수)', value: 'terms' },
    {
      label: '마케팅 목적의 개인정보 수집 및 이용 동의(선택)',
      value: 'privacy',
    },
    { label: '광고성 정보 수신 동의(선택)', value: 'ads' },
  ];

  const [antdForm] = Form.useForm();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  console.log('checkedList: ', checkedList);
  const checkedAll = checkedList.length === plainOptions.length;

  const onChangeCheckList = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? plainOptions.map((o) => o.value) : []);
  };

  // 버튼 활성화 조건 (모든 필수 약관 동의)
  const 약관동의필수값 = ['age', 'terms'];
  const 버튼활성화 = 약관동의필수값.every((v) => checkedList.includes(v));

  const onClickNextStep = () => {
    setStep(2);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1>회원가입</h1>

      {/* step1 약관동의 */}
      {/* step1 약관동의 */}

      {step === 1 && (
        <div>
          <div>이용 약관 동의</div>

          {/* 약관 전체 동의하기 */}
          <Checkbox onChange={onCheckAllChange} checked={checkedAll}>
            약관 전체 동의하기(선택 동의 포함)
          </Checkbox>

          <div className="pl-5">
            <Checkbox.Group
              className="flex flex-col"
              options={plainOptions}
              value={checkedList}
              onChange={onChangeCheckList}
            />
          </div>

          {/* 약관 설명 */}
          <div className="py-10">
            약관에 동의하시면 히트업, 히트업몰 약관이 함께 동의 처리됩니다. 기존
            약관에 동의하셨더라도 내용이 개정되었으므로 다시 동의가 필요합니다.
            선택 항목에 동의하지 않아도 통합계정은 정상적으로 이용하실 수
            있습니다. 정보주체의 개인정보 및 권리 보호를 위해 「개인정보
            보호법」 및 관계 법령이 정한 바를 준수하여 안전하게 관리하고
            있습니다.자세한 사항은 개인정보처리방침 에서 확인할 수 있습니다.
          </div>

          <div>
            <Button
              onClick={onClickNextStep}
              className="w-full"
              disabled={!버튼활성화}
            >
              다음
            </Button>
          </div>
        </div>
      )}

      {/* step2 회원가입 */}
      {/* step2 회원가입 */}

      {step === 2 && (
        <Form
          form={antdForm}
          onFinish={handleRegister}
          className="flex flex-col gap-6"
        >
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
          <div className="">
            <label>성별</label>

            <div className="">
              <Button
                type={form.gender === 'male' ? 'primary' : 'default'}
                onClick={() => onChangeSelect('gender', 'male')}
              >
                남성
              </Button>
              <Button
                type={form.gender === 'female' ? 'primary' : 'default'}
                onClick={() => onChangeSelect('gender', 'female')}
              >
                여성
              </Button>
            </div>
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
                type={
                  form.interestFreshwaterFishingType ? 'primary' : 'default'
                }
                onClick={() => toggleInterest('freshwater')}
              >
                민물
              </Button>
            </div>
          </div>
          <Button htmlType="submit">회원가입</Button>
        </Form>
      )}
    </div>
  );
};

export default RegisterPage;
