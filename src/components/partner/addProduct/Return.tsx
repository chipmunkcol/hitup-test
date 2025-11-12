import PortalLayout from '@/components/common/layout/PortalLayout';
import AddressList from '@/components/common/modals/partner/AddressList';
import { commonRules } from '@/data/const/regex';
import usePortal from '@/hooks/usePortal';
import { Button, Form, Input, Select } from 'antd';

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

const Return = () => {
  const { closePortal, isPortalOpen, openPortal } = usePortal();

  return (
    <div className="flex flex-col gap-4">
      {/* 반품/교환 택배사* */}
      <Form.Item label="반품/교환 택배사" name="returnDeliveryCompany">
        <Select
          defaultValue={'CJ대한통운'}
          options={택배사옵션}
          style={{ width: '200px' }}
        />
      </Form.Item>

      {/* 반품배송비(편도) */}
      <Form.Item label="반품배송비(편도)" name="returnDeliveryFee">
        <Input suffix="원" style={{ width: '200px' }} />
      </Form.Item>

      {/* 교환배송비(왕복) */}
      <Form.Item label="교환배송비(왕복)" name="exchangeDeliveryFee">
        <Input suffix="원" style={{ width: '200px' }} />
      </Form.Item>

      {/* 반품/교환지 */}
      <Form.Item label="반품/교환지" name="returnExchangeAddress">
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
          <AddressList closePortal={closePortal} title="return" />
        </PortalLayout>
      )}
    </div>
  );
};

export default Return;
