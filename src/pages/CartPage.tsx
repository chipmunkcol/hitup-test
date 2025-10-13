import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import useCart from '../hooks/useCart';
import { getAddresses, getCart } from '../utils/api/api';
import Loading from './utils/Loading';

const CartPage = () => {
  const {
    data: cartItems,
    isError,
    isLoading,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const {
    allChecked,
    brandChecked,
    brandItems,
    brandNames,
    toggleAll,
    toggleBrand,
    toggleItem,
    브랜드별배송비,
    총선택상품금액,
    // 총선택상품금액,
    총결제금액,
    총상품금액,
    총할인금액,
    총배송비,
    handleUpdateCartItem,
  } = useCart({ data: cartItems || [] });

  const { data: addresses, refetch: refetchAddresses } = useQuery({
    queryKey: ['addressses'],
    queryFn: getAddresses,
    enabled: false, // 자동 실행 방지
  });
  console.log('addresses: ', addresses);

  const navigate = useNavigate();
  const handlePurchase = async () => {
    // refetch();
    await refetchCart();
    await refetchAddresses();

    console.log('addresses: ', addresses);
    if (addresses && addresses?.length === 0) {
      const res = confirm('등록 된 배송지가 없습니다');
      if (res) {
        navigate('/address/add');
      }
    }

    if (addresses && addresses?.length > 0) {
      navigate('/purchase');
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error...</div>;
  if (!cartItems) return <div>장바구니가 비어있습니다.</div>;

  return (
    <div className="w-full py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <div className="font-bold text-xl">장바구니</div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => toggleAll(e.target.checked)}
          />
          <div>전체 선택</div>
        </div>
        {/* 장바구니 상품 */}
        <div className="flex flex-col gap-5">
          {/* 브랜드별 */}
          {brandNames.map((brand, index) => (
            <div className="bg-Grey-20 p-4" key={index}>
              <div className="flex gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={brandChecked(brand)}
                  onChange={(e) => toggleBrand(brand, e.target.checked)}
                />
                <div>브랜드: {brand}</div>
              </div>
              {/* 상품 목록 */}
              <ul className="flex flex-col gap-2">
                {brandItems[index]?.map((item) => {
                  return (
                    <li
                      className="flex justify-between bg-white py-4 px-2 rounded-md"
                      key={item.id}
                    >
                      <div className="flex gap-2  ">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={(e) =>
                            toggleItem(item.id, e.target.checked)
                          }
                        />
                        <div className="flex gap-2 ">
                          <div
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="w-[150px] h-[150px]"
                          >
                            <img
                              src="https://picsum.photos/200"
                              alt="상품 이미지"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <div>{item.상품명}</div>
                            <div>옵션: 옵션1</div>
                            <div className="flex gap-2">
                              {item.할인율 > 0 && (
                                <div className="text-HITUP_Red">
                                  {item.할인율}%
                                </div>
                              )}
                              {item.할인율 > 0 && (
                                <div className={'line-through text-Grey-40'}>
                                  {item.가격}원
                                </div>
                              )}
                              <div>
                                {item.가격 - (item.가격 * item.할인율) / 100}원
                              </div>
                            </div>
                            <div className="w-[300px] border border-Grey-20 px-2 rounded-md flex items-center justify-between">
                              <button
                                onClick={() =>
                                  handleUpdateCartItem.decrease(item)
                                }
                                className="cursor-pointer"
                              >
                                -
                              </button>
                              <span>{item.수량}</span>
                              <button
                                onClick={() =>
                                  handleUpdateCartItem.increase(item)
                                }
                                className="cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => handleUpdateCartItem.remove(item)}
                        className="cursor-pointer"
                      >
                        X
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* 브랜드별 총 가격 */}
              <div className="flex flex-col text-end p-2">
                <div>
                  <span>상품 {총선택상품금액[index]}원</span>
                  <span>+</span>
                  <span>배송비 {브랜드별배송비[index]}원</span>
                  <span>=</span>
                  <span>{총선택상품금액[index] + 브랜드별배송비[index]}원</span>
                </div>
                <div>(30,000원 이상 주문 시 무료배송)</div>
              </div>
            </div>
          ))}

          {/* 결제 예상 금액 */}
          <div className="text-xl font-semibold">결제 예상 금액</div>
          <div className="flex justify-between">
            <div>총 선택 상품 금액</div>
            <div>{총상품금액} 원</div>
          </div>
          <div className="flex justify-between">
            <div>총 배송비</div>
            <div>{총배송비} 원</div>
          </div>
          <div className="flex justify-between">
            <div>총 할인 금액</div>
            <div>{총할인금액} 원</div>
          </div>

          {/* 구분선 */}
          <div className="text-center font-semibold text-lg">
            쿠폰은 주문/결제할 때 사용 가능해요
          </div>
          <hr className="border border-Grey-30" />

          <div className="flex justify-between text-2xl">
            <div>총 결제 금액</div>
            <div>{총결제금액} 원</div>
          </div>
        </div>

        <div>
          <Button onClick={handlePurchase} variant="grey">
            주문하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
