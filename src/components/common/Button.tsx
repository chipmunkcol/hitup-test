const Button = ({
  variant,
  children,
  onClick,
}: {
  variant: 'grey' | 'default';
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-lg cursor-pointer ${
        variant === 'grey'
          ? ' bg-Grey-70 text-white'
          : 'border border-Grey-20 bg-white text-black'
      }`}
    >
      {children}
    </button>
  );
};
export default Button;
