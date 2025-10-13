import { useQuery } from '@tanstack/react-query';
import { getAddresses } from '../../utils/api/api';
import { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import { useDeliveryStore } from '../../store/useDeliveryStore';
import type { Address } from '../../data/addressesData';
import { useNavigate } from 'react-router-dom';

const AddressPage = () => {
  const { data: addresses } = useQuery({
    queryKey: ['addressses'],
    queryFn: getAddresses,
  });
  // console.log('addresses: ', addresses);

  const {
    setAddresses,
    selectAddressId,
    getSelectedAddress,
    selectedAddressId,
  } = useDeliveryStore();

  useEffect(() => {
    if (addresses) {
      setAddresses(addresses);
    }
  }, [addresses]);

  const selected = getSelectedAddress();

  const onClickIndex = (address: Address) => {
    selectAddressId(address.id);
  };

  const handleSelectAddressId = (address: Address) => {
    selectAddressId(address.id);
    navigate('/purchase');
  };

  const navigate = useNavigate();
  const goAddressEdit = (addressId: number) => {
    navigate(`/address/edit/${addressId}`);
  };

  return (
    <div className="flex col-8">
      <div className="w-[500px] mx-auto py-10 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>배송지 목록</div>
          <div className="w-[200px]">
            <Button variant="default" onClick={() => navigate('/address/add')}>
              배송지 추가
            </Button>
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          {addresses &&
            addresses.map((address) => (
              <li
                key={address.id}
                className={`relative flex items-center justify-center border ${address.id === selectedAddressId ? 'border-2 border-HITUP_Blue' : 'border border-Grey-30'} rounded-2xl`}
                onClick={() => onClickIndex(address)}
              >
                <div className={`flex flex-col gap-2 p-5 w-full `}>
                  <div className="flex justify-between">
                    <div>
                      <span>{address.배송지명}</span>
                      {address.기본배송지 ? <span> (기본배송지)</span> : null}
                    </div>
                    <button
                      onClick={() => goAddressEdit(address.id)}
                      className="border border-Grey-20 px-4 rounded-lg"
                    >
                      변경
                    </button>
                  </div>
                  <div>수령인 {address?.수령인}</div>

                  <div>휴대폰 {address?.연락처}</div>
                  <div>
                    주소 {address?.주소} {address?.상세주소}
                  </div>
                </div>
              </li>
            ))}
        </ul>

        <div className="w-full">
          <Button
            variant="default"
            onClick={() => selected && handleSelectAddressId(selected)}
          >
            선택하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
