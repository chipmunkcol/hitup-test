import Category from '@/components/partner/addProduct/Category';
import DisclosureNotice from '@/components/partner/addProduct/DisclosureNotice';
import MainInfo from '@/components/partner/addProduct/MainInfo';
import Option from '@/components/partner/addProduct/Option';
import OptionCustom from '@/components/partner/addProduct/OptionCustom';
import Product from '@/components/partner/addProduct/Product';
import ProductImage from '@/components/partner/addProduct/ProductImage';
import DetailPageImageComponent from '@/components/partner/addProduct/ProductImageDetail';
import { enum_options } from '@/data/const/const';
import { useAuthStore } from '@/store/partner/useAuthStore';
import { useAddProductStore } from '@/store/useAddProductStore';
import { 파트너스토큰갱신 } from '@/utils/api/partnerApi';
import { useMutation } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';

const AddProduct = () => {
  const { partnerAuth, setPartnerAuth } = useAuthStore();
  console.log('partnerAuth: ', partnerAuth);
  // 전역상태로 관리
  const [render, setRender] = useState(false);
  const { 상품상세 } = useAddProductStore();
  const [form] = Form.useForm();

  // 로그인 유무 체크 (지금은 임시로 addProduct에서 하나 나중엔 파트너 상위 컴포넌트에서 진행)
  useEffect(() => {
    if (!partnerAuth) return;

    const { refreshTokenExpiredDate, accessTokenExpiredDate, refreshToken } =
      partnerAuth.partnersMemberToken;
    if (refreshTokenExpiredDate < Date.now()) {
      alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      // + 로그인 페이지로 이동
    }

    if (accessTokenExpiredDate < Date.now()) {
      alert('토큰이 만료되어 갱신합니다. 디버깅해보죠!');
      // 토큰 재발급 로직
      파트너스토큰갱신(refreshToken);
    }
  }, [partnerAuth]);
  // useEffect(() => {
  //   if (!partnerAuth) return;

  //   const { refreshToken } = partnerAuth.partnersMemberToken;

  //   partnerTokenRefresh(refreshToken);
  // }, [상품상세]);

  const { mutate: partnerTokenRefresh } = useMutation({
    mutationFn: 파트너스토큰갱신,
    onSuccess: (data) => {
      console.log('파트너스토큰갱신 성공: ', data);
      setPartnerAuth({
        partnersMemberToken: data,
      });
    },
    onError: (error) => {
      console.error('파트너스토큰갱신 실패: ', error);
      alert(error || '토큰 갱신에 실패했습니다. 다시 시도해주세요.');
    },
  });

  useEffect(() => {
    if (상품상세) {
      setRender((prev) => !prev);
      // form.setFieldsValue('disclosureProductName', '상품상세 참조');
      form.setFieldValue('sports-name', '상품상세 참조');
    }
  }, [상품상세]);

  const onSubmit = (values: any) => {
    // const values = form.getFieldsValue();
    console.log('values: ', values);
  };

  return (
    <div className="h-full w-full ">
      <div className="h-full flex">
        <div className="h-[-webkit-fill-available] flex-1 min-w-[250px] bg-Grey-10">
          <div>
            <div className="p-4">히트업몰 파트너</div>
            <div className="p-4 flex justify-center items-center gap-5">
              <div className="w-[100px] h-[100px] rounded-full bg-Grey-05"></div>
              <div>{partnerAuth?.brandNameKo || ''}</div>
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
