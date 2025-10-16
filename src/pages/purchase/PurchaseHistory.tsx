import { purchaseData } from '@/data/purchaseData';
import { useModalStore } from '@/store/useModal';
import { Button } from 'antd';
import { TrackingHistory } from './PurchaseDetail';
import { useNavigate } from 'react-router-dom';

const PurchaseHistory = () => {
  // 실제론 주문/결제 내역 Api 호출
  const { isTrackingVisible, setIsTrackingVisible } = useModalStore();
  const data = purchaseData;

  const navigate = useNavigate();
  const goProductDetail = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const goPurchaseDetail = (orderId: string) => {
    navigate(`/purchase/${orderId}`);
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-5 py-10">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">주문/배송 내역</div>
      </div>

      <ul className="flex flex-col gap-8 py-4">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <li
              className="flex flex-col gap-2"
              key={`purchase-history-상품목록-${item.orderId}`}
            >
              <div className="flex justify-between text-lg font-semibold">
                <div>{item.purchaseDate}</div>
                <div
                  className="cursor-pointer"
                  onClick={() => goPurchaseDetail(item.orderId)}
                >
                  주문상세보기 {'>'}
                </div>
              </div>
              <div className="flex gap-2 border border-Grey-20 py-4 px-4 rounded-xl">
                <div className="w-full flex gap-2 ">
                  <div
                    className="w-[150px] h-[150px] cursor-pointer"
                    onClick={() => goProductDetail(item?.product.productId)}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt="상품 이미지"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2 justify-between">
                    <div>{item.product.brand.name}</div>
                    <div>{item.product.name}</div>
                    <div>옵션: {item.product.option.name}</div>
                    <div className="flex gap-2">
                      <div>
                        {/* {(item.가격 - (item.가격 * item.할인율) / 100) *
                              item.수량} */}
                        {item.product.price.toLocaleString()} 원
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>{item.status}</div>
                      <Button onClick={() => setIsTrackingVisible(true)}>
                        배송 현황 확인
                      </Button>
                    </div>
                    {
                      isTrackingVisible && <TrackingHistory />
                      // <TrackingHistory setIsOpen={setIsTrackingVisible} />
                    }
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PurchaseHistory;
