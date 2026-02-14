import clsx from "clsx";

const Input: React.FC<{
  id: string;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  required?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  id,
  placeholder,
  type = "text",
  className,
  name,
  value,
  required = false,
  onChange,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      aria-label={placeholder}
      className={clsx("px-6 py-4 my-4 border w-full text-white bg-neutral-800 border-corporative transition-all duration-500 focus:scale-[1.02] focus:bg-[#372F2F] outline-none", className)}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
