import { useEffect, useState } from 'react';
import { groupByBrand } from '../utils/function';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CartItem } from '../data/CartData';
import axios from 'axios';

interface UseCartProps {
  data: CartItem[];
}

// Cartitem에 checked 속성 추가
export interface CartItemWithChecked extends CartItem {
  checked: boolean;
}

const useCart = ({ data: cartItems }: UseCartProps) => {
  // 장바구니 상태
  const [cart, setCart] = useState<CartItemWithChecked[]>([]);

  useEffect(() => {
    // if (cartItems?.length > 0) {
    if (cartItems) {
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
          ? total + (item.가격 - (item.가격 * item.할인율) / 100) * item.수량
          : total,
      0
    )
  );
  const 총선택상품금액 = brandItems.map((items) =>
    items.reduce(
      (total, item) => (item.checked ? total + item.가격 * item.수량 : total),
      0
    )
  );
  const 총할인금액 = cart.reduce(
    (sum, item) =>
      item.checked ? sum + ((item.가격 * item.할인율) / 100) * item.수량 : sum,
    0
  );

  const 브랜드별배송비: number[] = 총선택상품금액.map((amount) =>
    amount === 0 ? 0 : amount >= 30000 ? 0 : 2500
  );
  console.log('브랜드별배송비: ', 브랜드별배송비);

  const 총상품금액 = 총선택상품금액.reduce((sum, amount) => sum + amount, 0);
  const 총배송비 = 브랜드별배송비.reduce((sum, amount) => sum + amount, 0);

  console.log('총배송비: ', 총배송비);

  const 주문상품금액 = 총상품금액 - 총할인금액;
  const 총결제금액 = 총상품금액 + 총배송비 - 총할인금액;

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

  // useMutation 장바구니 업데이트 로직
  // usemutation으로 장바구니 수량 변경
  // 낙관적 ui 업데이트
  const queryClient = useQueryClient();
  const { mutate: updateCartItem } = useMutation({
    mutationFn: (updateItem: Partial<CartItem>) => {
      return axios.put(`/cart/${updateItem.id}`, updateItem);
    },
    // 낙관적 업데이트
    onMutate: async (updateItem: Partial<CartItem>) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCart = queryClient.getQueryData<CartItem[]>(['cart']);

      // 낙관적 UI 업데이트 (임시 변경)
      if (previousCart) {
        queryClient.setQueryData<CartItem[]>(['cart'], (old) =>
          old
            ? old
                .map((item) =>
                  item.id === updateItem.id ? { ...item, ...updateItem } : item
                )
                // 수량이 0인 아이템은 제거 ?
                .filter((item) => item.수량 > 0)
            : []
        );
      }

      // rollback을 위해 이전 데이터 반환
      return { previousCart };
    },
    onError: (err, _, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
      alert('장바구니 수량 변경 실패: ' + err);
    },
    onSuccess: () => {
      // alert('장바구니 수량 변경 성공');
    },
    // onSettled: () => {
    //   서버와 동기화
    //   queryClient.invalidateQueries({ queryKey: ["cart"] });
    //   alert('장바구니 수량 변경 성공');
    // },
  });

  const handleUpdateCartItem = {
    increase: (item: CartItem) => {
      updateCartItem({ id: item.id, 수량: item.수량 + 1 });
    },
    decrease: (item: CartItem) => {
      if (item.수량 > 1) {
        updateCartItem({ id: item.id, 수량: item.수량 - 1 });
      }
    },
    // remove: (item: CartItem) => {
    //   updateCartItem({ id: item.id, 수량: 0 });
    // },
  };

  const { mutate: handleRemoveCartItem } = useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('장바구니에서 상품이 삭제되었습니다.');
    },
  });

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
    총할인금액,

    브랜드별총금액,
    총선택상품금액,
    브랜드별배송비,

    주문상품금액,

    handleUpdateCartItem,
    handleRemoveCartItem,
  };
};
export default useCart;
