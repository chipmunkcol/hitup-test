import { reviewableData } from '@/data/reviewableProductData';
import { getReviews } from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';
import { Button, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';

// const data = reviewableData;
const Written = () => {
  const navigate = useNavigate();
  // 이미 작성한 리뷰 data filter

  const { data } = useQuery({
    queryKey: ['reviews'],
    queryFn: getReviews,
  });

  const writtenData = data?.filter((item) => item.작성여부) || [];

  const goEditReview = (id: number) => {
    navigate(`/review/edit/${id}`);
  };

  return (
    <div>
      {/* 작성한 리뷰 목록을 보여주는 컴포넌트 */}
      <ul className="border-t border-Grey-20 ">
        {writtenData.map((item) => (
          <li key={item.id} className="border-b border-Grey-20 p-4 mb-4">
            <div>
              <div className="flex gap-4 justify-between">
                <div>
                  <div>{item.브랜드명}</div>
                  <div>{item.상품명}</div>
                  <div>
                    <Rate value={item.작성된리뷰?.별점 || 0} disabled />
                    <span className="ml-2">{item.작성된리뷰?.별점 || 0}점</span>
                  </div>
                  <div>리뷰 내용: {item.작성된리뷰?.내용}</div>
                </div>
                <div className="w-[100px] h-[100px]">
                  <img className="w-full h-full" src={item.이미지} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => goEditReview(item.id)}>편집하기</Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Written;
