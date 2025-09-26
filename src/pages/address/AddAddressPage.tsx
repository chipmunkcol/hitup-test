import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import type { Address } from '../../data/addressesData';
import { addToAddress, getAddresses } from '../../utils/api/api';

const AddAddressPage = () => {
  const [isPostcodeOpen, setPostcodeOpen] = useState(false);
  const openPostcode = () => {
    setPostcodeOpen(true);
  };

  const closePostcode = () => {
    setPostcodeOpen(false);
  };

  //   주소
  const [address, setAddress] = useState(''); // 주소
  const [detailAddress, setDetailAddress] = useState(''); // 상세주소
  const [receiver, setReceiver] = useState(''); // 수령인
  const [phone, setPhone] = useState(''); // 연락처
  const [deliveryName, setDeliveryName] = useState(''); // 배송지명 (선택)
  const [isDefault, setIsDefault] = useState(false); // 기본 배송지 설정

  const mutation = useMutation({
    mutationFn: (payload: Address) => addToAddress(payload),
    onSuccess: (data) => {
      console.log('배송지 추가 성공: ', data);
      alert('배송지가 추가되었습니다.');
    },
    onError: (error) => {
      console.error('배송지 추가 실패: ', error);
      alert('배송지 추가에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const { data: addresses } = useQuery({
    queryKey: ['addressses'],
    queryFn: getAddresses,
    // enabled: false, // 자동 실행 방지
  });
  console.log('addresses: ', addresses);

  const handleSubmit = () => {
    // if (!address || !detailAddress || !receiver || !phone) {
    //   alert('필수 항목을 모두 입력해주세요.');
    //   return;
    // }
    if (isDefault && addresses && addresses.some((addr) => addr.기본배송지)) {
      ('기존 기본 배송지를 해제하고 새로 추가하는 배송지를 기본 배송지로 설정하시겠습니까?');
      if (confirmChange) {
        // 기존 기본 배송지를 해제하고 새로 추가하는 배송지를 기본 배송지로 설정
        const updatedAddresses = addresses.map((addr) => ({
          ...addr,
          기본배송지: addr.기본배송지 ? false : addr.주소 === address,
        }));
        console.log('업데이트된 배송지 목록:', updatedAddresses);
      }
    }

    const payload = {
      주소: address,
      상세주소: detailAddress,
      수령인: receiver,
      연락처: phone,
      배송지명: deliveryName,
      기본배송지: isDefault,
    };

    console.log('저장할 배송지 정보:', payload);
    mutation.mutate(payload);
  };

  return (
    <div className=" w-full h-full py-10 flex flex-col gap-8">
      <div>배송지 추가</div>
      {isPostcodeOpen && (
        <div
          onClick={closePostcode}
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-10"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[70%] h-[500px] bg-white m-auto mt-[10%] p-4"
          >
            <Postcode closePostcode={closePostcode} setAddress={setAddress} />
          </div>
        </div>
      )}
      <div>
        <label>주소</label>
        <span className="bg-black text-white p-2" onClick={openPostcode}>
          검색
        </span>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          className="w-full border-b"
          required
        />
      </div>
      <div>
        <label className="block">상세주소</label>
        <input
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          type="text"
          placeholder="상세주소는 도로명 주소에 맞게 입력해주세요."
          className="w-full border-b"
          // 텍스트 숫자로 입력 가능
          required
          inputMode="text"
          maxLength={20}
        />
      </div>
      <div>
        <label>수령인</label>
        <input
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          type="text"
          placeholder="배송 받는 사람의 이름을 입력해주세요"
          className="w-full border-b"
          required
          maxLength={20}
        />
      </div>
      <div>
        <label>연락처</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="배송 받는 사람의 연락처를 입력해주세요"
          className="w-full border-b"
          required
          type="tel"
          inputMode="tel"
        />
      </div>
      <div>
        <label>배송지명(선택)</label>
        <input
          value={deliveryName}
          onChange={(e) => setDeliveryName(e.target.value)}
          type="text"
          placeholder="집, 회사 등 배송지명을 입력해주세요"
          className="w-full border-b"
        />
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
        />
        <div>기본 배송지로 설정</div>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="w-full bg-Grey-70 p-2 text-white"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default AddAddressPage;

const Postcode = ({ closePostcode, setAddress }) => {
  const handleComplete = (data) => {
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
    <DaumPostcode
      onComplete={handleComplete}
      //   {...props}
    />
  );
};
