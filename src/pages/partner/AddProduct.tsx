import Category from '@/components/partner/addProduct/Category';
import DisclosureNotice from '@/components/partner/addProduct/DisclosureNotice';
import MainInfo from '@/components/partner/addProduct/MainInfo';
import Option from '@/components/partner/addProduct/Option';
import OptionCustom from '@/components/partner/addProduct/OptionCustom';
import Product from '@/components/partner/addProduct/Product';
import ProductImage from '@/components/partner/addProduct/ProductImage';
import DetailPageImageComponent from '@/components/partner/addProduct/ProductImageDetail';
import { enum_options } from '@/data/const/const';
import { useAddProductStore } from '@/store/useAddProductStore';
import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';

const AddProduct = () => {
  // 전역상태로 관리
  const [render, setRender] = useState(false);
  const { 상품상세 } = useAddProductStore();
  const [form] = Form.useForm();

  useEffect(() => {
    if (상품상세) {
      setRender((prev) => !prev);
      // form.setFieldsValue('disclosureProductName', '상품상세 참조');
      form.setFieldValue('sports-name', '상품상세 참조');
    }
  }, [상품상세]);

  const onSubmit = () => {
    const values = form.getFieldsValue();
    console.log('values: ', values);
  };

  useEffect(() => {
    const values = form.getFieldsValue();
    console.log('values: ', values);
  }, []);

  return (
    <div className="h-full w-full ">
      <div className="h-full flex">
        <div className="h-[-webkit-fill-available] flex-1 min-w-[250px] bg-Grey-10">
          <div>
            <div className="p-4">히트업몰 파트너</div>
            <div className="p-4 flex justify-center items-center gap-5">
              <div className="w-[100px] h-[100px] rounded-full bg-Grey-05"></div>
              <div>브랜드 A</div>
            </div>
            <div className="border border-Grey-50 px-4">
              <div className="py-4">상품 관리</div>
              <ul>
                <li className="py-2">상품 등록</li>
              </ul>
            </div>
          </div>
        </div>
        <Form
          className="flex-5"
          labelCol={{ style: { width: '100px' } }}
          wrapperCol={{ flex: 'auto' }}
          labelAlign="left"
          form={form}
          initialValues={{
            disclosureProductGroup: enum_options.addProduct상품군[0].value,
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

          {/* 저장하기 폼 제출 */}
          <div className="w-full flex justify-center gap-4">
            <Button>취소</Button>
            <Button htmlType="submit" type="primary" onClick={() => {}}>
              저장하기
            </Button>
          </div>
        </Form>
      </div>
    </div>
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
        <div>{title}</div>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
};
