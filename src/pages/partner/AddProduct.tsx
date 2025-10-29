import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { CATEGORY, getKoCategory } from '@/data/const/const';
import {
  Button,
  Input,
  Select,
  Table,
  type TableColumnsType,
  type TableProps,
} from 'antd';
import Column from 'antd/es/table/Column';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import { useEffect, useRef, useState } from 'react';

type Category = {
  category: keyof typeof CATEGORY | '';
  subCategory: string;
  type: string;
  fish: string[];
};

interface AddProductProps {
  cartegory: Category;
  productName: string;
  price: {
    original: number;
    instantDiscount: {
      isApplied: boolean;
      type: 'percent' | 'fixed';
      value: number;
    };
    taxType: '과세';
  };
  stock: number;
  option: {
    isEnabled: boolean;
    optionType: '단독형' | '조합형';
    optionNameCount: number;
    sortOrder: number;
    options: {
      key: React.Key;
      id: string;
      name: string;
      value: string;
      price: number;
      stock: number;
    }[];
  };
  customOption: {
    isEnabled: boolean;
    optionNameCount: number;
    options: {
      name: string;
      value: string;
    }[];
  };
}

const initialProductForm: AddProductProps = {
  cartegory: {
    category: '',
    subCategory: '',
    type: '',
    fish: [],
  },
  productName: '',
  price: {
    original: 0,
    instantDiscount: {
      isApplied: false,
      type: 'percent',
      value: 0,
    },
    taxType: '과세',
  },
  stock: 0,
  option: {
    isEnabled: false,
    optionType: '단독형',
    optionNameCount: 1,
    sortOrder: 1,
    options: [],
  },
  customOption: {
    isEnabled: false,
    optionNameCount: 1,
    options: [],
  },
};

const AddProduct = () => {
  const [category, setCategory] = useState<Category>({
    category: '',
    subCategory: '',
    type: '',
    fish: [],
  });
  console.log('category: ', category.fish);

  const fishList =
    category.category && category.subCategory && category.type
      ? CATEGORY[category.category][category.subCategory]?.filter(
          (v) => v.value === category.type
        )[0]?.fish
      : [];

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
  };

  // console.log('fishList: ', fishList);

  // form
  const [form, setForm] = useState(initialProductForm);
  console.log('form: ', form.option.optionNameCount);

  const onChangeInput = (name: string, value: string) => {
    // const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const changeOptionType = (type: '단독형' | '조합형') => {
    setForm((prev) => ({
      ...prev,
      option: {
        ...prev.option,
        optionType: type,
      },
    }));
  };

  const changeOptionNameCount = (count: number) => {
    setForm((prev) => ({
      ...prev,
      option: {
        ...prev.option,
        optionNameCount: count,
      },
    }));
  };

  const isOptionEnabled = (isEnabled: boolean) => {
    setForm((prev) => ({
      ...prev,
      option: {
        ...prev.option,
        isEnabled: isEnabled,
      },
    }));
  };

  const isCustomOptionEnabled = (isEnabled: boolean) => {
    setForm((prev) => ({
      ...prev,
      customOption: {
        ...prev.customOption,
        isEnabled: isEnabled,
      },
    }));
  };

  const initialOptionInput = {
    key: '',
    id: '',
    name: '',
    value: '',
    price: 0,
    stock: 0,
  };

  type OptionInputType = typeof initialOptionInput;

  const [optionInput, setOptionInput] = useState<OptionInputType[]>([]);
  const [customOptionInput, setCustomOptionInput] = useState([]);

  useEffect(() => {
    const count = form?.option?.optionNameCount || 1;

    // 초기화 하지말고 이전에 작성했던 input 내용은 유지하도록 수정 필요
    setOptionInput((prev) => {
      const newInputs = [...prev];

      if (count > prev.length) {
        for (let i = prev.length; i < count; i++) {
          newInputs.push({ ...initialOptionInput });
        }
      }

      if (count < prev.length) {
        newInputs.splice(count);
      }
      return newInputs;
    });
  }, [form?.option?.optionNameCount]);

  useEffect(() => {
    const count = form?.customOption?.optionNameCount || 1;
    setOptionInput(
      Array.from({ length: count }, () => ({ ...initialOptionInput }))
    );
  }, [form?.customOption?.optionNameCount]);
  console.log('form.option.optionNameCount: ', form.option.optionNameCount);
  console.log('optionInput: ', optionInput);

  const onChangeOptionInput = (index: number, name: string, value: string) => {
    // setOptionInput((prev) => ({ ...prev, [name]: value }));
    setOptionInput((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, [name]: value } : opt))
    );
  };

  const onClickAddOption = () => {
    let newOptions: any[] = [];
    optionInput.forEach((opt, i) => {
      const options = opt.value.split(',').map((val, j) => {
        return {
          key: `option-key-${i}-${j}`,
          id: `option-key-${i}-${j}`,
          name: opt.name,
          value: val.trim(),
          price: opt.price,
          stock: opt.stock,
        };
      });
      newOptions = [...newOptions, ...options];
    });

    // 반복문 안에서 옵션값으로 반복문을 돌려야할듯

    setForm((prev) => ({
      ...prev,
      option: {
        ...prev.option,
        options: [...prev.option.options, ...newOptions],
      },
    }));
  };

  const onClickAddCombiOption = () => {
    let newOptions: any[] = [];
    optionInput.forEach((opt, i) => {
      const options = opt.value.split(',').map((val, j) => {
        return {
          key: `option-key-${i}-${j}`,
          id: `option-key-${i}-${j}`,
          [opt.name]: opt.value,
          [val.trim()]: val.trim(),
          price: opt.price,
          stock: opt.stock,
        };
      });
      newOptions = [...newOptions, ...options];
    });

    // 반복문 안에서 옵션값으로 반복문을 돌려야할듯

    setForm((prev) => ({
      ...prev,
      option: {
        ...prev.option,
        options: [...prev.option.options, ...newOptions],
      },
    }));
  };

  interface OptionType {
    key?: React.Key;
    id: string;
    name: string;
    value: string;
    price: number;
    stock: number;
  }

  const optionsTableColumns: TableColumnsType<OptionType> = [
    {
      title: '옵션명',
      dataIndex: 'name',
      render: (value: string) => <div>{value}</div>,
    },
    {
      title: '옵션값',
      dataIndex: 'value',
    },
    {
      title: '삭제',
      dataIndex: 'id',
      render: (id: string) => (
        <div>
          <Button onClick={() => onClickDeleteOption(id)}>X</Button>
        </div>
      ),
    },
  ];

  // interface OptionCombiType {
  //   key?: React.Key;
  //   id: string;
  //   color: string;
  //   size: string;
  //   price: number;
  //   stock: number;
  //   status: string; // 판매중 || 품절
  // }

  // const tempData: OptionCombiType[] = [
  const tempData = [
    {
      key: '1',
      id: 'option-combi-1',
      color: '빨강',
      size: 'M',
      price: 1000,
      stock: 10,
      status: '판매중',
    },
    {
      key: '2',
      id: 'option-combi-2',
      color: '파랑',
      size: 'L',
      price: 2000,
      stock: 5,
      status: '품절',
    },
  ];

  const rowSelection: TableProps<OptionType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: OptionType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },

    // disable 처리 부분 따로 구분해서 정리하자
    // getCheckboxProps: (record: OptionType) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const onClickDeleteOption = (id: string) => {
    setForm((prev) => {
      const newOptions = [...prev.option.options];
      const filteredOptions = newOptions.filter((opt) => opt.id !== id);
      return {
        ...prev,
        option: {
          ...prev.option,
          options: filteredOptions,
        },
      };
    });
  };

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
            <div className="border border-Grey-30 rounded-md p-4 flex flex-col gap-5">
              <div>옵션</div>
              <div className="flex gap-5">
                <div>선택형</div>
                <div className="flex gap-2">
                  <Button
                    type={form.option.isEnabled ? 'primary' : 'default'}
                    onClick={() => isOptionEnabled(true)}
                  >
                    설정함
                  </Button>
                  <Button
                    type={form.option.isEnabled ? 'default' : 'primary'}
                    onClick={() => isOptionEnabled(false)}
                  >
                    설정안함
                  </Button>
                </div>
              </div>

              {/* 옵션 설정함 상태인 경우 */}
              {/* 옵션 설정함 상태인 경우 */}
              {form.option.isEnabled && (
                <>
                  <div className="flex gap-5">
                    <div>옵션 입력방식</div>
                    <div className="flex gap-2">
                      <input type="radio" checked />
                      <div>직접 입력하기</div>
                    </div>
                  </div>

                  {/* 옵션 구성타입 */}
                  <div className="flex gap-5">
                    <div>옵션 구성타입</div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        checked={form.option.optionType === '단독형'}
                        onChange={() => changeOptionType('단독형')}
                        id="option-type-single"
                      />
                      <label htmlFor="option-type-single">단독형</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        checked={form.option.optionType === '조합형'}
                        onChange={() => changeOptionType('조합형')}
                        id="option-type-combination"
                      />
                      <label htmlFor="option-type-combination">조합형</label>
                    </div>
                  </div>

                  {/* 옵션명 개수 */}
                  <div className="flex gap-5">
                    <div>옵션명 개수</div>
                    <Select
                      onChange={changeOptionNameCount}
                      style={{ width: 100 }}
                      defaultValue={1}
                      options={[
                        { label: '1개', value: 1 },
                        { label: '2개', value: 2 },
                        { label: '3개', value: 3 },
                      ]}
                    />
                  </div>

                  {/* 정렬 순서 */}
                  <div className="flex gap-5">
                    <div>정렬 순서</div>
                    <Select
                      style={{ width: 100 }}
                      defaultValue={{ label: '등록순', value: '등록순' }}
                      options={[
                        { label: '등록순', value: '등록순' },
                        { label: '가나다순', value: '가나다순' },
                      ]}
                    />
                  </div>

                  {/* 옵션 입력 */}
                  <div className="flex gap-5">
                    <div>옵션입력</div>
                    <div className="flex flex-col gap-2">
                      {form.option.optionNameCount &&
                        // [1, 2].map((_, index) => (
                        Array.from(
                          { length: form.option.optionNameCount },
                          (_, i) => i
                        ).map((_, index) => (
                          <>
                            <div
                              key={`상품등록-optionName-${index}`}
                              className="flex gap-5"
                            >
                              <div className="flex gap-3">
                                <div>옵션명</div>
                                <Input
                                  onChange={(e) =>
                                    onChangeOptionInput(
                                      index,
                                      'name',
                                      e.target.value
                                    )
                                  }
                                  style={{ flex: 1 }}
                                  placeholder="예) 사이즈"
                                />
                              </div>
                              <div className="flex gap-3">
                                <div>옵션값</div>
                                <Input
                                  onChange={(e) =>
                                    onChangeOptionInput(
                                      index,
                                      'value',
                                      e.target.value
                                    )
                                  }
                                  style={{ flex: 1 }}
                                  placeholder="예) M, L, XL, XL"
                                />
                              </div>

                              {/* <Button onClick={() => onClickAddOption()}>
                                +
                              </Button> */}
                            </div>
                          </>
                        ))}
                      <div>
                        <Button
                          style={{ width: 200 }}
                          onClick={() => onClickAddOption()}
                        >
                          옵션목록으로 적용
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* 옵션목록 */}
                  <div>옵션목록 (총 1개)</div>

                  <Button style={{ width: 200 }}>선택삭제</Button>

                  {/* 옵션 테이블 */}
                  {form.option.optionType === '단독형' && (
                    <Table
                      rowSelection={{ type: 'checkbox', ...rowSelection }}
                      columns={optionsTableColumns}
                      dataSource={form.option.options}
                      pagination={false}
                    />
                  )}

                  {form.option.optionType === '조합형' && (
                    <Table
                      dataSource={tempData}
                      rowSelection={{ type: 'checkbox', ...rowSelection }}
                      bordered
                      pagination={false}
                    >
                      <ColumnGroup title="옵션명">
                        <Column
                          title="색상"
                          dataIndex="color"
                          key={'firstOption'}
                        />
                        <Column
                          title="사이즈"
                          dataIndex="size"
                          key={'secondOption'}
                        />
                      </ColumnGroup>
                      <Column title="옵션가격" dataIndex="price" key="price" />
                      <Column title="재고수량" dataIndex="stock" key="stock" />
                      <Column
                        title="판매상태"
                        dataIndex="status"
                        key="status"
                      />
                    </Table>
                  )}
                </>
              )}
              {/* option 상태에 따라 렌더링 */}

              {/* 직접입력형 */}
              <div className="flex gap-5">
                <div>직접입력형</div>
                <div className="flex gap-2">
                  <Button
                    type={form.customOption.isEnabled ? 'primary' : 'default'}
                    onClick={() => isCustomOptionEnabled(true)}
                  >
                    설정함
                  </Button>
                  <Button
                    type={!form.customOption.isEnabled ? 'primary' : 'default'}
                    onClick={() => isCustomOptionEnabled(false)}
                  >
                    설정안함
                  </Button>
                </div>
              </div>

              {form.customOption.isEnabled && (
                <>
                  {/* 옵션명 개수  */}
                  <div className="flex gap-5">
                    <div>옵션명 개수</div>
                    <div className="flex gap-2">
                      <Select
                        style={{ width: 100 }}
                        defaultValue={{ label: '1개', value: 1 }}
                        options={[
                          { label: '1개', value: 1 },
                          { label: '2개', value: 2 },
                        ]}
                      />
                    </div>
                  </div>

                  {/* 옵션목록(총 1개) */}
                  <div className="flex gap-5">
                    <div>옵션목록 (총 1개)</div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div>옵션명</div>
                      <div className="">
                        <Input placeholder="예) 컬러" />
                      </div>
                    </div>
                  </div>
                </>
              )}
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
