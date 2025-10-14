import { Button } from 'antd';

const PurchaseDetail = () => {
  return (
    <div className="max-w-2xl m-auto pt-5 px-5">
      <div>
        <h1 className="text-2xl pb-3">주문상세내역</h1>
        <div className="flex gap-4">
          <div>주문일자</div>
          <div>2025.09.13</div>
        </div>
        <div className="flex gap-4">
          <div>주문번호</div>
          <div>190250913122514</div>
        </div>
        <ul className="py-6">
          <li
            className="flex gap-2 border border-Grey-20 py-4 px-4 rounded-xl"
            // key={item.id}
          >
            <div className="w-full flex gap-2 ">
              <div
                className="w-[150px] h-[150px] cursor-pointer"
                // onClick={() => goProductDetail(item?.id)}
              >
                <img
                  src="https://picsum.photos/200"
                  alt="상품 이미지"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2 justify-between">
                <div>상품명</div>
                <div>옵션: 옵션</div>
                <div className="flex gap-2">
                  <div>
                    {/* {(item.가격 - (item.가격 * item.할인율) / 100) *
                              item.수량} */}
                    22,000 원
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>배송 준비 중</div>
                  <Button>배송 현황 확인</Button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div>
          <div>배송 정보</div>
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
          <div>결제 정보</div>
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
          <div>주문금액 확인</div>
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
          <div>환불 예정 내역</div>
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
    </div>
  );
};

export default PurchaseDetail;
