import { getProduct } from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';

const id = 1;
const ContactHistory = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProduct(id),
    select: (data) => {
      return data.상품문의;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return <div>상품이 존재하지 않습니다.</div>;

  return (
    <div className="max-w-2xl m-auto pt-5 px-5">
      <div>
        <h1 className="text-2xl">상품 문의 내역</h1>
        <div className="pt-5">
          <ul>
            {data &&
              data.length > 0 &&
              data.map((item) => (
                <li
                  className="border border-Grey-20 rounded-xl px-6 py-4 mb-4"
                  key={item.id}
                >
                  <div className="flex gqp-2">
                    <div className="flex-4">
                      <div className="flex gap-3">
                        <div className="w-[100px] h-[100px]">
                          <img
                            src={item.이미지 || 'https://picsum.photos/200'}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="flex flex-col gap-2 justify-between">
                          <div>{item.상품명}</div>
                          <div>옵션: {item.문의상품옵션}</div>
                        </div>
                      </div>
                      <div className="pt-3">
                        <div className="text-md font-semibold">
                          <div>
                            {item.답변.완료 ? '답변 완료' : '답변 대기'}
                          </div>
                        </div>
                        <div>{item.문의유형}</div>
                        <div>{item.제목}</div>
                        <div>{item.내용}</div>
                        <div>{item.작성일}</div>
                      </div>
                    </div>

                    <div className="flex-1 flex gap-3">
                      <Button>수정</Button>
                      <Button>삭제</Button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ContactHistory;
