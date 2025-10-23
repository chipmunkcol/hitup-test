import { TYPOGRAPHY } from '@/styles/typography';

const Input = ({ placeholder }: { placeholder: string }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`w-full border border-Grey-60 text-Grey-60 placeholder-Grey-60 rounded-xl px-4 py-3 focus:outline-none focus:border-Grey-60 ${TYPOGRAPHY.Heading318Medium} `}
    />
  );
};

export default Input;
