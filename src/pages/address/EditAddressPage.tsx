import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import type { Address } from '../../data/addressesData';
import { addToAddress, getAddresses, updateAddress } from '../../utils/api/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditAddressPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data: addressData } = useQuery({
    queryKey: ['addressses'],
    queryFn: getAddresses,
    select: (data) => data.find((addr) => addr.id === Number(id)),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });

  console.log('addresses: ', addressData);

  const [isPostcodeOpen, setPostcodeOpen] = useState(false);
  const openPostcode = () => {
    setPostcodeOpen(true);
  };

  const closePostcode = () => {
    setPostcodeOpen(false);
  };

  const navigate = useNavigate();
  //   주소
  const [address, setAddress] = useState(''); // 주소
  const [detailAddress, setDetailAddress] = useState(''); // 상세주소
  const [receiver, setReceiver] = useState(''); // 수령인
  const [phone, setPhone] = useState(''); // 연락처
  const [deliveryName, setDeliveryName] = useState(''); // 배송지명 (선택)
  const [isDefault, setIsDefault] = useState(false); // 기본 배송지 설정

  // 기존 주소 데이터로 폼 초기화시키면 편하긴한데.. 이렇게 진행해도 되는지?
  useEffect(() => {
    if (addressData) {
      setAddress(addressData.주소);
      setDetailAddress(addressData.상세주소);
      setReceiver(addressData.수령인);
      setPhone(addressData.연락처);
      setDeliveryName(addressData.배송지명 || '');
      setIsDefault(addressData.기본배송지 || false);
    }
  }, [addressData]);

  const mutation = useMutation({
    mutationFn: (payload: Partial<Address>) =>
      updateAddress(Number(id), payload),
    onSuccess: (data) => {
      console.log('배송지 수정 성공: ', data);
      alert('배송지가 수정되었습니다.');

      // 배송지 리스트로 리다이렉트
      navigate('/address');
    },
    onError: (error) => {
      console.error('배송지 수정 실패: ', error);
      alert('배송지 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleSubmit = () => {
    // if (!address || !detailAddress || !receiver || !phone) {
    //   alert('필수 항목을 모두 입력해주세요.');
    //   return;
    // }

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
    <div className="relative w-full h-full py-10 flex flex-col gap-8">
      <div>배송지 수정</div>
      {isPostcodeOpen && (
        <div
          onClick={closePostcode}
          className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"
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
        />
      </div>
      <div>
        <label>연락처</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="배송 받는 사람의 연락처를 입력해주세요"
          className="w-full border-b"
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

export default EditAddressPage;

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
