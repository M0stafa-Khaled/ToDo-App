import { useState } from "react"; // FormEvent
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import IconShowPass from "../components/ui/IconShowPass";
import { LOGIN_FORM } from "../data";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import axiosInstanceAPI from "../config/axios.config";
import { loginSchema } from "../validation";
import loginImage from "../assets/login.svg";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export const LoginPage = () => {
  // ** STATES
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cookie = new Cookies();
  // ** HANDLER
  interface IFormInput {
    identifier: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstanceAPI.post("/auth/local", data);
      if (res.status === 200) {
        toast.success(
          "You are logged in successfully,You will navigate to home page after 2 seconds",
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
        cookie.set("jwt", res.data.jwt);
        setTimeout(() => window.location.reload(), 2000);
      }
      // * ------------------------------------- *
    } catch (error) {
      console.log(error);
      const errorObj = error as AxiosError<IErrorResponse>;
      const message =
        errorObj.response?.data?.error?.message ||
        "An error occurred while logging in";
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
  const renderLoginFormInputs = LOGIN_FORM.map((input, idx) => (
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
      <div className="login py-10 flex items-between lg:items-center flex-col-reverse lg:flex-row justify-end lg:justify-between">
        <div className="w-full flex justify-center">
          <div className="max-w-md flex flex-col justify-center ">
            <div className="my-5 text-center lg:text-start">
              <h1 className="text-white font-bold text-3xl">
                Welcome to <span className="text-[#FFC107] text-4xl">TODO</span>
                HUB
              </h1>
              <p className="text-white opacity-70">
                Login your account to access tasks dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Inputs */}
              {renderLoginFormInputs}

              <Button
                className="font-outfit w-full flex justify-center items-center bg-indigo-500 py-5 px-6 rounded-lg text-base tracking-widest mt-7"
                type="submit"
                isLoading={isLoading}
              >
                {isLoading ? "Loading..." : "Sign In"}
              </Button>
            </form>
            <div className="flex justify-center mt-2 ml-2">
              <p className="text-white opacity-90">Don't have an account?</p>
              <Link to="/register" className="text-[#FFC107] ml-1 underline">
                Sign Up
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
