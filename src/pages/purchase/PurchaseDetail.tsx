import { purchaseDetail } from '@/data/purchaseData';
import { trackingData } from '@/data/trackingData';
import { useModalStore } from '@/store/useModalStore';
import { Button } from 'antd';
import { useState } from 'react';

const PurchaseDetail = () => {
  // 데이터 가져오기 (api: purchase/:orderId)
  const data = purchaseDetail;
  console.log('data: ', data);

  // 배송 현황 확인
  // const [isTrackingVisible, setIsTrackingVisible] = useState(false);
  const { isTrackingVisible, setIsTrackingVisible } = useModalStore();

  if (!data) {
    return <div>데이터를 불러오는데 에러가 있습니다</div>;
  }

  return (
    <div className="max-w-2xl m-auto pt-5 px-5">
      <div>
        <h1 className="text-2xl pb-3">주문상세내역</h1>
        <div className="flex gap-4">
          <div>주문일자</div>
          <div>{data?.주문일자}</div>
        </div>
        <div className="flex gap-4">
          <div>주문번호</div>
          <div>{data?.주문번호}</div>
        </div>
        <ul className="flex flex-col gap-4 py-6">
          {data?.상품목록 &&
            data.상품목록?.length > 0 &&
            data.상품목록.map((item) => (
              <li
                className="flex gap-2 border border-Grey-20 py-4 px-4 rounded-xl"
                key={`purchase-detail-상품목록-${item.상품id}`}
              >
                <div className="w-full flex gap-2 ">
                  <div
                    className="w-[150px] h-[150px] cursor-pointer"
                    // onClick={() => goProductDetail(item?.id)}
                  >
                    <img
                      src={item.상품이미지}
                      alt="상품 이미지"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2 justify-between">
                    <div>상품명</div>
                    <div>옵션: {item.옵션}</div>
                    <div className="flex gap-2">
                      <div>
                        {/* {(item.가격 - (item.가격 * item.할인율) / 100) *
                              item.수량} */}
                        {item.가격.toLocaleString()} 원
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>{item.배송상태}</div>
                      <Button onClick={() => setIsTrackingVisible(true)}>
                        배송 현황 확인
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <div>
          <div className="text-lg font-semibold">배송 정보</div>
          <div className="flex gap-4">
            <div>수령인</div>
            <div>김산호</div>
          </div>

          <div className="flex gap-4">
            <div>휴대폰</div>
            <div>010-0000-0000</div>
          </div>

          <div className="flex gap-4">
            <div>주소</div>
            <div>
              서울특별시 중구 청계천로40, 822호 두줄두줄두줄두줄 한국 관광 공사
              두줄두줄두줄두줄
            </div>
          </div>
        </div>

        <div>
          <div className="text-lg font-semibold pt-6 pb-2">결제 정보</div>
          <div className="flex gap-4 justify-between">
            <div>총 결제 금액</div>
            <div>39000 원</div>
          </div>
          <div className="flex gap-4 justify-between">
            <div>결제 수단</div>
            <div>신용카드(신한카드/일시불)</div>
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold  pt-6 pb-2">주문금액 확인</div>
          <div className="flex gap-4 justify-between">
            <div>주문 상품 금액</div>
            <div>44000 원</div>
          </div>
          <div className="flex gap-4 justify-between">
            <div>배송비</div>
            <div>0</div>
          </div>
          <div className="flex gap-4 justify-between">
            <div>쿠폰 사용</div>
            <div>-5000</div>
          </div>

          {/* 구분선 */}
          <div className="border-t border-Grey-20 my-2"></div>
          <div className="flex justify-between font-bold">
            <div>총 결제 금액</div>
            <div>39000 원</div>
          </div>
        </div>

        <div>
          <div className="text-lg font-semibold pt-6 pb-2">환불 예정 내역</div>
          <div className="flex gap-4 justify-between">
            <div>환불 상품 금액</div>
            <div>(쿠폰이 적용 된 금액) 17000 원</div>
          </div>
          <div className="flex gap-4 justify-between">
            <div>차감금액</div>
            <div>-5000</div>
          </div>
          {/* 구분선 */}
          <div className="border-t border-Grey-20 my-2"></div>
          <div className="flex gap-4 justify-between">
            <div>총 환불 예정 금액</div>
            <div>12000</div>
          </div>
        </div>
      </div>
      {
        isTrackingVisible && <TrackingHistory />
        // <TrackingHistory setIsOpen={setIsTrackingVisible} />
      }

      {/* API 정해지면 이걸로 그냥 호출해도 될듯 */}
      {/* <form action="https://info.sweettracker.co.kr/tracking/5" method="post">
        <div>
          <input
            type="text"
            id="t_key"
            name="t_key"
            value="NbEH5L73vuu0qPWQOdK5Ew"
            placeholder="제공받은 APIKEY"
          />
        </div>
        <div>
          <input
            type="text"
            name="t_code"
            id="t_code"
            value="04"
            placeholder="택배사 코드"
          />
        </div>
        <div>
          <input
            type="text"
            name="t_invoice"
            id="t_invoice"
            value="1234567890"
            placeholder="운송장 번호"
          />
        </div>
        <button type="submit">조회하기</button>
      </form> */}
    </div>
  );
};

export default PurchaseDetail;

export const TrackingHistory = () => {
  // 실제로는 배송 조회 api 호출 후 데이터 표시 (필요 데이터 APIKEY, 운송장번호, 택배사코드)
  const data = trackingData;
  const setIsTrackingVisible = useModalStore(
    (state) => state.setIsTrackingVisible
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setIsTrackingVisible(false)} // 배경 클릭 시 닫힘
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg min-w-1/2"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <h2 className="text-lg font-semibold mb-4">스마트택배 배송조회</h2>
        {/* 구분선 */}
        <div className="border-t border-Grey-20 my-2"></div>

        <div className="py-4 px-2 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">운송장번호</div>
            <div className="flex-2">{data.invoiceNo}</div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">택배사</div>
            {/* <div className='flex-2'>{data.invoiceNo}</div> // 실제로는 택배사 이름 가져와서 보여주는 걸로  */}
            <div className="flex-2">CJ대한통운</div>
          </div>
        </div>

        <div className="flex justify-between">
          <div>시간</div>
          <div>현재 위치</div>
          <div>배송 상태</div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-Grey-20 my-2"></div>
        <ul className="max-h-[600px] overflow-auto">
          {data.trackingDetails &&
            data.trackingDetails.length > 0 &&
            data.trackingDetails.map((item, index) => (
              <li
                key={`배송조회-trackingDetails-${index}`}
                className="border-b border-Grey-20 px-2 py-2 flex justify-between"
              >
                <div>{item.timeString}</div>
                <div>{item.where}</div>
                <div>{item.kind}</div>
              </li>
            ))}
        </ul>

        <div className="pt-6">
          <button
            onClick={() => setIsTrackingVisible(false)}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
