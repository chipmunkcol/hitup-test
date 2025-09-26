import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useDeliveryStore } from '../store/useDeliveryStore';
import { getAddresses, getCart } from '../utils/api/api';

const PurchasePage = () => {
  const {
    data: cartItems,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const {
    brandItems,
    brandNames,
    브랜드별배송비,
    브랜드별총금액,
    총결제금액,
    총상품금액,
    총배송비,
  } = useCart({ data: cartItems || [] });

  const { data: addresses } = useQuery({
    queryKey: ['addressses'],
    queryFn: getAddresses,
  });
  console.log('addresses: ', addresses);

  const { getSelectedAddress } = useDeliveryStore();
  const defaultAddress =
    addresses && (addresses.find((addr) => addr.기본배송지) || addresses[0]);
  const currentAddress = getSelectedAddress() || defaultAddress;

  // const deliveryAddress = useDeliveryStore((state) => state.address); // 배송지 상태 (구독)

  // const currentAddress = deliveryAddress ? deliveryAddress : defaultAddress;
  console.log('currentAddress: ', currentAddress);

  const handlePurchase = () => {
    // 필요한 데이터
    console.log('총결제금액 ', 총결제금액);
    console.log('배송지', currentAddress);
  };

  const navigate = useNavigate();
  const goAddress = () => {
    navigate('/address');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!cartItems) return <div>결제할 제품이 없습니다</div>;

  return (
    <div className="w-full flex flex-col gap-5 py-10">
      <div className="flex justify-between items-center">
        <div>주문/결제</div>
      </div>

      {/* 배송지 */}
      <div>배송지</div>
      <div className="flex items-center justify-center">
        <div className="p-5 w-[500px] border border-Grey-50 rounded-2xl">
          <div className="flex justify-between">
            <div>
              {currentAddress?.수령인} ({currentAddress?.배송지명})
            </div>
            <button
              onClick={goAddress}
              className="border border-Grey-20 px-4 rounded-lg"
            >
              변경
            </button>
          </div>
          <div>{currentAddress?.연락처}</div>
          <div>
            {currentAddress?.주소} {currentAddress?.상세주소}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* 브랜드별 */}
        {brandNames.map((brand, index) => (
          <div className="bg-Grey-30 p-2" key={index}>
            <div>
              <span>{brand}</span>
            </div>
            {/* 상품 목록 */}
            <ul className="flex flex-col gap-2">
              {brandItems[index]?.map((item) => {
                return (
                  <li className="flex gap-2 bg-white p-2" key={item.id}>
                    <div className="flex gap-2 ">
                      <div className="w-[150px] h-[150px]">
                        <img
                          src="https://picsum.photos/200"
                          alt="상품 이미지"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div>{item.상품명}</div>
                        <div>옵션: {item.옵션}</div>
                        <div className="flex gap-2">
                          <div>{item.할인율}%</div>
                          <div className="line-through">{item.가격}원</div>
                          <div>
                            {item.가격 - (item.가격 * item.할인율) / 100}원
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* 브랜드별 총 가격 */}
            <div className="flex flex-col justify-between p-2">
              <div>
                <span>상품 {브랜드별총금액[index]}원</span>
                <span>+</span>
                <span>배송비 {브랜드별배송비[index]}원</span>
                <span>=</span>
                <span>{브랜드별총금액[index] + 브랜드별배송비[index]}원</span>
              </div>
              <div>(30,000원 이상 주문 시 무료배송)</div>
            </div>
          </div>
        ))}

        {/* 결제 예상 금액 */}
        <div>총 선택 상품 금액 : {총상품금액} 원</div>
        <div>총 배송비 : {총배송비} 원</div>
        <div>총 결제 금액 : {총결제금액} 원</div>
      </div>

      <div>
        <div onClick={handlePurchase} className="bg-green-500 p-2 text-white">
          주문하기
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
