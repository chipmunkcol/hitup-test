interface LabelLayoutProps {
  label: string;
  children: React.ReactNode;
}

const LabelLayout = ({ label, children }: LabelLayoutProps) => {
  return (
    <div className="flex">
      <div className="w-[100px]">{label}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default LabelLayout;
