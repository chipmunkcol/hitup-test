import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { CATEGORY, getKoCategory } from '@/data/const/const';
import { Input } from 'antd';
import { useRef, useState } from 'react';

type Category = {
  category: keyof typeof CATEGORY | '';
  subCategory: string;
  type: string;
  fish: string[];
};

const AddProduct = () => {
  const [category, setCategory] = useState<Category>({
    category: '',
    subCategory: '',
    type: '',
    fish: [],
  });
  console.log('category: ', category.fish);

  const onClickCategory = (name: string, value: string) => {
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const onClickFish = (fish: string) => {
    console.log('fish: ', fish);
    const newCategory = { ...category };
    if (category.fish.includes(fish)) {
      newCategory.fish = newCategory.fish.filter((f) => f !== fish);
      setCategory(newCategory);
    } else {
      newCategory.fish = [...newCategory.fish, fish];
      setCategory(newCategory);
    }

    // setCategory((prev) => {
    //   if (prev.fish.includes(fish)) {
    //     return {
    //       ...prev,
    //       fish: prev.fish.filter((f) => f !== fish),
    //     };
    //   } else {
    //     return {
    //       ...prev,
    //       fish: [...prev.fish, fish],
    //     };
    //   }
    // });
  };

  const fishList =
    category.category && category.subCategory && category.type
      ? CATEGORY[category.category][category.subCategory]?.filter(
          (v) => v.value === category.type
        )[0]?.fish
      : [];

  // console.log('fishList: ', fishList);

  // form
  // const [form, setForm] = useState({

  // })

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
          <div className="p-4 ">
            <div className="border border-Grey-30 rounded-md p-4">
              <div>카테고리</div>
              <div className="flex justify-between gap-2">
                <div className="flex-1 border border-Grey-30 rounded-md ">
                  <div className=" p-2">대분류*</div>
                  <ul>
                    {Object.keys(CATEGORY)?.map((cate) => (
                      <li
                        key={`category-대분류-${cate}`}
                        className={`${cate === category.category ? 'bg-Grey-20' : ''} p-2`}
                        onClick={() => onClickCategory('category', cate)}
                      >
                        {getKoCategory(cate)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 border border-Grey-30 rounded-md ">
                  <div className=" p-2">중분류*</div>
                  <ul>
                    {category.category &&
                      Object.keys(CATEGORY[category.category])?.map(
                        (subCate) => (
                          <li
                            key={`category-대분류-${subCate}`}
                            className={`${subCate === category.subCategory ? 'bg-Grey-20' : ''} p-2`}
                            onClick={() =>
                              onClickCategory('subCategory', subCate)
                            }
                          >
                            {getKoCategory(subCate)}
                          </li>
                        )
                      )}
                  </ul>
                </div>
                <div className="flex-1 border border-Grey-30 rounded-md ">
                  <div className=" p-2">소분류*</div>
                  <ul>
                    {category.category &&
                      category.subCategory &&
                      CATEGORY[category.category][category.subCategory]?.map(
                        (type) => (
                          <li
                            key={`category-대분류-${type.value}`}
                            className={`${type.value === category.type ? 'bg-Grey-20' : ''} p-2`}
                            onClick={() => onClickCategory('type', type.value)}
                          >
                            {type.label}
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>

              {/* 어종 */}
              <div className="p-2">
                <div>어종 선택(중복 선택 가능)</div>
                <ul className="flex gap-2">
                  {fishList &&
                    fishList?.map((fish: string) => (
                      <li
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   onClickFish(fish);
                        // }}
                        key={`fish-${fish}`}
                        className="flex gap-1"
                      >
                        <input
                          onChange={() => onClickFish(fish)}
                          checked={category?.fish.includes(fish)}
                          type="checkbox"
                          id={`checkbox-fish-${fish}`}
                        />
                        <label htmlFor={`checkbox-fish-${fish}`}>{fish}</label>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 상품명 */}
          <div className="p-4 ">
            <div className="border border-Grey-30 rounded-md p-4">
              <div>상품명*</div>
              <Input required placeholder="상품명을 입력해주세요" />
            </div>
          </div>

          {/* 판매가 */}
          <div className="p-4 ">
            <div className="flex flex-col gap-2 border border-Grey-30 rounded-md p-4">
              <div className="flex items-center gap-5">
                <div>판매가*</div>
                <div className="max-w-[200px]">
                  <Input required placeholder="숫자만 입력" />
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div>즉시할인*</div>
                <div className="flex gap-2">설정안함</div>
              </div>
              <div className="flex items-center gap-5">
                <div>부가세*</div>
                <div className="max-w-[200px]">과세상품</div>
              </div>
            </div>
          </div>

          {/* 재고수량 */}
          <div className="p-4 ">
            <div className="border border-Grey-30 rounded-md p-4">
              <div>재고수량</div>
              <Input required placeholder="숫자만 입력" />
            </div>
          </div>

          {/* 옵션 */}
          <div className="p-4 ">
            <div className="border border-Grey-30 rounded-md p-4">
              <div>옵션</div>
              <div>선택형 설정안함</div>
              <div>직접입력형 설정안함</div>
            </div>
          </div>

          {/* 옵션 설정함 상태인 경우 */}
          {/* 옵션 설정함 상태인 경우 */}

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
