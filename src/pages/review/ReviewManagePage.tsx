import { getReviews } from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { Outlet, useNavigate } from 'react-router-dom';
// const data = reviewableData;

const ReviewManagePage = () => {
  const { data } = useQuery({
    queryKey: ['reviews'],
    queryFn: getReviews,
  });

  const today = dayjs();
  const 작성가능리뷰갯수 =
    data?.filter((item) => {
      const 배송완료일 = dayjs(item.배송완료일);
      return !item.작성여부 && today.diff(배송완료일, 'day') <= 90;
    }).length || 0;
  const 작성한리뷰갯수 = data?.filter((item) => item.작성여부).length || 0;

  const navigate = useNavigate();
  const path = window.location.pathname;
  console.log('path: ', path);
  const currentTab = path.includes('written') ? 'written' : 'writable';

  const goWritable = () => {
    navigate('/review/writable');
  };

  const goWritten = () => {
    navigate('/review/written');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">리뷰 관리 페이지</h1>
      <div className="flex justify-center gap-4 px-6 py-4">
        <Button
          className="flex-1"
          type={currentTab === 'writable' ? 'primary' : 'default'}
          onClick={goWritable}
        >
          리뷰 작성
          {' (' + 작성가능리뷰갯수 + ')'}
        </Button>
        <Button
          className="flex-1"
          type={currentTab === 'written' ? 'primary' : 'default'}
          onClick={goWritten}
        >
          작성한 리뷰 {'('}
          {작성한리뷰갯수}
          {')'}
        </Button>
      </div>
      <div>
        {/* 하위 라우트 (리뷰 작성 / 작성한 리뷰) */}
        <Outlet />
      </div>
    </div>
  );
};

export default ReviewManagePage;
