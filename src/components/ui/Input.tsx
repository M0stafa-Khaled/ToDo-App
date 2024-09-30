import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
}
export const Input = forwardRef(
  ({ type, className, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder=""
        className={`peer w-full h-full bg-transparent font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-6 rounded-md !pr-9 !text-white border-white focus:border-white ${className}`}
        {...rest}
      />
    );
  }
);
