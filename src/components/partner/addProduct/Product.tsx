import { useAddProductStore } from '@/store/useAddProductStore';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

const Product = () => {
  const [product, setProduct] = useState({
    productName: '',
    price: {
      original: 0,
      instantDiscount: {
        isApplied: false,
        type: 'percent',
        value: 0,
      },
      taxType: '과세',
    },
    stock: 0,
  });

  const onChangeInput = (name: string, value: string) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const changeDiscountApplied = (isApplied: boolean) => {
    setProduct((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        instantDiscount: {
          ...prev.price.instantDiscount,
          isApplied,
        },
      },
    }));
  };

  const onChangePrice = (value: string) => {
    setProduct((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        original: Number(value),
      },
    }));
  };

  return (
    <>
      {/* 상품명 */}
      <div className="p-4 ">
        <div className="border border-Grey-30 rounded-md p-4">
          {/* <div>상품명*</div> */}
          <Form.Item
            label="상품명"
            name="productName"
            rules={[{ required: true, message: '상품명을 입력해주세요' }]}
          >
            <Input
              onChange={(e) => onChangeInput('productName', e.target.value)}
              // required
              placeholder="상품명을 입력해주세요"
            />
          </Form.Item>
        </div>
      </div>

      {/* 판매가 */}
      <div className="p-4 ">
        <div className="flex flex-col gap-2 border border-Grey-30 rounded-md p-4">
          <div className="flex items-center gap-5">
            {/* <div>판매가*</div>
            <div className="max-w-[200px]"> */}
            <Form.Item
              label="판매가"
              name="price"
              rules={[{ required: true, message: '판매가를 입력해주세요' }]}
            >
              <Input
                onChange={(e) => onChangePrice(e.target.value)}
                placeholder="숫자만 입력"
                // required
              />
            </Form.Item>
            {/* </div> */}
          </div>
          <div className="flex items-center gap-5">
            {/* <div>즉시할인*</div> */}
            <Form.Item label="즉시할인" name="instantDiscount">
              <div className="flex gap-2">
                <Button
                  type={
                    product.price.instantDiscount.isApplied
                      ? 'primary'
                      : 'default'
                  }
                  onClick={() => changeDiscountApplied(true)}
                >
                  설정함
                </Button>
                <Button
                  type={
                    product.price.instantDiscount.isApplied
                      ? 'default'
                      : 'primary'
                  }
                  onClick={() => changeDiscountApplied(false)}
                >
                  설정안함
                </Button>
              </div>
            </Form.Item>
          </div>

          {product.price.instantDiscount.isApplied && (
            // <div className="flex flex-col gap-2">
            <>
              <div className="flex gap-2">
                <div>할인액</div>
                <div>[data]</div>
              </div>
              <div className="flex  gap-2">
                <div>할인가</div>
                <div>[data]</div>
              </div>
            </>
          )}
          <div className="flex items-center gap-5">
            <div>부가세*</div>
            <div className="max-w-[200px]">과세상품</div>
          </div>
        </div>
      </div>

      {/* 재고수량 */}
      <div className="p-4 ">
        <div className="border border-Grey-30 rounded-md p-4">
          {/* <div>재고수량</div> */}
          <Form.Item
            label="재고수량"
            name="stock"
            rules={[{ required: true, message: '재고수량을 입력해주세요' }]}
          >
            <Input
              onChange={(e) => onChangeInput('stock', e.target.value)}
              required
              placeholder="숫자만 입력"
            />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default Product;
