import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea({ className, ...rest }: IProps) {
  return (
    <textarea
      placeholder=""
      className={`peer w-full min-h-11 bg-transparent font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-6 rounded-md !pr-9 !text-white border-white focus:border-white ${className}`}
      rows={4}
      {...rest}
    ></textarea>
  );
}
export default Textarea;
