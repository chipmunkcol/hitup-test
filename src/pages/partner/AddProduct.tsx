import Category from '@/components/partner/addProduct/Category';
import DisclosureNotice from '@/components/partner/addProduct/DisclosureNotice';
import MainInfo from '@/components/partner/addProduct/MainInfo';
import Option from '@/components/partner/addProduct/Option';
import OptionCustom from '@/components/partner/addProduct/OptionCustom';
import Product from '@/components/partner/addProduct/Product';
import ProductImage from '@/components/partner/addProduct/ProductImage';
import DetailPageImageComponent from '@/components/partner/addProduct/ProductImageDetail';
import { enum_options } from '@/data/const/const';
import { useNavi } from '@/hooks/useNavi';
import { useAuthStore } from '@/store/partner/useAuthStore';
import { useAddProductStore } from '@/store/useAddProductStore';
import { Button, Form, type FormInstance } from 'antd';
import { useEffect, useState } from 'react';

const AddProduct = () => {
  const { 상품상세 } = useAddProductStore();
  const [form] = Form.useForm();

  const temp = (상품상세: boolean, form: FormInstance<any>) => {
    const productGroup = form.getFieldValue('disclosureProductGroup');
    switch (productGroup) {
      case '스포츠용품':
        if (상품상세) {
          form.setFieldValue('sports-productName', '상품상세 참조');
          form.setFieldValue('disclosureModelName', '상품상세 참조');
          form.setFieldValue(
            'disclosureKCCertificationNumber',
            '상품상세 참조'
          );
          form.setFieldValue('disclosureSize', '상품상세 참조');
          form.setFieldValue('disclosureWeight', '상품상세 참조');
          form.setFieldValue('disclosureColor', '상품상세 참조');
          form.setFieldValue('disclosureMaterial', '상품상세 참조');
          form.setFieldValue('disclosureProductComposition', '상품상세 참조');

          // Radio 값 변경 -> Input 값 변경
          // form.setFieldsValue({
          //   mode: 'manual',
          //   // disclosureReleaseDate: '상품상세 참조',
          // });
          form.setFieldValue('disclosureManufacturer', '상품상세 참조');
          form.setFieldValue('disclosureProductSpecification', '상품상세 참조');
          form.setFieldValue('disclosureWarrantyStandard', '상품상세 참조');
          form.setFieldValue('disclosureASContact', '상품상세 참조');
        } else {
          form.setFieldValue('sports-productName', '');
          form.setFieldValue('disclosureModelName', '');
          form.setFieldValue('disclosureKCCertificationNumber', '');
          form.setFieldValue('disclosureSize', '');
          form.setFieldValue('disclosureWeight', '');
          form.setFieldValue('disclosureColor', '');
          form.setFieldValue('disclosureMaterial', '');
          form.setFieldValue('disclosureProductComposition', '');
          form.setFieldValue('disclosureReleaseDate', '');
          form.setFieldValue('disclosureManufacturer', '');
          form.setFieldValue('disclosureProductSpecification', '');
          form.setFieldValue('disclosureWarrantyStandard', '');
          form.setFieldValue('disclosureASContact', '');
        }
        break;
      // 다른 상품군에 대한 처리 추가 가능
      default:
        break;
    }
  };

  useEffect(() => {
    temp(상품상세, form);
  }, [상품상세]);

  const onSubmit = (values: any) => {
    // const values = form.getFieldsValue();
    console.log('values: ', values);
  };

  return (
    <Form
      // className="flex-5"
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
