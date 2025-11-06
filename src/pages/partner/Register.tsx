import { passwordRegex } from '@/data/const/regex';
import { 파트너스등록, type 파트너스등록Payload } from '@/utils/api/partnerApi';
import { useMutation } from '@tanstack/react-query';
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import { useState } from 'react';

const Register = () => {
  const [form] = Form.useForm();

  const { mutate: registerMutate } = useMutation({
    mutationFn: 파트너스등록,
    onSuccess: (data) => {
      console.log('파트너스등록 성공: ', data);
      if (data) {
        setStep(3);
      }
    },
    onError: (error) => {
      console.error('파트너스등록 실패: ', error);
      alert(error || '파트너스등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleRegister = (values: any) => {
    // const values = form.getFieldsValue();
    console.log('values: ', values);
    const {
      agreeToInfo: _,
      agreeToUse: __,
      loginPasswordConfirm: ___,
      ...rest
    } = values;

    // 파트너스 등록 API 호출

    // 파트너스등록(values['brand-id'], values['brand-password']);
    registerMutate(rest);
  };

  const [step, setStep] = useState(1);

  const onClickNextStep = async () => {
    // await form.validateFields();
    const agreeToUse = form.getFieldValue('agreeToUse');
    const agreeToInfo = form.getFieldValue('agreeToInfo');
    console.log('temp:', agreeToUse);
    console.log('temp2:', agreeToInfo);

    if (agreeToUse && agreeToInfo) {
      setStep(2);
    } else {
      alert('필수 약관에 동의해주세요.');
    }
  };

  const onClickPrevStep = () => {
    setStep(1);
  };

  return (
    <div className="max-w-xl mx-auto pt-10">
      {(step === 1 || step === 2) && (
        <div className="flex justify-around pt-5 py-20">
          <div className="border-b w-[122px] text-center">약관동의</div>
          <div>정보입력</div>
          <div>입점신청 완료</div>
        </div>
      )}

      {/* <div className="relative"> */}
      <Form
        form={form}
        // className="absolute"
        className={`relative ${step === 2 ? 'min-h-[2000px]' : step === 1 ? 'min-h-dvh' : ''}`}
        onFinish={handleRegister}
        labelCol={{ style: { width: '150px' } }}
        labelAlign="left"
        initialValues={{
          companyType: 'SOLE_PROPRIETOR',
        }}
      >
        {/* {step === 1 && ( */}
        <div
          className={`absolute w-full transition-opacity duration-500 ${
            step === 1 ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="w-full h-96 border rounded-lg overflow-auto p-4">
            이용약관 동의서 작성중~~
          </div>
          <Form.Item name="agreeToUse" valuePropName="checked">
            <Checkbox>서비스 이용약관에 동의합니다. (필수)</Checkbox>
          </Form.Item>

          <div className="w-full h-96 border rounded-lg overflow-auto p-4">
            입력하신 정보는 입점 상담을 위한 기초 자료로만 사용됩니다. 수집
            항목과 이용 목적, 보유 및 이용기간은 다음과 같습니다. 수집항목 :
            신청인 담당자 정보인 이름,연락처,이메일,신청내용과 대표자 연락처,
            개인 사업자일 경우 개인사업자 번호를 수집합니다. 수집 및 이용목적:
            입점 상담을 위한 기초자료로 활용 보유 및 이용기간: 입점신청 등록 후
            90일
          </div>
          <Form.Item name="agreeToInfo" valuePropName="checked">
            <Checkbox>개인정보 수집 및 이용에 동의합니다. (필수)</Checkbox>
          </Form.Item>

          <div>
            본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우 입점신청 글
            작성이 불가합니다.
          </div>

          <div className="flex justify-end">
            <Button htmlType="button" onClick={onClickNextStep}>
              다음
            </Button>
          </div>
        </div>

        <div
          className={`absolute w-full transition-opacity duration-500 ${
            step === 2 ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col gap-8">
            {/* 파트너스 회원가입 */}
            <div className="border p-8">
              <div className="py-4">
                <div className="text-2xl">파트너스 회원가입</div>
                <div>
                  아이디 및 비밀번호가 외부에 노출되지 않도록 주의하시기
                  바랍니다.
                </div>
              </div>
              <div className="flex gap-4">
                <Form.Item
                  className="flex-1"
                  label="브랜드 아이디"
                  name="loginId"
                  rules={[
                    {
                      required: true,
                      message: '브랜드 아이디를 입력해주세요',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <div>
                  <Button htmlType="button">중복확인</Button>
                </div>
              </div>
              <Form.Item
                label="브랜드 비밀번호"
                name="loginPassword"
                rules={[
                  {
                    required: true,
                    message: '브랜드 비밀번호를 입력해주세요',
                  },
                  {
                    pattern: passwordRegex,
                    message: '숫자와 영문 조합 8~16자로 입력해주세요.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="브랜드 비밀번호 확인"
                name="loginPasswordConfirm"
                dependencies={['loginPassword']}
                rules={[
                  {
                    required: true,
                    message: '브랜드 비밀번호 확인을 입력해주세요',
                  },
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
                <Input />
              </Form.Item>
            </div>

            {/* 브랜드 정보 */}
            <div className="border p-8">
              <div className="py-4">
                <div className="text-2xl">브랜드 정보</div>
              </div>

              {/* 브랜드명(국문) */}
              <Form.Item
                label="브랜드명(국문)"
                name="brandNameKo"
                rules={[
                  { required: true, message: '브랜드명(국문)을 입력해주세요' },
                ]}
              >
                <Input />
              </Form.Item>

              {/* 브랜드명(영문) */}
              <Form.Item
                label="브랜드명(영문)"
                name="brandNameEn"
                rules={[
                  { required: true, message: '브랜드명(영문)을 입력해주세요' },
                ]}
              >
                <Input />
              </Form.Item>

              {/* 공식 홈페이지 */}
              <Form.Item
                label="공식 홈페이지"
                name="brandHomePage"
                rules={[
                  { required: true, message: '공식 홈페이지를 입력해주세요' },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            {/* 기업정보 */}
            <div className="border p-8">
              <div className="py-4">
                <div className="text-2xl">기업정보</div>
                <div>
                  업체 정보는 사업자등록증 상의 정보와 동일하게 입력 바랍니다.
                </div>
                <div>
                  대표가 2인 이상인 공동사업자의 경우, 사업자등록증 상
                  "대표자명"에 기입된 분의 정보를 기입 바랍니다.
                </div>
              </div>
              {/* 사업자 구분 */}
              <Form.Item
                label="사업자 구분"
                name="companyType"
                rules={[
                  { required: true, message: '사업자 구분을 입력해주세요' },
                ]}
              >
                <Radio.Group>
                  <Radio value="SOLE_PROPRIETOR">개인사업자</Radio>
                  <Radio value="CORPORATION">법인사업자</Radio>
                </Radio.Group>
              </Form.Item>

              {/* 사업자등록번호 */}
              <Form.Item
                label="사업자등록번호"
                name="companyNumber"
                rules={[
                  { required: true, message: '사업자등록번호를 입력해주세요' },
                ]}
              >
                <Input />
              </Form.Item>

              {/* 회사명 */}
              <Form.Item
                label="회사명"
                name="companyName"
                rules={[{ required: true, message: '회사명을 입력해주세요' }]}
              >
                <Input />
              </Form.Item>

              {/* 대표자 명 */}
              <Form.Item
                label="대표자 명"
                name="companyOwnerName"
                rules={[
                  { required: true, message: '대표자 명을 입력해주세요' },
                ]}
              >
                <Input />
              </Form.Item>

              {/* 대표자 연락처 */}
              <Form.Item
                label="대표자 연락처"
                name="companyOwnerPhoneNumber"
                rules={[
                  { required: true, message: '대표자 연락처를 입력해주세요' },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            {/* 담당자 정보 */}
            <div className="border p-8">
              <div className="py-4">
                <div className="text-2xl">담당자 정보</div>
                <div>
                  업체 정보는 사업자등록증 상의 정보와 동일하게 입력 바랍니다.
                </div>
                <div>
                  대표가 2인 이상인 공동사업자의 경우, 사업자등록증 상
                  "대표자명"에 기입된 분의 정보를 기입 바랍니다.
                </div>
              </div>
              {/* 담당자 명 */}
              <Form.Item
                label="담당자 명"
                name="companyContactName"
                rules={[
                  { required: true, message: '담당자 명을 입력해주세요' },
                ]}
              >
                <Input />
              </Form.Item>

              {/* 담당자 연락처 */}
              <Form.Item
                label="담당자 연락처"
                name="companyContactPhoneNumber"
                rules={[
                  { required: true, message: '담당자 연락처를 입력해주세요' },
                ]}
              >
                <Input />
              </Form.Item>

              {/* 담당자 이메일 */}
              <Form.Item
                label="담당자 이메일"
                name="companyContactEmail"
                rules={[
                  { required: true, message: '담당자 이메일을 입력해주세요' },
                ]}
              >
                <Input />
              </Form.Item>

              {/* 신청내용 */}
              <Form.Item
                label="신청내용"
                name="applyDetail"
                rules={[{ required: true, message: '신청내용을 입력해주세요' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </div>
          </div>

          <div className="py-5 flex gap-2 justify-end">
            <Button htmlType="button" onClick={onClickPrevStep}>
              이전
            </Button>
            <Button htmlType="submit">제출</Button>
          </div>
        </div>
      </Form>
      {/* </div> */}

      <div
        className={`absolute w-full transition-opacity duration-500 ${
          step === 3 ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="pt-20">
          <div>입점 신청이 완료되었습니다!</div>
          <div>계약 체결까지 남은 단계 확인해보세요</div>
          <div className="py-5 flex">
            <div className="bg-HITUP_Blue text-Grey-05 w-[200px] h-[244px] border rounded-lg flex items-center justify-center ">
              1단계 입점 신청
            </div>
            <div className="w-[200px] h-[244px] border rounded-lg flex items-center justify-center">
              2단계 입점 심사
            </div>
            <div className="w-[200px] h-[244px] border rounded-lg flex flex-col items-center justify-center">
              <div> 3단계 협력사 등록 </div>
              <div>로그인 가능!</div>
            </div>
            <div className="w-[200px] h-[244px] border rounded-lg flex items-center justify-center">
              4단계 전자계약 체결
            </div>
          </div>

          <div className="py-10">
            입점 신청서 확인 후 담당자가 순차적으로 연락을 드릴 예정입니다.{' '}
            <br />
            로그인은 3단계 협력사 등록이 완료 된 후에 가능합니다. 관심 갖고
            <br />
            신청해주셔서 감사합니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
