const Selectbox = ({
  placeholder,
  name,
  children,
  onChange,
  props,
}: {
  placeholder?: string;
  name?: string;
  children: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  props?: React.SelectHTMLAttributes<HTMLSelectElement>;
}) => {
  return (
    <select
      onChange={onChange}
      className="border border-Grey-20 rounded-lg px-3 py-4"
      name={name}
      {...props}
    >
      <option value="" selected disabled hidden>
        {placeholder}
      </option>
      {children}
    </select>
  );
};

export default Selectbox;
