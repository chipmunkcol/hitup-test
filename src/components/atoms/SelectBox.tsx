import ArrowToBottom from '@/assets/images/icon/ArrowToBottom';
import ArrowToTop from '@/assets/images/icon/ArrowToTop';
import { TYPOGRAPHY } from '@/styles/typography';
import { useState } from 'react';

// type SelectedOption = {
//   name: string;
//   quantity: number;
//   price: number;
// };

const SelectBox = ({
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

  // const addOptionQuantity = (option: SelectedOption) => {
  //   setSelectedOption((prev) =>
  //     prev.map((item) =>
  //       item.name === option.name
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     )
  //   );
  // };

  // const subtractOptionQuantity = (option: SelectedOption) => {
  //   const isLastItem =
  //     selectedOption.find((item) => item.name === option.name)?.quantity === 1;
  //   if (isLastItem) {
  //     setSelectedOption((prev) =>
  //       prev.filter((item) => item.name !== option.name)
  //     );
  //     return;
  //   }

  //   setSelectedOption((prev) =>
  //     prev.map((item) =>
  //       item.name === option.name
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };

  // const removeOption = (option: SelectedOption) => {
  //   setSelectedOption((prev) =>
  //     prev.filter((item) => item.name !== option.name)
  //   );
  // };

  const handleOptionClick = (optionName: string, price: number) => {
    handleOptionChange(optionName, price);
    closeOptions();
  };

  return (
    <div className={`flex flex-col `}>
      <div className="w-full border border-Grey-60 rounded-xl">
        <div
          className={`px-4 py-2 flex justify-between items-center ${TYPOGRAPHY.Heading318Semi}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="text-Grey-70">{placeholder}</div>
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
    </div>
  );
};

export default SelectBox;

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
