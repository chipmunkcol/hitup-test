import type { CATEGORY } from '@/data/const/const';
import type { AddProductProps } from '@/pages/partner/AddProduct';
import { useEffect, useRef, useState } from 'react';

type Category = {
  category: keyof typeof CATEGORY | '';
  subCategory: string;
  type: string;
  fish: string[];
};

interface UseAddProductProps {
  initialForm: AddProductProps;
}

const useAddProduct = (props: UseAddProductProps) => {
  const [form, setForm] = useState(props.initialForm);

  const [category, setCategory] = useState<Category>({
    category: '',
    subCategory: '',
    type: '',
    fish: [],
  });

  // depth 가 1인 카테고리 변경
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

  const onChangeInput = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const changeDiscountApplied = (isApplied: boolean) => {
    setForm((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        instantDiscount: {
          ...prev.price.instantDiscount,
          isApplied,
        },
      },
    }));
  };

  const onChangePrice = (value: string) => {
    setForm((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        original: Number(value),
      },
    }));
  };

  const changeOptionTypeController = async (type: '단독형' | '조합형') => {
    if (form.option.options.length > 0) {
      const res = await swalConfirm(
        '옵션 유형을 변경하시겠습니까?',
        '확인',
        '취소',
        '기존에 입력한 옵션 정보는 모두 삭제됩니다.'
      );
      if (!res?.isConfirmed) return;
      changeOptionTypeAndInit(type);
    } else {
      changeOptionTypeAndInit(type);
    }
  };

  const changeOptionTypeAndInit = async (type: '단독형' | '조합형') => {
    originalOptionsRef.current = null;
    setForm((prev) => ({
      ...prev,
      option: {
        ...prev.option,
        optionType: type,
        options: [],
      },
    }));
  };

  const changeOptionLength = (count: number) => {
    setForm((prev) => ({
      ...prev,
      option: {
        ...prev.option,
        OptionLength: count,
      },
    }));
  };

  const changeCustomOptionLength = (count: number) => {
    setForm((prev) => ({
      ...prev,
      customOption: {
        ...prev.customOption,
        OptionLength: count,
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

  const initialCustomOptionInput = {
    value: '',
  };

  type OptionInputType = typeof initialOptionInput;
  type CustomOptionInputType = typeof initialCustomOptionInput;

  const [optionInput, setOptionInput] = useState<OptionInputType[]>([]);
  const [customOptionInput, setCustomOptionInput] = useState<
    CustomOptionInputType[]
  >([]);
  console.log('customOptionInput: ', customOptionInput);

  useEffect(() => {
    const count = form?.option?.OptionLength || 1;

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
  }, [form?.option?.OptionLength]);

  useEffect(() => {
    const count = form?.customOption?.OptionLength || 1;

    setCustomOptionInput((prev) => {
      const newInputs = [...prev];

      if (count > prev.length) {
        for (let i = prev.length; i < count; i++) {
          newInputs.push({ ...initialCustomOptionInput });
        }
      }

      if (count < prev.length) {
        newInputs.splice(count);
      }
      return newInputs;
    });
  }, [form?.customOption?.OptionLength]);

  const onChangeOptionInput = (index: number, name: string, value: string) => {
    setOptionInput((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, [name]: value } : opt))
    );
  };

  const onChangeCustomOptionInput = (index: number, value: string) => {
    setCustomOptionInput((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, value } : opt))
    );
  };

  const onClickAddOption = async () => {
    if (form.option.options.length > 0) {
      const res = await swalConfirm(
        '옵션 목록으로 적용하시겠습니니까?',
        '확인',
        '취소',
        '옵션 목록에 입력된 정보가 초기화되며 새로 입력한 정보로 변경됩니다. '
      );
      if (!res?.isConfirmed) return;
    }

    let newOptions: any[] = [];
    optionInput.forEach((opt, i) => {
      const options = opt.value.split(',').map((val, j) => {
        return {
          key: `option-${i}-${j}`,
          id: `option-${i}-${j}`,
          name: opt.name,
          value: val.trim(),
          price: opt.price,
          stock: opt.stock,
        };
      });
      newOptions = [...newOptions, ...options];
    });

    // 반복문 안에서 옵션값으로 반복문을 돌려야할듯
    originalOptionsRef.current = newOptions;
    setForm((prev) => ({
      ...prev,
      option: {
        ...prev.option,
        options: newOptions,
      },
    }));
  };

  function generateCombinations(options: any[]) {
    // value를 쉼표 기준으로 분리
    const values = options.map((opt) => opt.value.split(','));

    // 모든 조합 구하기 (재귀 or reduce)
    const combinations = values.reduce(
      (acc, cur) => {
        const result: any[] = [];
        acc.forEach((prev: any[]) => {
          cur.forEach((value: any) => {
            result.push([...prev, value]);
          });
        });
        return result;
      },
      [[]]
    );

    // 각 조합을 객체 형태로 매핑
    return combinations.map((combo: any[]) => {
      const obj: any = {
        key: `option-combi-${combo.join('-')}`,
        id: `option-combi-${combo.join('-')}`,
        price: 0,
        stock: 0,
      };
      combo.forEach((value, i) => {
        obj['name'] = options[i].name;
        obj[options[i].name] = value;
      });
      return obj;
    });
  }

  const onClickAddCombiOption = async () => {
    if (form.option.options.length > 0) {
      const res = await swalConfirm(
        '옵션 목록으로 적용하시겠습니니까?',
        '확인',
        '취소',
        '옵션 목록에 입력된 정보가 초기화되며 새로 입력한 정보로 변경됩니다. '
      );
      if (!res?.isConfirmed) return;
    }

    const newOptions: any[] = generateCombinations(optionInput);
    originalOptionsRef.current = newOptions;
    setForm((prev) => ({
      ...prev,
      option: {
        ...prev.option,
        options: newOptions,
      },
    }));
  };

  const originalOptionsRef = useRef<any[] | null>(null);

  const [editAllOptionInput, setEditAllOptionInput] = useState({
    price: 0,
    stock: 0,
  });

  const [selectedOptionsId, setSelectedOptionsId] = useState<string[]>([]);
  const onClickDeleteAllOption = () => {
    setForm((prev) => {
      const newOptions = prev.option.options.filter(
        (opt) => !selectedOptionsId.includes(opt.id)
      );
      return {
        ...prev,
        option: {
          ...prev.option,
          options: newOptions,
        },
      };
    });
  };

  const onClickEditAllOption = () => {
    setForm((prev: any) => {
      const newOptions = prev.option.options.map((opt: any) => {
        if (selectedOptionsId.includes(opt.id)) {
          return {
            ...opt,
            ...editAllOptionInput,
          };
        }
        return opt;
      });
      return {
        ...prev,
        option: {
          ...prev.option,
          options: newOptions,
        },
      };
    });
  };

  const onChangeEditAllOptionInput = (name: string, value: string) => {
    setEditAllOptionInput((prev) => ({ ...prev, [name]: value }));
  };

  const rowSelection: TableProps<OptionType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: OptionType[]) => {
      const selectedIds = selectedRows.map((row) => row.id);
      setSelectedOptionsId(selectedIds);
    },

    // disable 처리 부분 따로 구분해서 정리하자
    // getCheckboxProps: (record: OptionType) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const onChangeTable: TableProps<OptionType>['onChange'] = (
    _,
    __,
    ___,
    extra
  ) => {
    console.log('Table changed:', extra.currentDataSource);
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

  return {};
};

export default useAddProduct;
