import AfterService from '@/components/partner/addProduct/AfterService';
import Category from '@/components/partner/addProduct/Category';
import Delivery from '@/components/partner/addProduct/Delivery';
import DisclosureNotice from '@/components/partner/addProduct/DisclosureNotice';
import MainInfo from '@/components/partner/addProduct/MainInfo';
import Option from '@/components/partner/addProduct/Option';
import OptionCustom from '@/components/partner/addProduct/OptionCustom';
import Product from '@/components/partner/addProduct/Product';
import ProductImage from '@/components/partner/addProduct/ProductImage';
import DetailPageImageComponent from '@/components/partner/addProduct/ProductImageDetail';
import Return from '@/components/partner/addProduct/Return';
import { enum_options } from '@/data/const/const';
import { useAddProductStore } from '@/store/useAddProductStore';
import { convertTextTo상품상세참조 } from '@/utils/function';
import { Button, Form } from 'antd';
import { useEffect } from 'react';

const AddProduct = () => {
  const { 상품상세, setMode } = useAddProductStore();
  const [form] = Form.useForm();

  useEffect(() => {
    if (상품상세) {
      setMode('manual');
    }

    convertTextTo상품상세참조(상품상세, form);
  }, [상품상세]);

  const onSubmit = (values: any) => {
    // const values = form.getFieldsValue();
    console.log('values: ', values);

    // Form.Item을 조건부로 호출해서 option 값 갯수가 초기값이없는경우엔 1로 보고 처리해도 괜찮을듯
    // console.log('옵션갯수 초기값 설정 되나?', values.optionLength);
    // console.log('radiogroupForDelivery: ', values.extraDeliveryFee);
    console.log('afterServiceInfo: ', values.afterServiceInfo);
  };

  return (
    <Form
      form={form}
      labelCol={{
        style: {
          width: '100px',
          display: 'inline-block',
          whiteSpace: 'normal',
          wordBreak: 'keep-all',
          lineHeight: '1.4',
        },
      }}
      wrapperCol={{ flex: 'auto' }}
      labelAlign="left"
      initialValues={{
        disclosureProductGroup: enum_options.addProduct상품군[0].value,
        optionLength: 1,
      }}
      onFinish={onSubmit}
    >
      <div className="p-4 border-b border-b-Grey-30">상품 등록</div>
      {/* 카테고리 컴포넌트 */}
      {/* 카테고리 컴포넌트 */}
      <Category />

      {/* 상품 명/가격/재고 컴포넌트 */}
      {/* 상품 명/가격/재고 컴포넌트 */}

      <Product />

      <div className="p-4 ">
        <div className="border border-Grey-30 rounded-md p-4 flex flex-col gap-5">
          <div>옵션</div>
          {/* 옵션 컴포넌트 */}
          {/* 옵션 컴포넌트 */}
          <Option />

          {/* 옵션 커스텀 컴포넌트 */}
          {/* 옵션 커스텀 컴포넌트 */}
          <OptionCustom />
        </div>
      </div>

      {/* 상품 이미지 */}
      <LayoutArea title="상품이미지 ">
        <ProductImage />
      </LayoutArea>

      {/* 상세페이지 이미지 */}
      <LayoutArea title="상세페이지 이미지">
        <DetailPageImageComponent />
      </LayoutArea>

      {/* 상품 주요정보 */}
      <LayoutArea title="상품 주요정보">
        <MainInfo />
      </LayoutArea>

      {/* 상품정보제공고시 */}
      <LayoutArea title="상품정보제공고시">
        <DisclosureNotice />
      </LayoutArea>

      {/* 배송 */}
      <LayoutArea title="배송">
        <Delivery />
      </LayoutArea>

      {/* 반품/교환 */}
      <LayoutArea title="반품/교환">
        <Return />
      </LayoutArea>

      {/* A/S 특이사항 */}
      <LayoutArea title="A/S 특이사항">
        <AfterService />
      </LayoutArea>

      {/* 저장하기 폼 제출 */}
      <div className="w-full flex justify-center gap-4">
        <Button>취소</Button>
        <Button htmlType="submit" type="primary" onClick={() => {}}>
          저장하기
        </Button>
      </div>
    </Form>
  );
};

export default AddProduct;

interface LayoutAreaProps {
  title: string;
  children: React.ReactNode;
}

const LayoutArea = ({ title, children }: LayoutAreaProps) => {
  return (
    <div className="p-4 ">
      <div className="border border-Grey-30 rounded-md p-4">
        <div className="text-sm font-semibold pb-4">{title}</div>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
};
