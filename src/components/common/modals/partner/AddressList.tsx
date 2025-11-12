import { Button, Form, Input, Radio } from 'antd';
import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

// 대표 출고지, 대표 반품/교환 주소지, 일반 주소지
const 설정옵션 = [
  { label: '대표 출고지', value: '대표출고지' },
  { label: '대표 반품/교환 주소지', value: '대표반품지' },
  { label: '일반 주소지', value: '일반주소지' },
];

interface AddressListProps {
  closePortal: () => void;
  title: 'delivery' | 'return';
}

const AddressList = ({ closePortal }: AddressListProps) => {
  const [step, setStep] = useState(1);
  const onClickNext = () => {
    setStep(step + 1);
  };

  const [address, setAddress] = useState('');
  console.log('address: ', address);
  const [isPostcodeOpen, setPostcodeOpen] = useState(false);
  const openPostcode = () => {
    setPostcodeOpen(true);
  };

  const closePostcode = () => {
    setPostcodeOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('Form values: ', values);
    console.log('value', values.setting);
    // 저장 로직 추가

    // 커스텀훅으로 만들어서 api 연동
    // props로 배송에 대한
    // title === 'delivery' ? 배송function : 반품function
    closePortal();
  };

  return (
    <div className="">
      <div className="min-h-[350px] p-4 flex flex-col gap-4">
        {step === 1 && (
          <>
            {/* API GET 등록된 배송지 */}
            <div>등록 된 배송지가 없습니다</div>
            <Button onClick={onClickNext} className="w-full">
              주소지 추가
            </Button>
          </>
        )}

        {step === 2 && (
          <div>
            <Form
              labelCol={{ style: { width: '100px' } }}
              labelAlign="left"
              className="flex flex-col gap-4"
              onFinish={onFinish}
              initialValues={{
                setting: '대표출고지',
              }}
            >
              {/* 이름 */}
              <Form.Item label="이름" name="name">
                <Input placeholder="주소지 관리 이름" />
              </Form.Item>

              {/* 주소 */}
              <Form.Item label="주소" name="address">
                <div className="flex flex-col gap-2">
                  <div>{address || '-'}</div>
                  <Button style={{ width: '200px' }} onClick={openPostcode}>
                    주소지 검색
                  </Button>
                </div>
              </Form.Item>

              {/* 연락처1 */}
              <Form.Item label="연락처1" name="phoneNumber1">
                <Input
                  placeholder="-없이 숫자만 입력"
                  style={{ width: '200px' }}
                />
              </Form.Item>

              {/* 연락처2 */}
              <Form.Item label="연락처2" name="phoneNumber2">
                <Input
                  placeholder="-없이 숫자만 입력"
                  style={{ width: '200px' }}
                />
              </Form.Item>

              {/* 설정 */}
              <Form.Item label="설정" name="setting">
                <Radio.Group options={설정옵션} />
              </Form.Item>

              <div className="flex justify-center gap-2">
                <Button onClick={closePortal} className="">
                  취소
                </Button>
                <Button htmlType="submit" className="">
                  저장
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>

      {isPostcodeOpen && (
        <div
          onClick={closePostcode}
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-10"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[100%] h-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white m-auto "
          >
            <header className="py-4 bg-Blue-10 flex justify-between px-4">
              <div>주소를 검색해주세요</div>
              <div onClick={closePostcode}>X</div>
            </header>
            <Postcode closePostcode={closePostcode} setAddress={setAddress} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressList;

interface PostcodeProps {
  closePostcode: () => void;
  setAddress: (address: string) => void;
}
const Postcode = ({ closePostcode, setAddress }: PostcodeProps) => {
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress(fullAddress);
    closePostcode();
  };

  return (
    <DaumPostcodeEmbed
      style={{ height: '100%' }}
      onComplete={handleComplete}
      //   {...props}
    />
  );
};
