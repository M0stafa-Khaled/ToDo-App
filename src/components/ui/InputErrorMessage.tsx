import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface IProps {
  msg?: string;
}

const InputErrorMessage = ({ msg }: IProps) =>
  msg ? (
    <p className="antialiased font-sans mt-2 flex items-center gap-1 text-red-600 font-normal text-xs">
      <ExclamationCircleIcon className="size-5" />
      {msg}
    </p>
  ) : null;

export default InputErrorMessage;
