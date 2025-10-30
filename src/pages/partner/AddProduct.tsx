import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import Category from '@/components/partner/addProduct/Category';
import Option from '@/components/partner/addProduct/Option';
import OptionCustom from '@/components/partner/addProduct/OptionCustom';
import Product from '@/components/partner/addProduct/Product';
import { useRef, useState } from 'react';

const AddProduct = () => {
  return (
    <div className="h-full w-full ">
      <div className="h-full flex">
        <div className="h-[-webkit-fill-available] flex-1 min-w-[250px] bg-Grey-10">
          <div>
            <div className="p-4">히트업몰 파트너</div>
            <div className="p-4 flex justify-center items-center gap-5">
              <div className="w-[100px] h-[100px] rounded-full bg-Grey-05"></div>
              <div>브랜드 A</div>
            </div>
            <div className="border border-Grey-50 px-4">
              <div className="py-4">상품 관리</div>
              <ul>
                <li className="py-2">상품 등록</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-5">
          <div className="p-4 border-b border-b-Grey-30">상품 등록</div>
          {/* 카테고리 컴포넌트 */}
          {/* 카테고리 컴포넌트 */}
          <Category />

          {/* 상품 명/가격/재고 컴포넌트 */}
          {/* 상품 명/가격/재고 컴포넌트 */}

          <Product />

          <div className="p-4 ">
            <div className="border border-Grey-30 rounded-md p-4 flex flex-col gap-5">
              <div>옵션</div>
              {/* 옵션 컴포넌트 */}
              {/* 옵션 컴포넌트 */}
              <Option />

              {/* 옵션 커스텀 컴포넌트 */}
              {/* 옵션 커스텀 컴포넌트 */}
              <OptionCustom />
            </div>
          </div>

          <div className="p-4 ">
            <div className="border border-Grey-30 rounded-md p-4">
              <div>상품이미지</div>
              <div className="flex flex-col gap-6">
                {/* 상품이미지 썸네일 컴포넌트 */}
                <ThumbnailComponent />

                {/* 상품이미지 썸네일 추가 이미지 컴포넌트 */}
                <ThumbnailExtraComponent />
              </div>
            </div>
          </div>

          {/* 상세페이지 이미지 */}
          <div className="p-4 ">
            <div className="border border-Grey-30 rounded-md p-4">
              <div>상세페이지 이미지</div>
              <div className="flex flex-col gap-6">
                {/* 상품 상세페이지 썸네일 추가 이미지 컴포넌트 */}
                <DetailPageImageComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

const DetailPageImageComponent = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const onClickFileRef = () => {
    fileRef.current?.click();
    console.log('fileRef: ', fileRef.current?.files);
  };
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (images.length > 10) {
      swalAlert('추가 이미지는 10개까지 등록 가능합니다.');
      return;
    }
    if (files) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...imageUrls]);
    }
  };

  return (
    <div className="flex gap-8">
      <div>
        추가 이미지* <br />
        (0/10)
      </div>
      <div className="py-6 flex flex-col gap-3 self-start">
        {/* 썸네일 이미지 업로드 */}
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
    </div>
  );
};

// 추가 이미지 컴포넌트
// 추가 이미지 컴포넌트
// 추가 이미지 컴포넌트
// 추가 이미지 컴포넌트
const ThumbnailExtraComponent = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const onClickFileRef = () => {
    fileRef.current?.click();
    console.log('fileRef: ', fileRef.current?.files);
  };
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (images.length > 9) {
      swalAlert('추가 이미지는 9개까지 등록 가능합니다.');
      return;
    }
    if (files) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...imageUrls]);
    }
  };

  return (
    <div className="flex gap-8">
      <div>
        추가 이미지* <br />
        (0/9)
      </div>
      <div className="py-6 flex flex-col gap-3 self-start">
        {/* 썸네일 이미지 업로드 */}
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
    </div>
  );
};

// 썸네일 컴포넌트
// 썸네일 컴포넌트
// 썸네일 컴포넌트
// 썸네일 컴포넌트
const ThumbnailComponent = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const onClickFileRef = () => {
    fileRef.current?.click();
    console.log('fileRef: ', fileRef.current?.files);
  };
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (images.length !== 0) {
      swalAlert('대표이미지는 하나만 등록 가능합니다.');
      return;
    }
    if (files) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...imageUrls]);
    }
  };

  return (
    <div className="flex gap-8">
      <div>
        대표 이미지* <br /> (0/9)
      </div>

      <div className="py-6 flex flex-col gap-3 self-start">
        {/* 썸네일 이미지 업로드 */}
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
    </div>
  );
};
