import { useQuery } from '@tanstack/react-query';
import { getAddresses } from '../../utils/api/api';
import { useEffect, useState } from 'react';
import Button from '../../components/common/Button';

const AddressPage = () => {
  const { data: addresses } = useQuery({
    queryKey: ['addressses'],
    queryFn: getAddresses,
  });
  console.log('addresses: ', addresses);

  const sortedAddresses =
    addresses &&
    addresses.sort((a, b) => {
      if (a.기본배송지 && !b.기본배송지) return -1;
      if (!a.기본배송지 && b.기본배송지) return 1;
      return 0;
    });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const onClickAddress = (id: number) => {
    setSelectedIndex(id);
  };

  useEffect(() => {
    if (addresses && addresses.length > 0 && sortedAddresses) {
      setSelectedIndex(sortedAddresses[0].id);
    }
  }, [addresses]);

  return (
    <div className="flex col-8">
      <div className="w-[500px] mx-auto py-10 flex flex-col gap-5">
        <div>배송지 목록</div>
        <ul className="flex flex-col gap-4">
          {sortedAddresses &&
            sortedAddresses.map((address) => (
              <li
                key={address.id}
                className={`relative flex items-center justify-center border ${address.id === selectedIndex ? 'border-2 border-HITUP_Blue' : 'border border-Grey-30'} rounded-2xl`}
                onClick={() => onClickAddress(address.id)}
              >
                <div className={`flex flex-col gap-2 p-5 w-full `}>
                  <div className="flex justify-between">
                    <div>
                      <span>{address.배송지명}</span>
                      {address.기본배송지 ? <span> (기본배송지)</span> : null}
                    </div>
                    <button className="border border-Grey-20 px-4 rounded-lg">
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
          <Button>선택하기</Button>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
