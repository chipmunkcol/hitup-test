import { Button, Input, Select } from 'antd';
import { useEffect, useState } from 'react';

const initialCustomOptionInput = {
  value: '',
};

// type OptionInputType = typeof initialOptionInput;
type CustomOptionInputType = typeof initialCustomOptionInput;

const OptionCustom = () => {
  const [customOption, setCustomOption] = useState({
    isEnabled: false,
    OptionLength: 1,
    options: [],
  });

  const [, setCustomOptionInput] = useState<CustomOptionInputType[]>([]);
  // console.log('customOptionInput: ', customOptionInput);

  useEffect(() => {
    const count = customOption?.OptionLength || 1;

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
  }, [customOption?.OptionLength]);
  // console.log('form.option.OptionLength: ', customOption);
  // console.log('optionInput: ', optionInput);

  const onChangeCustomOptionInput = (index: number, value: string) => {
    setCustomOptionInput((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, value } : opt))
    );
  };

  const changeCustomOptionLength = (count: number) => {
    setCustomOption((prev) => ({
      ...prev,
      OptionLength: count,
    }));
  };

  const isCustomOptionEnabled = (isEnabled: boolean) => {
    setCustomOption((prev) => ({
      ...prev,
      isEnabled: isEnabled,
    }));
  };
  return (
    <>
      {/* 직접입력형 */}
      <div className="flex gap-5">
        <div>직접입력형</div>
        <div className="flex gap-2">
          <Button
            type={customOption.isEnabled ? 'primary' : 'default'}
            onClick={() => isCustomOptionEnabled(true)}
          >
            설정함
          </Button>
          <Button
            type={!customOption.isEnabled ? 'primary' : 'default'}
            onClick={() => isCustomOptionEnabled(false)}
          >
            설정안함
          </Button>
        </div>
      </div>

      {customOption.isEnabled && (
        <>
          {/* 옵션명 개수  */}
          <div className="flex gap-5">
            <div>옵션명 개수</div>
            <div className="flex gap-2">
              <Select
                onChange={changeCustomOptionLength}
                style={{ width: 100 }}
                defaultValue={customOption.OptionLength}
                options={[
                  { label: '1개', value: 1 },
                  { label: '2개', value: 2 },
                  { label: '3개', value: 3 },
                  { label: '4개', value: 4 },
                  { label: '5개', value: 5 },
                ]}
              />
            </div>
          </div>

          {/* 옵션목록(총 1개) */}
          <div className="flex gap-5">
            <div>옵션목록 (총 1개)</div>
            <div className="flex-1 flex flex-col gap-2">
              <div>옵션명</div>
              {customOption.OptionLength &&
                Array.from(
                  { length: customOption.OptionLength },
                  (_, index) => (
                    <div key={`상품등록-custom-option${index}`}>
                      <div className="">
                        <Input
                          onChange={(e) =>
                            onChangeCustomOptionInput(index, e.target.value)
                          }
                          placeholder="예) 색상은 빨강, LOVE 문구를 적어주세요"
                        />
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OptionCustom;
