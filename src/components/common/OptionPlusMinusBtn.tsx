import MinusBtn from '@/assets/images/icon/MinusBtn';
import PlusBtn from '@/assets/images/icon/PlusBtn';

interface OptionPlusMinusBtnProps {
  quantity: number;
  onAdd?: (...args: any[]) => void;
  onSubtract?: (...args: any[]) => void;
}

const OptionPlusMinusBtn = ({
  quantity,
  onAdd,
  onSubtract,
}: OptionPlusMinusBtnProps) => {
  return (
    <div className="border border-Grey-60 bg-Grey-05 rounded-sm flex ">
      <button onClick={onSubtract} className="pl-[7px] pr-[5px]">
        <MinusBtn />
      </button>
      <div
        className={`flex-1 text-center pl-[11px] pr-[12px] border-l border-r border-Grey-60`}
      >
        {quantity}
      </div>
      <button onClick={onAdd} className="py-[6px] px-[6px]">
        <PlusBtn />
      </button>
    </div>
  );
};

export default OptionPlusMinusBtn;
