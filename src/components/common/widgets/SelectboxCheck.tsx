import { TYPOGRAPHY } from '@/styles/typography';
import { use, useState } from 'react';
import ArrowToBottom from '../icon/ArrowToBottom';
import ArrowToTop from '../icon/ArrowToTop';

const SelectboxCheck = ({ placeholder }: { placeholder: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    label: '',
    value: '',
  });

  const closeOptions = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (option: { label: string; value: string }) => {
    setSelectedOption(option);
    closeOptions();
  };

  // 배송 문의,재입고 문의, 상품 상세 문의, 기타
  const options = [
    { label: '사이즈 문의', value: 'size' },
    {
      label: '배송 문의',
      value: 'delivery',
    },
    { label: '재입고 문의', value: 'restock' },
    { label: '상품 상세 문의', value: 'detail' },
    { label: '기타', value: 'etc' },
  ];

  return (
    <div className="relative w-full flex flex-col gap-4">
      <div className="w-full border border-Grey-60 rounded-xl">
        <div
          className={`px-4 py-3 flex justify-between items-center ${TYPOGRAPHY.Heading318Semi}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className={`${TYPOGRAPHY.Heading318Medium} text-Grey-60`}>
            {' '}
            {selectedOption.label || placeholder}
          </div>
          <div>{isOpen ? <ArrowToTop /> : <ArrowToBottom />}</div>
        </div>
      </div>

      {isOpen && (
        <ul
          className={` absolute top-[56px] left-0 w-full border border-Grey-60 rounded-xl bg-white z-10`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`${TYPOGRAPHY.Heading318Medium} ${option.value === selectedOption.value ? 'text-Grey-90' : 'text-Grey-60'} flex items-center justify-between px-4 py-3 cursor-pointer`}
              onClick={() => handleOptionClick(option)}
            >
              <div>{option.label}</div>
              <div>
                {option.value === selectedOption.value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.3639 3.40738C14.5513 3.59491 14.6566 3.84921 14.6566 4.11438C14.6566 4.37954 14.5513 4.63385 14.3639 4.82138L6.86852 12.3167C6.76947 12.4158 6.65187 12.4944 6.52244 12.548C6.39301 12.6016 6.25429 12.6292 6.11419 12.6292C5.97409 12.6292 5.83537 12.6016 5.70594 12.548C5.57651 12.4944 5.45891 12.4158 5.35985 12.3167L1.63585 8.59338C1.54034 8.50113 1.46416 8.39079 1.41175 8.26878C1.35934 8.14678 1.33176 8.01556 1.3306 7.88278C1.32945 7.75 1.35475 7.61832 1.40503 7.49542C1.45531 7.37253 1.52957 7.26088 1.62346 7.16698C1.71735 7.07309 1.829 6.99884 1.9519 6.94856C2.0748 6.89828 2.20648 6.87297 2.33926 6.87413C2.47204 6.87528 2.60326 6.90287 2.72526 6.95528C2.84726 7.00769 2.95761 7.08387 3.04985 7.17938L6.11385 10.2434L12.9492 3.40738C13.0421 3.31445 13.1523 3.24073 13.2737 3.19044C13.3951 3.14014 13.5251 3.11426 13.6565 3.11426C13.7879 3.11426 13.918 3.14014 14.0394 3.19044C14.1607 3.24073 14.271 3.31445 14.3639 3.40738Z"
                      fill="black"
                    />
                  </svg>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectboxCheck;
