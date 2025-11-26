import { TYPOGRAPHY } from '@/styles/typography';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'blue' | 'grey' | 'default';
  children: React.ReactNode;
  // onClick?: () => void; props로 받게 하는게 훨씬 안정적
  className?: string;
}

const MyButton = ({
  variant = 'default',
  children,
  // onClick,
  className,
  ...props
}: ButtonProps) => {
  const buttonStyles = {
    blue: 'bg-HITUP_Blue text-white',
    grey: 'bg-Grey-70 text-white',
    default: `border border-HITUP_Blue bg-white text-HITUP_Blue`,
  };

  return (
    <button
      className={twMerge(
        // clsx(
        //   `w-full px-5 py-2 rounded-lg ${TYPOGRAPHY.Heading318Semi} ${buttonStyles[variant]} cursor-pointer`,
        //   className
        // )
        clsx(
          'w-full px-5 py-2 rounded-lg',
          TYPOGRAPHY.Heading318Semi,
          buttonStyles[variant],
          'cursor-pointer',
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
};
export default MyButton;
