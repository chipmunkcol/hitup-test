import LabelLayout from '@/components/common/layout/partner/LabelLayout';
import { Button, Checkbox, Form, Input } from 'antd';

const AfterService = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* A/S 전화번호 */}

      <LabelLayout label="A/S 전화번호">
        <div className="flex gap-4">
          <Form.Item name="afterServicePhone">
            <Input style={{ width: '200px' }} />
          </Form.Item>
          <div>
            <Button>템플릿</Button>
          </div>
          <div className="flex items-center">
            <Checkbox>템플릿 등록</Checkbox>
          </div>
        </div>
      </LabelLayout>

      {/* A/S 안내 */}
      <LabelLayout label="A/S 안내">
        <Form.Item name="afterServiceInfo">
          <Input.TextArea
            placeholder="A/S 관련 안내사항을 입력해주세요."
            rows={4}
            maxLength={500}
          />
        </Form.Item>
        <div>
          법률에 근거하지 않은 판매자의 임의적인 A/S 규정 및 청약철회 기준 안내
          시, 이용정지 및 관련 법에 의거하여 제재될 수 있습니다.
        </div>
      </LabelLayout>

      {/* 판매자 특이사항 */}
      <LabelLayout label="판매자 특이사항">
        <Form.Item name="sellerSpecialInfo">
          <Input.TextArea
            placeholder="판매자 특이사항을 입력해주세요."
            rows={4}
            maxLength={500}
          />
        </Form.Item>
        <div>
          · 청약철회, 배송기간 및 방법, 교환/반품의 보증 및 추가비용,
          판매일시/판매지역/판매수량/인도지역 등과 관련해서 특이사항이 있는
          경우, 해외배송상품인 경우 입력합니다.
        </div>
        <div>
          · 법률에 근거하지 않은 판매자의 임의적인 판매규정 및 청약철회 기준
          안내 시, 이용정지 및 관련 법에 의거하여 제재될 수 있습니다.
        </div>
      </LabelLayout>
    </div>
  );
};

export default AfterService;
