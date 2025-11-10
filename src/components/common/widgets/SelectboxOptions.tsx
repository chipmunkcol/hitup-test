import { TYPOGRAPHY } from '@/styles/typography';
import { useState } from 'react';
import ArrowToBottom from '../../../assets/images/icon/ArrowToBottom';
import ArrowToTop from '../../../assets/images/icon/ArrowToTop';
import CancelIcon from '../../../assets/images/icon/CancelIcon';
import OptionPlusMinusBtn from '../../atoms/OptionPlusMinusBtn';

type SelectedOption = {
  name: string;
  quantity: number;
  price: number;
};

const SelectboxOptions = ({
  placeholder,
  options,
}: {
  placeholder: string;
  options: { value: string; label: string; price: number }[];
  // props?: React.SelectHTMLAttributes<HTMLSelectElement>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeOptions = () => {
    setIsOpen(false);
  };

  // 옵션 클릭 시 선택 항목이 보이도록
  const [selectedOption, setSelectedOption] = useState<
    { name: string; quantity: number; price: number }[]
  >([]);
  console.log('selectedOption: ', selectedOption);

  const handleOptionChange = (name: string, price: number) => {
    const existingOption = selectedOption.find((item) => item.name === name);
    if (existingOption) {
      setSelectedOption((prev) =>
        prev.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setSelectedOption((prev) => [...prev, { name, quantity: 1, price }]);
    }
  };

  const addOptionQuantity = (option: SelectedOption) => {
    setSelectedOption((prev) =>
      prev.map((item) =>
        item.name === option.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const subtractOptionQuantity = (option: SelectedOption) => {
    const isLastItem =
      selectedOption.find((item) => item.name === option.name)?.quantity === 1;
    if (isLastItem) {
      setSelectedOption((prev) =>
        prev.filter((item) => item.name !== option.name)
      );
      return;
    }

    setSelectedOption((prev) =>
      prev.map((item) =>
        item.name === option.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeOption = (option: SelectedOption) => {
    setSelectedOption((prev) =>
      prev.filter((item) => item.name !== option.name)
    );
  };

  const handleOptionClick = (optionName: string, price: number) => {
    handleOptionChange(optionName, price);
    closeOptions();
  };

  return (
    <div className={`flex flex-col `}>
      <div className="w-full border rounded-xl">
        <div
          className={`px-4 py-2 flex justify-between items-center ${TYPOGRAPHY.Heading318Semi}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div>{placeholder}</div>
          <div>{isOpen ? <ArrowToTop /> : <ArrowToBottom />}</div>
        </div>
        {isOpen && (
          <ul className={` ${TYPOGRAPHY.Heading318Medium} text-Grey-60`}>
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleOptionClick(option.label, option.price)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* 선택된 옵션들 */}
      <ul className="flex flex-col gap-2 mt-4">
        {selectedOption.length > 0 &&
          selectedOption.map((selectedOption) => (
            <li className="bg-Grey-10 rounded-xl">
              <div className="py-3 px-4 flex items-center justify-between">
                <div className={`${TYPOGRAPHY.Heading318Semi}`}>
                  옵션 : {selectedOption.name}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => removeOption(selectedOption)}
                >
                  <CancelIcon />
                </div>
              </div>
              <div className="py-3 px-4 flex justify-between">
                {/* <div className="border border-Grey-60 bg-Grey-05 rounded-sm flex ">
                  <button
                    onClick={() => subtractOptionQuantity(selectedOption)}
                    className="pl-[7px] pr-[5px]"
                  >
                    <MinusBtn />
                  </button>
                  <div
                    className={` pl-[11px] pr-[12px] border-l border-r border-Grey-60`}
                  >
                    {selectedOption.quantity}
                  </div>
                  <button
                    onClick={() => addOptionQuantity(selectedOption)}
                    className="py-[6px] px-[6px]"
                  >
                    <PlusBtn />
                  </button>
                </div> */}
                <OptionPlusMinusBtn
                  quantity={selectedOption.quantity}
                  onAdd={() => addOptionQuantity(selectedOption)}
                  onSubtract={() => subtractOptionQuantity(selectedOption)}
                />
                <div className={`${TYPOGRAPHY.Heading318Semi}`}>
                  {selectedOption.price * selectedOption.quantity}원
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SelectboxOptions;

// const Selectbox = ({
//   placeholder,
//   name,
//   children,
//   onChange,
//   props,
// }: {
//   placeholder?: string;
//   name?: string;
//   children: React.ReactNode;
//   onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   props?: React.SelectHTMLAttributes<HTMLSelectElement>;
// }) => {
//   return (
//     <select
//       onChange={onChange}
//       className="flex"
//       name={name}
//       {...props}
//     >
//       <option value="" selected disabled hidden>
//         {placeholder}
//       </option>
//       {children}
//     </select>
//   );
// };

// export default Selectbox;
