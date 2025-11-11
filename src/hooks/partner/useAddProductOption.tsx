import { swalConfirm } from '@/components/common/libs/sweetalert/sweetalert';
import { Button, type TableColumnsType, type TableProps } from 'antd';
import { useEffect, useRef, useState } from 'react';

interface OptionType {
  key?: React.Key;
  id: string;
  name: string;
  value: string;
  price: number;
  stock: number;
}

const useAddProductOption = () => {
  const [option, setOption] = useState({
    // isEnabled: false,
    optionType: '단독형',
    optionLength: 1,
    sortOrder: 1,
    options: [] as OptionType[],
  });

  const originalOptionsRef = useRef<OptionType[] | null>(null);

  const changeOptionTypeController = async (type: '단독형' | '조합형') => {
    if (option.options.length > 0) {
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
    setOption((prev) => ({
      ...prev,
      optionType: type,
      options: [],
    }));
  };

  const changeOptionLength = (count: number) => {
    setOption((prev) => ({
      ...prev,
      optionLength: count,
    }));
  };

  const [editAllOptionInput, setEditAllOptionInput] = useState({
    price: 0,
    stock: 0,
  });

  const [selectedOptionsId, setSelectedOptionsId] = useState<string[]>([]);
  const onClickDeleteAllOption = () => {
    setOption((prev) => {
      const newOptions = prev.options.filter(
        (opt) => !selectedOptionsId.includes(opt.id)
      );
      return {
        ...prev,
        options: newOptions,
      };
    });
  };

  const onClickEditAllOption = () => {
    setOption((prev: any) => {
      const newOptions = prev.options.map((opt: any) => {
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
        options: newOptions,
      };
    });
  };

  const onChangeEditAllOptionInput = (name: string, value: string) => {
    setEditAllOptionInput((prev) => ({ ...prev, [name]: value }));
  };

  const rowSelection: TableProps<OptionType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: OptionType[]) => {
      console.log('selectedRowKeys: ', selectedRowKeys);
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
    setOption((prev) => {
      const newOptions = [...prev.options];
      const filteredOptions = newOptions.filter((opt) => opt.id !== id);
      return {
        ...prev,
        options: filteredOptions,
      };
    });
  };

  const onClickAddOption = async () => {
    if (option.options.length > 0) {
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
    setOption((prev) => ({
      ...prev,
      options: newOptions,
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
    if (option.options.length > 0) {
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
    setOption((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const optionsTableColumns: TableColumnsType<OptionType> = [
    {
      title: '옵션명',
      dataIndex: 'name',
      render: (value: string) => <div>{value}</div>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '옵션값',
      dataIndex: 'value',
      sorter: (a, b) => a.value.localeCompare(b.value),
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

  // optionInput 조합형일 때 버그있음 ref로 관리해주고 갯수 변경 & 옵션목록으로 적용 시에만 state로 관리하면 될듯
  // const optionInputRef = useRef<OptionInputType[]>([])
  useEffect(() => {
    const count = option?.optionLength || 1;

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
  }, [option?.optionLength]);

  const onChangeOptionInput = (index: number, name: string, value: string) => {
    // setOptionInput((prev) => ({ ...prev, [name]: value }));
    setOptionInput((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, [name]: value } : opt))
    );
  };

  return {
    option,
    changeOptionTypeController,
    changeOptionLength,
    optionInput,
    onChangeOptionInput,
    onClickAddOption,
    onClickAddCombiOption,
    optionsTableColumns,
    rowSelection,
    onChangeTable,
    onClickDeleteOption,
    editAllOptionInput,
    onChangeEditAllOptionInput,
    onClickDeleteAllOption,
    onClickEditAllOption,
    selectedOptionsId,
  };
};

export default useAddProductOption;
