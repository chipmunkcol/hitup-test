import { TYPOGRAPHY } from '@/styles/typography';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: 'default' | 'grey';
}

const Input = ({ color = 'default', ...props }: InputProps) => {
  const colorClasses = {
    default: 'border-Grey-60',
    grey: 'border-Grey-10',
  };

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className={`w-full border ${colorClasses[color]} text-Grey-60 placeholder-Grey-60 rounded-xl px-4 py-3 focus:outline-none focus:border-Grey-60 ${TYPOGRAPHY.Heading318Medium} `}
    />
  );
};

export default Input;
