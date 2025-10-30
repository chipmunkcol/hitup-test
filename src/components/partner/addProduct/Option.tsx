import { swalConfirm } from '@/components/common/libs/sweetalert/sweetalert';
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

interface OptionType {
  key?: React.Key;
  id: string;
  name: string;
  value: string;
  price: number;
  stock: number;
}

const Option = () => {
  const [option, setOption] = useState({
    isEnabled: false,
    optionType: '단독형',
    OptionLength: 1,
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
      OptionLength: count,
    }));
  };

  const isOptionEnabled = (isEnabled: boolean) => {
    setOption((prev) => ({
      ...prev,
      isEnabled: isEnabled,
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
  useEffect(() => {
    const count = option?.OptionLength || 1;

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
  }, [option?.OptionLength]);

  const onChangeOptionInput = (index: number, name: string, value: string) => {
    // setOptionInput((prev) => ({ ...prev, [name]: value }));
    setOptionInput((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, [name]: value } : opt))
    );
  };

  return (
    // <div className="p-4 ">
    //   <div className="border border-Grey-30 rounded-md p-4 flex flex-col gap-5">
    //     <div>옵션</div>
    <>
      <div className="flex gap-5">
        <div>선택형</div>
        <div className="flex gap-2">
          <Button
            type={option.isEnabled ? 'primary' : 'default'}
            onClick={() => isOptionEnabled(true)}
          >
            설정함
          </Button>
          <Button
            type={option.isEnabled ? 'default' : 'primary'}
            onClick={() => isOptionEnabled(false)}
          >
            설정안함
          </Button>
        </div>
      </div>

      {/* 옵션 설정함 상태인 경우 */}
      {/* 옵션 설정함 상태인 경우 */}
      {option.isEnabled && (
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
                checked={option.optionType === '단독형'}
                onChange={() => changeOptionTypeController('단독형')}
                id="option-type-single"
              />
              <label htmlFor="option-type-single">단독형</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                checked={option.optionType === '조합형'}
                onChange={() => changeOptionTypeController('조합형')}
                id="option-type-combination"
              />
              <label htmlFor="option-type-combination">조합형</label>
            </div>
          </div>

          {/* 옵션명 개수 */}
          <div className="flex gap-5">
            <div>옵션명 개수</div>
            <Select
              onChange={changeOptionLength}
              style={{ width: 100 }}
              defaultValue={option?.OptionLength}
              options={[
                { label: '1개', value: 1 },
                { label: '2개', value: 2 },
                { label: '3개', value: 3 },
              ]}
            />
          </div>

          {/* 정렬 순서 */}
          {/* <div className="flex gap-5">
                    <div>정렬 순서</div>
                    <Select
                      disabled={option.options.length === 0}
                      style={{ width: 100 }}
                      onChange={onChangeSortOptions}
                      defaultValue={'등록순'}
                      options={[
                        { label: '등록순', value: '등록순' },
                        { label: '가나다순', value: '가나다순' },
                      ]}
                    />
                  </div> */}

          {/* 옵션 입력 */}
          <div className="flex gap-5">
            <div>옵션입력</div>
            <div className="flex flex-col gap-2">
              {option.OptionLength &&
                // [1, 2].map((_, index) => (
                Array.from({ length: option.OptionLength }, (_, i) => i).map(
                  (_, index) => (
                    <>
                      <div
                        key={`상품등록-optionName-${index}`}
                        className="flex gap-5"
                      >
                        <div className="flex gap-3">
                          <div>옵션명</div>
                          <Input
                            value={optionInput[index]?.name}
                            onChange={(e) =>
                              onChangeOptionInput(index, 'name', e.target.value)
                            }
                            style={{ flex: 1 }}
                            placeholder="예) 사이즈"
                          />
                        </div>
                        <div className="flex gap-3">
                          <div>옵션값</div>
                          <Input
                            value={optionInput[index]?.value}
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
                  )
                )}
              <div>
                <Button
                  style={{ width: 200 }}
                  onClick={() =>
                    option.optionType === '단독형'
                      ? onClickAddOption()
                      : onClickAddCombiOption()
                  }
                >
                  옵션목록으로 적용
                </Button>
              </div>
            </div>
          </div>

          {/* 옵션목록 */}
          <div>옵션목록 (총 1개)</div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <Button onClick={onClickDeleteAllOption} style={{ width: 100 }}>
              선택삭제
            </Button>

            {option.optionType === '조합형' && (
              <>
                {/* 옵션가 */}
                <div className="flex gap-2">
                  <div>옵션가</div>
                  <Input
                    style={{ flex: 1 }}
                    onChange={(e) =>
                      onChangeEditAllOptionInput('price', e.target.value)
                    }
                    // placeholder="숫자만 입력"
                  />
                </div>

                {/* 재고수량 */}
                <div className="flex gap-2">
                  <div>재고수량</div>
                  <Input
                    style={{ flex: 1 }}
                    inputMode="numeric"
                    role="alert"
                    // placeholder="숫자만 입력"
                    onChange={(e) => {
                      onChangeEditAllOptionInput('stock', e.target.value);
                    }}
                  />
                </div>
              </>
            )}

            <div className="flex gap-2">
              <div className="flex gap-2">
                <div>사용여부</div>
                <Select
                  style={{ width: 50 }}
                  defaultValue={true}
                  options={[
                    { label: 'Y', value: true },
                    { label: 'N', value: false },
                  ]}
                />
              </div>

              <div>
                <Button onClick={onClickEditAllOption}>
                  선택목록 일괄수정
                </Button>
              </div>
            </div>
          </div>

          {/* 옵션 테이블 */}
          {option.optionType === '단독형' && (
            <Table
              rowSelection={{ type: 'checkbox', ...rowSelection }}
              columns={optionsTableColumns}
              dataSource={option.options}
              pagination={false}
              onChange={onChangeTable}
            />
          )}

          {option.optionType === '조합형' && (
            <Table
              dataSource={option.options}
              rowSelection={{ type: 'checkbox', ...rowSelection }}
              bordered
              pagination={false}
              onChange={onChangeTable}
            >
              <ColumnGroup title="옵션명">
                {optionInput.map((opt) => (
                  <Column
                    title={opt.name}
                    dataIndex={opt.name}
                    key={`option-${opt.name}`}
                    sorter={(a: any, b: any) =>
                      String(a[opt.name]).localeCompare(String(b[opt.name]))
                    }
                  />
                ))}
                {/* <Column
                          title="색상"
                          dataIndex="color"
                          key={'firstOption'}
                        />
                        <Column
                          title="사이즈"
                          dataIndex="size"
                          key={'secondOption'}
                        /> */}
              </ColumnGroup>
              <Column title="옵션가격" dataIndex="price" key="price" />
              <Column title="재고수량" dataIndex="stock" key="stock" />
              <Column title="판매상태" dataIndex="status" key="status" />
              <Column
                title="삭제"
                dataIndex="id"
                key="delete"
                render={(id: string) => (
                  <div>
                    <Button onClick={() => onClickDeleteOption(id)}>X</Button>
                  </div>
                )}
              />
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default Option;
