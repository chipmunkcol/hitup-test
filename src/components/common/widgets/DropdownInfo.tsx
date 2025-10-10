import { useState } from 'react';

interface DropdownInfoProps {
  title: string;
  data: string;
}

const DropdownInfo = ({ title, data }: DropdownInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full items-center">
      <div className="text-lg font-semibold">{title}</div>
      {!isOpen && (
        <div className="absolute top-[0px] right-0" onClick={toggleDropdown}>
          ↓
        </div>
      )}
      {isOpen && (
        <div className="absolute top-[0px] right-0" onClick={toggleDropdown}>
          ↑
        </div>
      )}

      {isOpen && (
        <div className="w-full bg-Grey-30 rounded-[16px] pb-[16px] px-[20px] mt-[8px]">
          {data}
        </div>
      )}
    </div>
  );
};

export default DropdownInfo;
