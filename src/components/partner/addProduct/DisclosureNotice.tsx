import { swalLawAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { enum_options, type ProductType } from '@/data/const/const';
import { useAddProductStore } from '@/store/useAddProductStore';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Space,
} from 'antd';
import { useState } from 'react';

const commonRules = [
  { required: true, message: '필수 정보를 입력해주세요' },
  { max: 200, message: '최대 200자까지 입력 가능합니다' },
];

const DisclosureNotice = () => {
  const { onClick상품상세참조 } = useAddProductStore();

  // 라디오 선택 상태
  const [isRadioOpen, setIsRadioOpen] = useState({
    radio1: false,
    radio2: false,
    radio3: false,
    radio4: false,
    radio5: false,
  });

  type IsRadioOpen = keyof typeof isRadioOpen;

  // 직접 입력값 상태
  const [directInputValues, setDirectInputValues] = useState({
    radio1: '',
    radio2: '',
    radio3: '',
    radio4: '',
    radio5: '',
  });

  const onChangeDirectInput = (name: IsRadioOpen, value: string) => {
    setDirectInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openDirectInput = (name: IsRadioOpen, value: number) => {
    setIsRadioOpen((prev) => ({
      ...prev,
      [name]: value === 3 ? true : false,
    }));
  };

  const openPopupAndDirectInput = async (name: IsRadioOpen, value: number) => {
    if (value === 3) {
      const res = await swalLawAlert();
      if (!res.isConfirmed) return null;
      openDirectInput(name, value);
    }
  };

  // 상품군에 따라 필수값 변경
  const [productType, setProductType] = useState<ProductType>('스포츠용품');
  // console.log('productType: ', productType);

  const changeProductType = (value: ProductType) => {
    setProductType(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <Form.Item label="설정여부*" name="disclosureSetting">
        <div className="flex gap-2 items-center">
          <Button type="primary">설정함</Button>
          <Button>설정안함</Button>

          {/* antd Input checkbox */}
          <Checkbox>템플릿 등록</Checkbox>
        </div>
      </Form.Item>

      <div className="flex gap-4 items-baseline">
        <Form.Item
          label="상품군*"
          name="disclosureProductGroup"
          rules={commonRules}
          // initialValue={enum_options.addProduct상품군[0].value}
        >
          <Select
            style={{ width: 200 }}
            // defaultValue={enum_options.addProduct상품군[0].value}
            options={enum_options.addProduct상품군}
            onChange={(value) => changeProductType(value as ProductType)}
          />
        </Form.Item>

        <Checkbox onChange={(e) => onClick상품상세참조(e.target.checked)}>
          상품상세 참조로 전체 입력
        </Checkbox>
      </div>

      {productType === '스포츠용품' && <SportingGoods />}
      {productType === '의류' && <Clothes />}
      {productType === '신발' && <Shoes />}
      {productType === '상품권' && <Giftcard />}

      {/* 공통 부분 */}
      {/* 공통 부분 */}
      {/* 공통 부분 */}
      {/* 공통 부분 */}
      {/* 공통 부분 */}

      {/* 상품 정보 제공 고시에 관한 사항 */}
      <div>
        제품하자·오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및
        통신판매업자가 부담하는 반품비용 등에 관한 정보
      </div>
      <Form.Item>
        <Radio.Group
          onChange={(e) => openPopupAndDirectInput('radio1', e.target.value)}
          defaultValue={1}
        >
          <Space direction="vertical">
            <Radio value={1} className="whitespace-normal">
              전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 제품의 하자
              또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월
              이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에
              청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.
            </Radio>
            <Radio value={2}>상품상세 참조</Radio>
            <Radio value={3}>직접입력</Radio>
          </Space>
        </Radio.Group>
        {isRadioOpen.radio1 && (
          <Input
            onChange={(e) => onChangeDirectInput('radio1', e.target.value)}
          />
        )}
      </Form.Item>

      <div>
        제품하자가 아닌 소비자의 단순변심에 따른 청약철회등이 불가능한 경우 그
        구체적 사유와 근거
      </div>
      <Form.Item>
        <Radio.Group
          onChange={(e) => openPopupAndDirectInput('radio2', e.target.value)}
          defaultValue={1}
        >
          <Space direction="vertical">
            <Radio value={1} className="whitespace-normal">
              전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한
              사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로
              인정되는 경우 청약철회가 제한될 수 있습니다.
            </Radio>
            <Radio value={2}>상품상세 참조</Radio>
            <Radio value={3}>직접입력</Radio>
          </Space>
        </Radio.Group>
        {isRadioOpen.radio2 && (
          <Input
            onChange={(e) => onChangeDirectInput('radio2', e.target.value)}
          />
        )}
      </Form.Item>

      <div>재화등의 교환·반품·보증 조건 및 품질보증기준</div>
      <Form.Item>
        <Radio.Group
          onChange={(e) => openDirectInput('radio3', e.target.value)}
          defaultValue={1}
        >
          <Space direction="vertical">
            <Radio value={1} className="whitespace-normal">
              소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.
            </Radio>
            <Radio value={2}>상품상세 참조</Radio>
            <Radio value={3}>직접입력</Radio>
          </Space>
        </Radio.Group>
        {isRadioOpen.radio3 && (
          <Input
            className="w-full"
            onChange={(e) => onChangeDirectInput('radio3', e.target.value)}
          />
        )}
      </Form.Item>

      <div>
        대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수
        있다는 지연배상금 지급의 구체적인 조건·절차
      </div>
      <Form.Item>
        <Radio.Group
          onChange={(e) => openDirectInput('radio4', e.target.value)}
          defaultValue={1}
        >
          <Space direction="vertical">
            <Radio value={1} className="whitespace-normal">
              주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수
              있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의
              청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에
              지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는
              지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수
              있습니다.
            </Radio>
            <Radio value={2}>상품상세 참조</Radio>
            <Radio value={3}>직접입력</Radio>
          </Space>
        </Radio.Group>
        {isRadioOpen.radio4 && (
          <Input
            onChange={(e) => onChangeDirectInput('radio4', e.target.value)}
          />
        )}
      </Form.Item>

      <div>
        소비자피해보상의 처리, 재화등에 대한 불만 처리 및 소비자와 사업자 사이의
        분쟁처리에 관한 사항
      </div>
      <Form.Item>
        <Radio.Group
          onChange={(e) => openDirectInput('radio5', e.target.value)}
          defaultValue={1}
        >
          <Space direction="vertical">
            <Radio value={1} className="whitespace-normal">
              소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.
            </Radio>
            <Radio value={2}>상품상세 참조</Radio>
            <Radio value={3}>직접입력</Radio>
          </Space>
        </Radio.Group>
        {isRadioOpen.radio5 && (
          <Input
            onChange={(e) => onChangeDirectInput('radio5', e.target.value)}
          />
        )}
      </Form.Item>
    </div>
  );
};

export default DisclosureNotice;

function Giftcard() {
  type Mode = 'date' | 'manual';
  const [mode, setMode] = useState<Mode>('date'); // 기본값: 캘린더

  const handleChange = (value: Mode) => {
    setMode(value);
  };
  return (
    <>
      {/* 발행자 */}
      <Form.Item label="발행자" name="giftcard-issuer" rules={commonRules}>
        <Input />
      </Form.Item>

      {/* 유효기간 */}
      {/* 모드 선택 */}
      <div className="flex ">
        <div className="w-[100px] ">
          <span className="text-red-500 text-lg mr-1"> *</span>유효기간
        </div>
        <div>
          <Radio.Group
            onChange={(e) => handleChange(e.target.value)}
            value={mode}
          >
            <Radio value="date">캘린더 선택</Radio>
            <Radio value="manual">직접 입력</Radio>
          </Radio.Group>

          {/* 제조연월 */}
          <Form.Item
            name="giftcard-validityPeriod"
            rules={[{ required: true, message: '유효기간을 입력해주세요' }]}
          >
            {/* 출시연월  */}
            {mode === 'date' ? (
              <div className="flex gap-5 items-center">
                <DatePicker
                  picker="month"
                  placeholder=""
                  style={{ width: '100%' }}
                />
                <div>~</div>
                <DatePicker
                  picker="month"
                  placeholder=""
                  style={{ width: '100%' }}
                />
              </div>
            ) : (
              <Input placeholder="예: 2024-11" />
            )}
          </Form.Item>
        </div>
      </div>

      {/* 이용조건 */}
      <Form.Item
        label="이용조건"
        name="giftcard-usageConditions"
        rules={commonRules}
      >
        <Input />
      </Form.Item>

      {/* 전액 환급 조건 */}
      <Form.Item
        label="전액 환급 조건"
        name="giftcard-fullRefundConditions"
        rules={commonRules}
      >
        <Input.TextArea />
      </Form.Item>

      {/* 소비자 상담 연락처 */}
      <Form.Item
        label="소비자 상담 연락처"
        name="giftcard-customerServiceContact"
        rules={commonRules}
      >
        <Input />
      </Form.Item>
    </>
  );
}

function Shoes() {
  return (
    <>
      {/* 제품 소재 */}
      <Form.Item label="제품 소재" name="shoes-material" rules={commonRules}>
        <Input.TextArea />
        <div>운동화인 경우에는 겉감, 안감을 구분하여 표시</div>
      </Form.Item>

      {/* 색상 */}
      <Form.Item label="색상" name="shoes-color" rules={commonRules}>
        <Input />
      </Form.Item>

      {/* 발길이 */}
      <Form.Item label="발길이" name="shoes-length" rules={commonRules}>
        <Input />
      </Form.Item>

      {/* 궆높이 */}
      <Form.Item label="굽높이" name="shoes-heelHeight" rules={commonRules}>
        <Input placeholder="없는 경우 0 입력" />
        <div>굽 재료를 사용하는 신발에 한함 (단위 : cm)</div>
      </Form.Item>

      {/* 제조사 */}
      <Form.Item label="제조사" name="shoes-manufacturer" rules={commonRules}>
        <Input />
      </Form.Item>

      {/* 취급시 주의사항 */}
      <Form.Item
        label="취급시 주의사항"
        name="shoes-careInstructions"
        rules={commonRules}
        // style={{ whiteSpace: 'normal' }}
        labelCol={{ style: { width: '100px', whiteSpace: 'normal' } }}
      >
        <Input.TextArea />
      </Form.Item>

      {/* 품질보증기준 */}
      <Form.Item
        label="품질보증기준"
        name="shoes-warrantyStandard"
        rules={commonRules}
      >
        <Input.TextArea />
      </Form.Item>

      {/* A/S 연락처 */}
      <Form.Item label="A/S 연락처" name="shoes-asContact" rules={commonRules}>
        <Input />
      </Form.Item>
    </>
  );
}

// 의류용품
// 의류용품
// 의류용품
// 의류용품
// 의류용품
// 의류용품

function Clothes() {
  type Mode = 'date' | 'manual';
  const [mode, setMode] = useState<Mode>('date'); // 기본값: 캘린더

  const handleChange = (value: Mode) => {
    setMode(value);
  };

  return (
    <>
      {/* 제품 소재 */}
      <Form.Item label="제품 소재" name="clothes-material" rules={commonRules}>
        <Input.TextArea />
      </Form.Item>

      {/* 색상 */}
      <Form.Item label="색상" name="clothes-color" rules={commonRules}>
        <Input />
      </Form.Item>

      {/* 치수 */}
      <Form.Item label="치수" name="clothes-size" rules={commonRules}>
        <Input />
      </Form.Item>

      {/* 제조사 */}
      <Form.Item label="제조사" name="clothes-manufacturer" rules={commonRules}>
        <Input />
      </Form.Item>

      {/* 세탁방법 및 
      취급시 주의 사항 */}
      <Form.Item
        label="세탁방법 및 취급시 주의 사항"
        name="clothes-careInstructions"
        labelCol={{
          flex: '100px',
          // style: {
          //   whiteSpace: 'normal',
          //   width: '100px',
          //   height: '100px',
          //   display: 'flex',
          //   alignItems: 'center',
          // },
        }}
        rules={commonRules}
      >
        <Input.TextArea />
      </Form.Item>

      {/* 모드 선택 */}
      <div className="flex ">
        <div className="w-[100px] ">
          <span className="text-red-500 text-lg mr-1"> *</span>출시연월
        </div>
        <div>
          <Radio.Group
            onChange={(e) => handleChange(e.target.value)}
            value={mode}
          >
            <Radio value="date">캘린더 선택</Radio>
            <Radio value="manual">직접 입력</Radio>
          </Radio.Group>

          {/* 제조연월 */}
          <Form.Item
            // label="제조연월"
            name="disclosureReleaseDate"
            rules={[{ required: true, message: '출시연월을 입력해주세요' }]}
          >
            {/* 출시연월  */}
            {mode === 'date' ? (
              <DatePicker
                picker="month"
                placeholder="출시연월을 선택하세요"
                style={{ width: '100%' }}
              />
            ) : (
              <Input placeholder="예: 2024-11" />
            )}
          </Form.Item>
        </div>
      </div>

      {/* 품질보증기준 */}
      <Form.Item
        label="품질보증기준"
        name="clothes-warrantyStandard"
        rules={commonRules}
      >
        <Input.TextArea />
      </Form.Item>

      {/* A/S 연락처 */}
      <Form.Item
        label="A/S 연락처"
        name="clothes-asContact"
        rules={commonRules}
      >
        <Input />
      </Form.Item>
    </>
  );
}

// 스포츠용품
// 스포츠용품
// 스포츠용품
// 스포츠용품
// 스포츠용품
// 스포츠용품
function SportingGoods() {
  const [mode, setMode] = useState<'date' | 'manual'>('date'); // 기본값: 캘린더

  const handleChange = (e: any) => {
    setMode(e.target.value);
  };

  return (
    <>
      {/* 품명 */}
      <Form.Item label="품명" name="sports-productName" rules={commonRules}>
        <Input placeholder="품명을 입력하세요" />
      </Form.Item>

      {/* 모델명 */}
      <Form.Item label="모델명" name="disclosureModelName" rules={commonRules}>
        <Input placeholder="모델명을 입력하세요" />
      </Form.Item>

      {/* KC 인증번호 */}
      <Form.Item
        label="KC 인증번호"
        name="disclosureKCCertificationNumber"
        rules={commonRules}
      >
        <Input placeholder="KC 인증번호를 입력하세요" />
      </Form.Item>

      {/* 크기 */}
      <Form.Item label="크기" name="disclosureSize" rules={commonRules}>
        <Input placeholder="크기를 입력하세요" />
      </Form.Item>

      {/* 중량 */}
      <Form.Item label="중량" name="disclosureWeight" rules={commonRules}>
        <Input placeholder="중량을 입력하세요" />
      </Form.Item>

      {/* 색상 */}
      <Form.Item label="색상" name="disclosureColor" rules={commonRules}>
        <Input placeholder="색상을 입력하세요" />
      </Form.Item>

      {/* 재질 */}
      <Form.Item label="재질" name="disclosureMaterial" rules={commonRules}>
        <Input placeholder="재질을 입력하세요" />
      </Form.Item>

      {/* 제품구성 */}
      <Form.Item
        label="제품구성"
        name="disclosureProductComposition"
        rules={commonRules}
      >
        <Input.TextArea placeholder="제품구성을 입력하세요" />
      </Form.Item>

      {/* 출시연월 */}
      <Form.Item
        label="출시연월"
        name="disclosureReleaseDate"
        rules={[{ required: true, message: '출시연월을 입력해주세요' }]}
      >
        {/* 모드 선택 */}
        <Radio.Group onChange={handleChange} value={mode}>
          <Radio value="date">캘린더 선택</Radio>
          <Radio value="manual">직접 입력</Radio>
        </Radio.Group>

        {/* 출시연월  */}
        {mode === 'date' ? (
          <DatePicker
            picker="month"
            placeholder="출시연월을 선택하세요"
            style={{ width: '100%' }}
          />
        ) : (
          <Input placeholder="예: 2024-11" />
        )}
      </Form.Item>

      {/* 제조사 */}
      <Form.Item
        label="제조사"
        name="disclosureManufacturer"
        rules={commonRules}
      >
        <Input placeholder="제조사를 입력하세요" />
      </Form.Item>

      {/* 상푸별 세부사양 */}
      <Form.Item
        label="상품별 세부사양"
        name="disclosureProductSpecification"
        rules={commonRules}
      >
        <Input.TextArea placeholder="상품별 세부사양을 입력하세요" />
      </Form.Item>

      {/* 품질보증기준 */}
      <Form.Item
        label="품질보증기준"
        name="disclosureWarrantyStandard"
        rules={commonRules}
      >
        <Input.TextArea placeholder="품질보증기준을 입력하세요" />
      </Form.Item>

      {/* A/S 연락처 */}
      <Form.Item
        label="A/S 연락처"
        name="disclosureASContact"
        rules={commonRules}
      >
        <Input placeholder="A/S 연락처를 입력하세요" />
      </Form.Item>
    </>
  );
}
