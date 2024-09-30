import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface IProps {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

export default function IconShowPass({
  showPassword,
  setShowPassword,
}: IProps) {
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="grid place-items-center absolute text-blue-gray-500 top-2/4 right-3 -translate-y-2/4 w-6 h-6">
      {showPassword ? (
        <EyeIcon onClick={handleShowPassword} className="cursor-pointer" />
      ) : (
        <EyeSlashIcon onClick={handleShowPassword} className="cursor-pointer" />
      )}
    </div>
  );
}
