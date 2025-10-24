import { swalConfirm } from '@/components/common/libs/sweetalert/sweetalert';
import { deleteReview, getReview } from '@/utils/api/api';
import { alertComingSoon } from '@/utils/function';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Rate } from 'antd';
import { Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { TextArea } = Input;
const EditReviewPage = () => {
  // const id = 4;
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ['review', id],
    queryFn: () => getReview(id),
  });
  console.log('data: ', data);

  const fileRef = useRef<HTMLInputElement>(null);
  const onClickFileRef = () => {
    fileRef.current?.click();
    console.log('fileRef: ', fileRef.current?.files);
  };
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.작성된리뷰) {
      setImages(data.작성된리뷰?.리뷰이미지);
    }
  }, [data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...imageUrls]);
    }
  };

  const handleEditReview = () => {
    alertComingSoon();
    // 편집 mutation 처리 및 팝업 닫기
  };

  const queryClient = useQueryClient();
  const handleRemoveReview = async (id: string | undefined) => {
    if (!id) return;

    const res = await swalConfirm(
      '리뷰 삭제',
      '<div>리뷰를 삭제시 복구 및 재작성이 불가해요<br/>삭제하시겠어요?</div>',
      '네',
      '아니요'
    );

    if (res.isConfirmed) {
      deleteReview(id);
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      navigate('/review/written');
    }
    // 아마 팝업으로 띄울 예정이니 팝업 닫기 처리
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading review data.</div>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">리뷰 편집</h1>
        <Trash2
          className="cursor-pointer"
          onClick={() => handleRemoveReview(id)}
        />
      </div>
      <div className="border border-Grey-30 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="w-[100px] h-[100px]">
            <img
              className="w-full h-full"
              src={data?.이미지}
              alt="상품 이미지"
            />
          </div>
          <div>
            <div>{data?.브랜드명}</div>
            <div>{data?.상품명}</div>
          </div>
        </div>
      </div>
      <div className="py-6 flex flex-col gap-4 items-center">
        <div>상품에 만족하셨나요?</div>

        {/* 이전 페이지에서 선택한 별점 (팝업이면 전역 상태 안만들어도 될듯) */}
        <div className="py-4">
          <Rate style={{ fontSize: 36 }} value={data?.작성된리뷰?.별점 || 0} />
        </div>

        <div>어떤 점이 좋았나요?</div>
        <div className="w-full">
          <TextArea
            autoSize={{ minRows: 3, maxRows: 6 }}
            style={{ minWidth: '400px', width: '100%' }}
            defaultValue={data?.작성된리뷰?.내용}
          />
        </div>

        {/* 이미지 최대 10장까지 업로드 */}
        <div className="py-6 flex flex-col gap-3 self-start">
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="hidden"
            onChange={handleFileChange}
            name="이미지"
          />
          <div className=" flex gap-4">
            <div
              onClick={onClickFileRef}
              className="w-[100px] h-[100px] flex items-center justify-center border border-gray-300 rounded-md cursor-pointer text-gray-400"
            >
              +
            </div>

            <ul className="flex gap-4 w-[400px]  overflow-x-auto">
              {images.length > 0 &&
                images.map((image, index) => (
                  <li
                    key={`add-review-image-${index}`}
                    className=" flex-shrink-0 relative flex gap-4 w-[100px]  border border-Grey-20 rounded-xl"
                  >
                    <img
                      src={image}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div
                      onClick={() => {
                        setImages((prevImages) =>
                          prevImages.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-0 right-0 p-1 cursor-pointer"
                    >
                      <div className="leading-none w-[20px] h-[20px] bg-Grey-50 rounded-full flex items-center justify-center text-Grey-05">
                        x
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="w-full flex gap-4">
          <Button style={{ flex: 1 }} onClick={handleEditReview} type="primary">
            편집하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewPage;
