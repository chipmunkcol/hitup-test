import { Button, DatePicker, Radio, Select } from 'antd';
import { useState } from 'react';
const importData = {
  라틴아메리카: ['멕시코', '브라질', '아르헨티나', '칠레'],
  북아메리카: ['미국', '캐나다', '그린란드'],
  아시아: ['중국', '일본', '베트남', '대한민국'],
  유럽: ['독일', '프랑스', '이탈리아', '영국'],
  아프리카: ['이집트', '남아프리카공화국', '나이지리아'],
  오세아니아: ['호주', '뉴질랜드', '피지'],
};

// 국산
const domesticData = {
  서울특별시: [
    '강남구',
    '강동구',
    '강북구',
    '관악구',
    '송파구',
    '서초구',
    '종로구',
  ],
  경기도: ['수원시', '성남시', '용인시', '고양시', '부천시', '안산시'],
  부산광역시: ['해운대구', '사하구', '남구', '북구', '중구', '동구'],
  제주특별자치도: ['제주시', '서귀포시'],
};

const MainInfo = () => {
  const [originType, setOriginType] = useState<string | null>(null); // 수입산 / 국산 / 기타
  const [region, setRegion] = useState<string | null>(null); // 시도 or 대륙
  const [subRegion, setSubRegion] = useState<string | null>(null); // 구 or 나라

  // ----------------------------
  // Select 변경 핸들러
  // ----------------------------
  const handleOriginChange = (value: string) => {
    setOriginType(value);
    setRegion(null);
    setSubRegion(null);
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    setSubRegion(null);
  };

  const handleSubRegionChange = (value: string) => {
    setSubRegion(value);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* KC 인증 */}
      <div className="flex gap-2">
        <div className="flex-1">KC 인증</div>
        <div className="flex-5 flex flex-col gap-2">
          <div>
            <Button>KC인증 있음</Button>
            <Button type="primary">KC인증 없음</Button>
          </div>
          <div>
            <Radio.Group
              name="radiogroup"
              defaultValue={1}
              options={[
                { value: 1, label: '구매대행' },
                { value: 2, label: '안전기준 준수' },
                { value: 3, label: 'KC 안전관리대상 아님' },
              ]}
            />
          </div>
          <div>
            KC인증이 필요한 상품을 인증 없이 판매하는 경우 3년 이하의 징역 또는
            3천만원 이하의 벌금형에 처해질 수 있습니다.인증대상 여부
            문의는 국가기술표준원 또는 제품안전정보센터로 확인해주시기
            바랍니다. 개정 전안법가이드북 보기어린이제품 및 방송통신기자재는
            개정 전안법 특례대상이 아니므로 구매대행 / 병행수입을 선택할 수
            없습니다.
          </div>
        </div>
      </div>

      {/* 원산지 */}
      <div className="flex gap-2">
        <div className="flex-1">원산지*</div>
        <div className="flex-5 flex gap-2">
          {/* <Select
            style={{ width: 200 }}
            defaultValue="대한민국"
            options={[
              { value: '대한민국', label: '대한민국' },
              { value: '중국', label: '중국' },
              { value: '일본', label: '일본' },
              { value: '미국', label: '미국' },
            ]}
          /> */}
          <div className="flex gap-3">
            {/* [2-1] 원산지 */}
            <Select
              placeholder="원산지를 선택하세요"
              value={originType || undefined}
              onChange={handleOriginChange}
              options={[
                { label: '국산', value: '국산' },
                { label: '수입산', value: '수입산' },
                { label: '기타', value: '기타' },
              ]}
            ></Select>

            {/* [2-2] 시·도 or 대륙 */}
            {originType && originType !== '기타' && (
              <Select
                placeholder={
                  originType === '국산'
                    ? '시·도 선택'
                    : originType === '수입산'
                      ? '대륙 선택'
                      : ''
                }
                value={region || undefined}
                onChange={handleRegionChange}
                options={(originType === '국산'
                  ? Object.keys(domesticData)
                  : Object.keys(importData)
                ).map((key) => (
                  <Select.Option key={key} value={key}>
                    {key}
                  </Select.Option>
                ))}
              ></Select>
            )}

            {/* [2-3] 시·군·구 or 나라 */}
            {region && (
              <Select
                placeholder={
                  originType === '국산'
                    ? '시·군·구 선택'
                    : originType === '수입산'
                      ? '나라 선택'
                      : ''
                }
                value={subRegion || undefined}
                onChange={handleSubRegionChange}
              >
                {(originType === '국산'
                  ? domesticData[region as keyof typeof domesticData]
                  : importData[region as keyof typeof importData]
                ).map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            )}

            {/* 선택 결과 표시 */}
            {subRegion && (
              <div className="mt-2 text-gray-700">
                선택된 원산지: {originType} / {region} / {subRegion}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">제조일자</div>
        <div className="flex-5 flex gap-2">
          <DatePicker />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">유효일자</div>
        <div className="flex-5 flex gap-2">
          <DatePicker />
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
