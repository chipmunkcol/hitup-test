import PortalLayout from '@/components/common/layout/PortalLayout';
import AddressList from '@/components/common/modals/partner/AddressList';
import useActiveBtn from '@/hooks/useActiveBtn';
import useActiveBtnV2 from '@/hooks/useActiveBtnV2';
import usePortal from '@/hooks/usePortal';
import { Button, Form, Input, Radio, Select } from 'antd';
import useSelection from 'antd/es/table/hooks/useSelection';
import { useState } from 'react';

type T = '배송' | '배송없음' | '템플릿';

const 택배사옵션 = [
  { label: 'CJ대한통운', value: 'CJ대한통운' },
  { label: '롯데택배', value: '롯데택배' },
  { label: '한진택배', value: '한진택배' },
  { label: '우체국택배', value: '우체국택배' },
  { label: '로젠택배', value: '로젠택배' },
  { label: '경동택배', value: '경동택배' },
  { label: '농협택배', value: '농협택배' },
  { label: '합동택배', value: '합동택배' },
  { label: '일양로지스', value: '일양로지스' },
  { label: 'SLX택배', value: 'SLX택배' },
  { label: '기타택배', value: '기타택배' },
];

const radioOption = [
  { value: '2권역', label: '2권역' },
  { value: '3권역', label: '3권역' },
];

const 상품별배송비옵션 = [
  { label: '무료', value: '무료' },
  { label: '유료', value: '유료' },
  { label: '조건부 무료', value: '조건부무료' },
  { label: '수량별', value: '수량별' },
];

const Delivery = () => {
  // 배송, 배송없음, 템픞릿
  // const [selectedOption] = useState('배송');
  const { selected, onSelect } = useActiveBtnV2<T>('배송');
  const { isActive, activeBtn, enableBtn } = useActiveBtn();
  const [상품별배송비, set상품별배송비] = useState('무료');
  const onChange상불별배송비 = (value: string) => {
    set상품별배송비(value);
  };

  const [권역설정, set권역설정] = useState('2권역');
  const onChange권역설정 = (권역: string) => {
    set권역설정(권역);
  };

  const { closePortal, isPortalOpen, openPortal } = usePortal();
  return (
    <div className="flex flex-col gap-4">
      {/* 설정여부 */}
      <Form.Item label="설정 여부" name="deliveryOption">
        <div className="flex gap-2">
          <Button
            onClick={() => onSelect('배송')}
            type={selected === '배송' ? 'primary' : 'default'}
          >
            배송
          </Button>
          <Button
            onClick={() => onSelect('배송없음')}
            type={selected === '배송없음' ? 'primary' : 'default'}
          >
            배송없음
          </Button>
          <Button
            onClick={() => onSelect('템플릿')}
            type={selected === '템플릿' ? 'primary' : 'default'}
          >
            템플릿
          </Button>
        </div>
      </Form.Item>

      {/* 택배사 */}
      {/* 택배사 */}
      <Form.Item label="택배사" name="deliveryCompany">
        <Select
          defaultValue={'CJ대한통운'}
          options={택배사옵션}
          style={{ width: '200px' }}
        />
      </Form.Item>

      {/* 상품별 배송비 */}
      <Form.Item label="상품별 배송비" name="productDeliveryFee">
        <Select
          defaultValue="무료"
          options={상품별배송비옵션}
          style={{ width: '200px' }}
          onChange={onChange상불별배송비}
        />
      </Form.Item>

      {/* 기본 배송비 */}
      {상품별배송비 !== '무료' && (
        <Form.Item label="기본 배송비" name="basicDeliveryFee">
          <Input
            // placeholder="숫자만 입력해주세요. (단위: 원)"
            style={{ width: '200px' }}
            suffix="원"
          />
        </Form.Item>
      )}

      {/* 배송비 조건 */}
      {(상품별배송비 === '조건부무료' || 상품별배송비 === '수량별') && (
        <Form.Item label="배송비 조건" name="deliveryFeeCondition">
          <Input style={{ width: '200px' }} suffix="원" />
        </Form.Item>
      )}

      {/* 제주/도서산간 추가배송비 */}
      <div className="flex">
        <div className="w-[100px] pr-1">제주/도서산간 추가배송비</div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button onClick={activeBtn} type={isActive ? 'primary' : 'default'}>
              설정함
            </Button>
            <Button onClick={enableBtn} type={isActive ? 'default' : 'primary'}>
              설정안함
            </Button>
          </div>
          {isActive && (
            <>
              <div>
                <Form.Item label="권역 설정" name="radiogroupForDelivery">
                  <Radio.Group
                    // name="radiogroupForDelivery"
                    defaultValue={'2권역'}
                    options={radioOption}
                    onChange={(e) => onChange권역설정(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div>
                {권역설정 === '2권역' && (
                  <Form.Item
                    name="extraDeliveryFee"
                    label="제주 및 도서산간 추가배송비"
                    labelCol={{ style: { width: '200px' } }}
                  >
                    <Input style={{ width: '200px' }} suffix="원" />
                  </Form.Item>
                )}

                {/* 또는 제주 추가배송비, 제주 외 도서산간 추가배송비 */}
                {권역설정 === '3권역' && (
                  <Form.Item
                    name="extraDeliveryFeeForJeju"
                    label="제주 추가배송비"
                    labelCol={{ style: { width: '200px' } }}
                  >
                    <Input style={{ width: '200px' }} suffix="원" />
                  </Form.Item>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 지역별 차등 배송비 */}
      <div className="flex">
        <div className="w-[100px] pr-1">지역별 차등 배송비</div>

        <div className="flex-1">
          <Form.Item name="regionalDeliveryFee">
            <Input />
          </Form.Item>
          <div>
            묶음배송 가능인 경우 배송비 묶음그룹에 입력한 제주/도서산간
            추가배송비와 함께 노출됩니다.제주/도서산간을 제외한 지역별 차등
            배송비가 있는 경우에만 입력해주세요.
          </div>
        </div>
      </div>

      {/* 출고지 */}
      <Form.Item label="출고지" name="shippingLocation">
        <div className="flex gap-4">
          {/* 등록된 주소지들을 보여준다 */}
          <div>등록 된 출고지가 없어요</div>
          <Button onClick={openPortal}>판매자 주소록</Button>
        </div>
      </Form.Item>

      {/* 배송비 포탈 */}
      {/* 배송비 포탈 */}
      {isPortalOpen && (
        <PortalLayout title="주소지 목록" closePortal={closePortal}>
          <AddressList closePortal={closePortal} title="delivery" />
        </PortalLayout>
      )}
    </div>
  );
};

export default Delivery;
