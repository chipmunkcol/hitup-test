import { useQuery } from '@tanstack/react-query';
import { getCart } from '../utils/api/api';
import { useEffect, useState } from 'react';
import { groupByBrand } from '../utils/function';

const CartPage = () => {
  const {
    data: cartItems,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (cartItems?.length > 0) {
      setCart(cartItems.map((item) => ({ ...item, checked: true })));
    }
  }, [cartItems]);
  console.log('cart: ', cart);

  const groupedItems = groupByBrand(cart);
  // console.log('groupedItems: ', groupedItems);

  const brandNames = Object.keys(groupedItems);
  const brandItems = Object.values(groupedItems);
  const 브랜드별총금액 = brandItems.map((items) =>
    items.reduce(
      (total, item) =>
        item.checked
          ? total + item.가격 - (item.가격 * item.할인율) / 100
          : total,
      0
    )
  );
  const 브랜드별배송비: number[] = 브랜드별총금액.map((amount) =>
    amount === 0 ? 0 : amount >= 30000 ? 0 : 2500
  );
  console.log('브랜드별배송비: ', 브랜드별배송비);

  const 총상품금액 = 브랜드별총금액.reduce((sum, amount) => sum + amount, 0);
  const 총배송비 = 브랜드별배송비.reduce((sum, amount) => sum + amount, 0);

  console.log('총배송비: ', 총배송비);

  const 총결제금액 = 총상품금액 + 총배송비;

  const toggleAll = (checked: boolean) => {
    setCart(cart.map((item) => ({ ...item, checked })));
  };

  const toggleBrand = (brand: string, checked: boolean) => {
    setCart(
      cart.map((item) =>
        item.브랜드명 === brand ? { ...item, checked } : item
      )
    );
  };

  const toggleItem = (id: number, checked: boolean) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, checked } : item)));
  };

  const allChecked = cart.every((item) => item.checked);
  const brandChecked = (brand: string) =>
    cart
      .filter((item) => item.브랜드명 === brand)
      .every((item) => item.checked);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!cartItems) return <div>장바구니가 비어있습니다.</div>;

  return (
    <div className="w-full">
      <div>장바구니</div>
      <div>
        <input
          type="checkbox"
          checked={allChecked}
          onChange={(e) => toggleAll(e.target.checked)}
        />
        <span>전체 선택</span>
      </div>
      {/* 장바구니 상품 */}
      <div className="flex flex-col gap-5">
        {/* 브랜드별 */}
        {brandNames.map((brand, index) => (
          <div className="bg-Grey-30 p-2" key={index}>
            <div>
              <input
                type="checkbox"
                checked={brandChecked(brand)}
                onChange={(e) => toggleBrand(brand, e.target.checked)}
              />
              <span>{brand}</span>
            </div>
            {/* 상품 목록 */}
            <ul className="flex flex-col gap-2">
              {brandItems[index]?.map((item) => {
                return (
                  <li className="flex gap-2 bg-white p-2" key={item.id}>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => toggleItem(item.id, e.target.checked)}
                    />
                    <div className="flex gap-2 w-[150px] h-[150px]">
                      <img
                        src="https://picsum.photos/200"
                        alt="상품 이미지"
                        className="w-full h-full object-cover"
                      />
                      <div className="flex flex-col gap-2">
                        <div>{item.상품명}</div>
                        <div>옵션: 옵션1</div>
                        <div className="flex gap-2">
                          <div>{item.할인율}%</div>
                          <div className="line-through">{item.가격}원</div>
                          <div>
                            {item.가격 - (item.가격 * item.할인율) / 100}원
                          </div>
                        </div>
                        <div className="w-[300px] border flex items-center justify-between">
                          <button>-</button>
                          <span>1</span>
                          <button>+</button>
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
    </div>
  );
};

export default CartPage;
