// import Button from '@/components/common/Button';
import Selectbox from '@/components/common/Selectbox';
import type { Product, ProductContact } from '@/data/productDetailData';
import { contactSeller, getProduct } from '@/utils/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input } from 'antd';
import { useRef, useState } from 'react';

const { TextArea } = Input;

const ContactSeller = () => {
  const id = 1;
  //   const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProduct(id),
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const onClickFileRef = () => {
    fileRef.current?.click();
  };

  const formRef = useRef({
    문의유형: '',
    문의상품옵션: '',
    제목: '',
    내용: '',
    이미지: '',
  });
  const [disableButton, setDisableButton] = useState(true);

  const handleSubmit = () => {
    if (!data) return;
    if (
      formRef.current.문의유형 === '' ||
      formRef.current.문의상품옵션 === '' ||
      formRef.current.제목 === '' ||
      formRef.current.내용 === ''
    ) {
      console.log('모든 필드를 입력해주세요');
      return;
    }

    const contactData = {
      ...formRef.current,
      작성자: '유저1',
      작성일: new Date().toISOString().split('T')[0],
      답변: {
        완료: false,
        내용: '',
        완료일: '',
      },
    };
    mutation.mutate(contactData);
  };

  //   필수 내용들이 변할 때마다 버튼 활성화 상태를 체크
  const checkBtnDisabled = () => {
    if (
      formRef.current.문의유형 !== '' &&
      formRef.current.문의상품옵션 !== '' &&
      formRef.current.제목 !== '' &&
      formRef.current.내용 !== ''
    ) {
      setDisableButton(false);
    }

    if (
      formRef.current.문의유형 === '' ||
      formRef.current.문의상품옵션 === '' ||
      formRef.current.제목 === '' ||
      formRef.current.내용 === ''
    ) {
      setDisableButton(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    formRef.current = { ...formRef.current, [name]: value };

    checkBtnDisabled();
  };

  //   판매자에게 문의하기
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newContact: Partial<ProductContact>) =>
      contactSeller(id, newContact),
    onSuccess: (data) => {
      console.log('문의하기 성공: ', data);
      queryClient.invalidateQueries({ queryKey: ['productDetail', id] });
    },
  });

  return (
    <div className="w-[800px] mx-auto">
      <div className="flex flex-col gap-6">
        <div className="text-2xl font-semibold">판매자에게 문의하기</div>

        {/* 1. 상품 정보 */}
        <div className="flex gap-4">
          <div className="w-[100px] h-[100px]">
            <img src={data?.이미지[0]} className="w-full h-full" />
          </div>
          <div className="flex flex-col justify-center">
            <div>상품명: {data?.상품명}</div>
            <div className="flex gap-2">
              <div>{data?.할인율}%</div>
              <div className="line-through">{data?.가격}원</div>
              <div>{data?.가격 - (data?.가격 * data?.할인율) / 100}원</div>
            </div>
          </div>
        </div>

        {/* 6. 문의 유형(필수) */}
        <div className="flex flex-col gap-3">
          <label className="font-semibold">문의 유형(필수)</label>
          <Selectbox
            placeholder="문의 유형을 선택해주세요"
            name="문의유형"
            onChange={handleChange}
          >
            <option>사이즈 문의</option>
            <option>배송 문의</option>
            <option>재입고 문의</option>
            <option>상품상세문의</option>
            {/* <option>교환/환불 문의</option> */}
          </Selectbox>
        </div>

        {/* 7. 문의 상품 옵션(필수) */}
        <div className="flex flex-col gap-3">
          <label className="font-semibold">문의 상품 옵션(필수)</label>
          <Selectbox
            placeholder="상품 옵션을 선택해주세요"
            name="문의상품옵션"
            onChange={handleChange}
          >
            {data?.옵션.map((option, index) => (
              <option key={`contact-seller-option-${index}`} value={option}>
                {option}
              </option>
            ))}
            {/* <option>교환/환불 문의</option> */}
          </Selectbox>
        </div>

        {/* 8. 제목(필수) */}
        <div className="flex flex-col gap-3">
          <label className="font-semibold">제목(필수)</label>
          <Input
            placeholder="제목을 입력해주세요"
            className="h-[50px]"
            maxLength={30}
            name="제목"
            onChange={handleChange}
          />
        </div>

        {/* 9. 내용(필수) */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <label className="font-semibold">내용(필수)</label>
            <div className="flex gap-2">
              <input type="checkbox" id="secret-content" />
              <label htmlFor="secret-content">비밀글</label>
            </div>
          </div>
          <TextArea
            placeholder="내용을 입력해주세요"
            rows={4}
            style={{ paddingTop: '12px', paddingBottom: '12px' }}
            maxLength={1000}
            name="내용"
            onChange={handleChange}
          />
        </div>

        {/* 11. 사진 첨부 */}
        <div className="flex flex-col gap-3">
          <label className="font-semibold">사진 첨부</label>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="hidden"
            onChange={handleChange}
            name="이미지"
          />
          <button
            onClick={onClickFileRef}
            className="w-[100px] h-[100px] border border-gray-300 rounded-md cursor-pointer"
          >
            +
          </button>
        </div>

        {/* 저장하기 버튼 */}
        {/* <Button variant="grey"  >저장하기</Button> */}
        <Button
          onClick={handleSubmit}
          disabled={disableButton}
          type={disableButton ? 'default' : 'primary'}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default ContactSeller;
