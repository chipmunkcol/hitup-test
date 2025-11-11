import useAddProductOption from '@/hooks/partner/useAddProductOption';
import useActiveBtn from '@/hooks/useActiveBtn';
import { Button, Form, Input, Select, Table } from 'antd';
import Column from 'antd/es/table/Column';
import ColumnGroup from 'antd/es/table/ColumnGroup';

const Option = () => {
  const {
    changeOptionLength,
    changeOptionTypeController,
    onChangeEditAllOptionInput,
    onChangeOptionInput,
    onChangeTable,
    onClickAddCombiOption,
    onClickAddOption,
    onClickDeleteAllOption,
    onClickDeleteOption,
    onClickEditAllOption,
    option,
    optionInput,
    optionsTableColumns,
    rowSelection,
  } = useAddProductOption();
  const { isActive, activeBtn, enableBtn } = useActiveBtn();

  return (
    <>
      <div className="flex gap-5">
        <Form.Item label="선택형">
          <div className="flex gap-2">
            <Button type={isActive ? 'primary' : 'default'} onClick={activeBtn}>
              설정함
            </Button>
            <Button type={isActive ? 'default' : 'primary'} onClick={enableBtn}>
              설정안함
            </Button>
          </div>
        </Form.Item>
      </div>

      {/* 옵션 설정함 상태인 경우 */}
      {/* 옵션 설정함 상태인 경우 */}
      {isActive && (
        <>
          <Form.Item label="옵션 입력방식">
            <div className="flex gap-2">
              <input type="radio" checked />
              <div>직접 입력하기</div>
            </div>
          </Form.Item>

          {/* 옵션 구성타입 */}
          <Form.Item label="옵션 구성타입">
            <div className="flex gap-5">
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
          </Form.Item>

          {/* 옵션명 개수 */}
          <Form.Item label="옵션명 개수" name="optionLength">
            <Select
              onChange={changeOptionLength}
              style={{ width: 100 }}
              defaultValue={option?.optionLength}
              options={[
                { label: '1개', value: 1 },
                { label: '2개', value: 2 },
                { label: '3개', value: 3 },
              ]}
            />
          </Form.Item>

          {/* 옵션 입력 */}
          <div className="flex gap-5">
            <div className="w-[100px]">옵션입력</div>
            <div className="flex-1 flex flex-col gap-2">
              {option.optionLength &&
                Array.from({ length: option.optionLength }, (_, i) => i).map(
                  (_, index) => (
                    <>
                      <div
                        key={`상품등록-optionName-${index}`}
                        className="flex gap-5"
                      >
                        <div className="flex gap-3">
                          <div>옵션명</div>
                          <Form.Item name={`optionName${index}`}>
                            <Input
                              value={optionInput[index]?.name}
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
                          </Form.Item>
                        </div>
                        <div className="flex gap-3">
                          <div>옵션값</div>
                          <Form.Item name={`optionValue${index}`}>
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
                          </Form.Item>
                        </div>
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
