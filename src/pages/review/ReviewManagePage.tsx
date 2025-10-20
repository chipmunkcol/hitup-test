import { reviewableData } from '@/data/reviewableProductData';
import { Button, Rate } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const data = reviewableData;

const ReviewManagePage = () => {
  const navigate = useNavigate();
  const [rateValue, setRateValue] = useState<{ value: number | null }[]>([]);
  console.log('rateValue: ', rateValue);

  const today = dayjs();
  // 리뷰 작성 가능한 data filter
  const writableData = useMemo(
    () =>
      data.filter((item) => today.diff(dayjs(item.배송완료일), 'day') <= 90),
    [data]
  );

  useEffect(() => {
    if (writableData.length > 0) {
      // writableData 만큼의 배열에 별점 초기값 설정 { value: 0 }
      const initialRateValues = writableData.map(() => ({ value: null }));
      console.log('initialRateValues: ', initialRateValues);
      setRateValue(initialRateValues);
    }
  }, [writableData]);
  // 이미 작성한 리뷰 data filter
  const writtenData = data.filter((item) => item.작성여부);

  // const today = dayjs

  const 남은일수구하기 = (배송완료일: string) => {
    const 작성기한 = dayjs(배송완료일).add(90, 'day');
    return 작성기한.diff(today, 'day');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">리뷰 관리 페이지</h1>
      <div className="flex gap-4 py-4">
        <Button>
          리뷰 작성
          {writableData.length > 0 && ' (' + writableData.length + ')'}
        </Button>
        <Button>
          작성한 리뷰 {'('}
          {writtenData.length}
          {')'}
        </Button>
      </div>
      <div>
        <div className="py-2 px-4 bg-Grey-10">
          리뷰는 배송 완료 일 기준 최대 90일 이내에 작성이 가능해요
        </div>
        <ul>
          {writableData.map((item, index) => (
            <li className="flex gap-4 border border-Grey-20 p-6">
              <div>
                <div>작성 기한 D-{남은일수구하기(item.배송완료일)}일</div>

                <div className="w-[140px] h-[140px]">
                  <img className="w-full h-full" src={item.이미지} />
                </div>
              </div>
              <div>
                <div>상품명</div>
                <div>옵션: {item.옵션}</div>
                {/* <div >{'☆'.repeat(5)}</div> */}
                {/* <StarRate value={rateValue[index]?.value} /> */}
                <Rate
                  value={rateValue[index]?.value || 0}
                  onChange={(value) => {
                    const newRateValues = [...rateValue];
                    newRateValues[index] = { value };
                    setRateValue(newRateValues);
                  }}
                />
                {rateValue[index]?.value !== null && (
                  <div onClick={() => navigate(`/review/add/${item.id}`)}>
                    <Button>자세한 리뷰 작성하기</Button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewManagePage;
