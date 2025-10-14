import { swalConfirm } from '@/components/common/libs/sweetalert/sweetalert';
import { useAuthStore } from '@/store/useAuthStore';
import { deleteContact, getProduct } from '@/utils/api/api';
import { cutString } from '@/utils/function';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';

const id = 1;
const ContactHistory = () => {
  const {
    data: productData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProduct(id),
    // select: (data) => {
    //   return data.상품문의;
    // },
  });

  const data = productData?.상품문의 || [];

  const { user } = useAuthStore();

  // 문의 삭제 핸들러
  const queryClient = useQueryClient();
  const { mutate: deleteContactMutate } = useMutation({
    mutationFn: ({
      productId,
      contactId,
    }: {
      productId: number;
      contactId: number;
    }) => deleteContact(productId, contactId),
    onSuccess: (res) => {
      console.log('res: ', res.data?.message);
      queryClient.invalidateQueries({ queryKey: ['productDetail', id] });
    },
    onError: (err) => {
      console.log('err: ', err);
    },
  });

  const handleDelete = async (productId: number, contactId: number) => {
    const res = await swalConfirm(
      '삭제',
      '문의글을 정말 삭제하시겠어요?',
      '확인',
      '취소'
    );
    if (res.isConfirmed) {
      deleteContactMutate({ productId, contactId });
    }
  };

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
                            src={productData?.이미지[0]}
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
                        <div>{cutString(item.제목, 30)}</div>
                        <div>{cutString(item.내용, 1000)}</div>
                        {item.이미지 &&
                          item.이미지.length > 0 &&
                          typeof item.이미지 === 'object' && (
                            <div className="mt-2 flex gap-2">
                              {item.이미지.map((imgUrl, index) => (
                                <img
                                  key={index}
                                  src={imgUrl}
                                  className="w-20 h-20 object-cover"
                                />
                              ))}
                            </div>
                          )}
                        <div>{item.작성일}</div>
                      </div>

                      {item.답변.완료 && (
                        <div className="mt-4 p-4 bg-Grey-20 rounded-lg">
                          <div className="font-semibold">답변</div>
                          <div>{cutString(item.답변.내용, 1000)}</div>
                          <div>{item.답변.완료일}</div>
                        </div>
                      )}
                    </div>
                    {user?.id === item?.작성자 && (
                      <div className="flex-1 flex gap-3">
                        {!item.답변.완료 && <Button>수정</Button>}
                        <Button onClick={() => handleDelete(id, item.id)}>
                          삭제
                        </Button>
                      </div>
                    )}
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
