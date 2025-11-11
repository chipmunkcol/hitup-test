import { commonRules } from '@/data/const/regex';
import useActiveBtn from '@/hooks/useActiveBtn';
import { Button, Form, Input } from 'antd';

const Product = () => {
  const { isActive, activeBtn, enableBtn } = useActiveBtn();

  return (
    <>
      {/* 상품명 */}
      <div className="p-4 ">
        <div className="border border-Grey-30 rounded-md p-4">
          {/* <div>상품명*</div> */}
          <Form.Item label="상품명" name="productName" rules={commonRules}>
            <Input placeholder="상품명을 입력해주세요" />
          </Form.Item>
        </div>
      </div>

      {/* 판매가 */}
      <div className="p-4 ">
        <div className="flex flex-col gap-2 border border-Grey-30 rounded-md p-4">
          <div className="flex items-center gap-5">
            {/* <div>판매가*</div>
            <div className="max-w-[200px]"> */}
            <Form.Item label="판매가" name="price" rules={commonRules}>
              <Input placeholder="숫자만 입력" />
            </Form.Item>
            {/* </div> */}
          </div>
          <div className="flex items-center gap-5">
            {/* <div>즉시할인*</div> */}
            <Form.Item label="즉시할인" name="instantDiscount">
              <div className="flex gap-2">
                <Button
                  type={isActive ? 'primary' : 'default'}
                  onClick={activeBtn}
                >
                  설정함
                </Button>
                <Button
                  type={isActive ? 'default' : 'primary'}
                  onClick={enableBtn}
                >
                  설정안함
                </Button>
              </div>
            </Form.Item>
          </div>

          {isActive && (
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
          <Form.Item label="재고수량" name="stock" rules={commonRules}>
            <Input placeholder="숫자만 입력" />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default Product;

// const [product, setProduct] = useState({
//   productName: '',
//   price: {
//     original: 0,
//     instantDiscount: {
//       isApplied: false,
//       type: 'percent',
//       value: 0,
//     },
//     taxType: '과세',
//   },
//   stock: 0,
// });

// const onChangeInput = (name: string, value: string) => {
//   setProduct((prev) => ({ ...prev, [name]: value }));
// };

// const changeDiscountApplied = (isApplied: boolean) => {
//   setProduct((prev) => ({
//     ...prev,
//     price: {
//       ...prev.price,
//       instantDiscount: {
//         ...prev.price.instantDiscount,
//         isApplied,
//       },
//     },
//   }));
// };

// const onChangePrice = (value: string) => {
//   setProduct((prev) => ({
//     ...prev,
//     price: {
//       ...prev.price,
//       original: Number(value),
//     },
//   }));
// };
