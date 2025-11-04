import { TYPOGRAPHY } from '@/styles/typography';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'blue' | 'grey' | 'default';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  variant = 'default',
  children,
  onClick,
  className,
}: ButtonProps) => {
  const buttonStyles = {
    blue: 'bg-HITUP_Blue text-white',
    grey: 'bg-Grey-70 text-white',
    default: `border border-HITUP_Blue bg-white text-HITUP_Blue`,
  };

  return (
    <button
      onClick={onClick}
      className={`w-full px-5 py-2  rounded-lg ${TYPOGRAPHY.Heading318Semi} ${buttonStyles[variant]} ${className} cursor-pointer`}
      // {...props}
    >
      {children}
    </button>
  );
};
export default Button;
