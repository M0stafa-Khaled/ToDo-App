import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ButtonHTMLAttributes } from "react";
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}
export const Button = ({
  children,
  className,
  type = "button",
  isLoading = false,
  ...rest
}: IProps) => {
  return (
    <button
      className={`align-middle font-outfit select-none text-center transition-all disabled:opacity-50 disabled:shadow-none  disabled:cursor-not-allowed selection:rounded-lg text-white shadow-md hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85] font-outfit py-0 px-0 font-medium relative overflow-hidden ${className}`}
      type={type}
      {...rest}
      disabled={isLoading}
    >
      {isLoading ? (
        <ArrowPathIcon className="animate-spin ml-1 mr-3 h-5 w-5" />
      ) : null}
      {children}
    </button>
  );
};

{
  /*
  align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] font-outfit text-white py-3 px-6 flex justify-center items-center
   */
}
