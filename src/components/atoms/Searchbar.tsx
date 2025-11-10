import searchIcon from '../../assets/images/search.png';
import { TYPOGRAPHY } from '../../styles/typography';

interface SearchbarProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const Searchbar = ({
  value,
  onChange,
  placeholder,
  ref,
  ...props
}: SearchbarProps) => {
  return (
    <div className="w-[340px] px-[16px] py-[8px] rounded-[8px] bg-Grey-10 ">
      <div className="flex items-center gap-[12px]">
        <img src={searchIcon} alt="search" className="w-[24px] h-[24px]" />
        <input
          className={`text-Grey-60 ${TYPOGRAPHY.Subheading16Medium} border-none outline-none w-full`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
};

export default Searchbar;
