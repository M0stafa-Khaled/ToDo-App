import { useState } from "react"; // FormEvent
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import IconShowPass from "../components/ui/IconShowPass";
import { REGISTER_FORM_INPUTS } from "../data";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import axiosInstanceAPI from "../config/axios.config";
import { registerSchema } from "../validation";
import loginImage from "../assets/login.svg";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  // ** STATES
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ** HANDLER
  interface IFormInput {
    email: string;
    username: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstanceAPI.post(
        "/auth/local/register",
        data
      );

      if (status === 200) {
        toast.success(
          "You are registered successfully, You will navigate to login page after 3 seconds",
          {
            position: "bottom-center",
            duration: 3000,
            style: {
              background: "#fff",
              color: "#121212",
              padding: "10px",
            },
            iconTheme: {
              primary: "rgb(16 194 0)",
              secondary: "#fff",
            },
          }
        );
        setIsLoading(false);
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const message =
        errorObj.response?.data?.error?.message || "Unknown error";
      toast.error(`${message}`, {
        icon: <ExclamationTriangleIcon className="size-6 text-red-600" />,
        position: "bottom-center",
        duration: 3000,
        style: {
          background: "#fff",
          color: "#121212",
          padding: "10px",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ** RENDERS
  const renderRegisterFormInputs = REGISTER_FORM_INPUTS.map((input, idx) => (
    <div className="mb-4 w-full" key={idx}>
      <div className="relative w-full min-w-[200px] h-11">
        {input.type === "password" ? (
          <IconShowPass
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        ) : (
          <div className="grid place-items-center absolute text-blue-gray-500 top-2/4 right-3 -translate-y-2/4 w-6 h-6">
            {input.icon}
          </div>
        )}
        <Input
          type={
            input.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : input.type
          }
          {...register(input.name)}
        />
        <Label>{input.label}</Label>
      </div>
      {/* ERROR MESSAGES */}
      <InputErrorMessage msg={errors[input.name]?.message} />
    </div>
  ));

  return (
    <>
      <div className="register py-10 flex items-between lg:items-center flex-col-reverse lg:flex-row justify-end lg:justify-between">
        <div className="w-full flex justify-center">
          <div className="max-w-md flex flex-col justify-center ">
            <div className="my-5 text-center lg:text-start">
              <h1 className="text-white font-bold text-2xl">
                Create an account in{" "}
                <span className="text-[#FFC107] text-3xl">TODO</span>
                HUB
              </h1>
              <p className="text-white opacity-70">
                Create an account to add your tasks
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Inputs */}
              {renderRegisterFormInputs}
              <Button
                className="font-outfit w-full flex justify-center items-center bg-indigo-500 py-5 px-6 rounded-lg text-base tracking-widest mt-7"
                type="submit"
                isLoading={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </form>
            <div className="flex justify-center mt-2 ml-2">
              <p className="text-white opacity-90">Already have an account?</p>
              <Link to="/" className="text-[#FFC107] ml-1 underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-center">
            <img
              src={loginImage}
              alt="login photo"
              className="max-w-[300px] lg:max-w-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
};
