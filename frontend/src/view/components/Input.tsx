import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
}

export const Input = ({ placeholder, name, id, ...props }: InputProps) => {
  const inputId = id ?? name;
  return (
    <div className="relative">
      <input
        {...props}
        id={inputId}
        className="
      bg-white
        rounded-lg
        w-full border
      border-gray-500
        px-3
        h-[52px] 
      text-gray-800 
        pt-4 
        placeholder-shown:pt-0 
      focus:border-gray-800 
        transition-all
        outline-none
        peer"
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        //className="absolute left-[13px] top-3.5 pointer-events-none text-gray-700"
        className="
        absolute
        text-xs left-[13px]
        top-2
        pointer-events-none
      text-gray-700
        peer-placeholder-shown:text-base
        peer-placeholder-shown:top-3.5
        transition-all"
      >
        {placeholder}
      </label>
    </div>
  );
};
