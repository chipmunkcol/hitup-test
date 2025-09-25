import { useEffect, useState } from 'react';
import { groupByBrand } from '../utils/function';

interface UseCartProps {
  data: any[];
}

const useCart = ({ data: cartItems }: UseCartProps) => {
  // 장바구니 상태
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

  return {
    toggleAll,
    toggleBrand,
    toggleItem,
    allChecked,
    brandChecked,
    brandNames,
    brandItems,

    총결제금액,
    총상품금액,
    총배송비,

    브랜드별총금액,
    브랜드별배송비,
  };
};
export default useCart;
