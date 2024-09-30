import { Button } from "../components/ui/Button";
import IconShowPass from "../components/ui/IconShowPass";
import { Input } from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { Label } from "../components/ui/Label";
import { REGISTER_FORM_INPUTS } from "../data";
import axiosInstanceAPI from "../config/axios.config";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

// ! This page is not finished yet
function Account() {
  // ** STATES
  const [userInformation, setUserInformation] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // ** HANDLER
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  useEffect(() => {
    (async () => {
      const res = await axiosInstanceAPI.get("/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      setUserInformation(res.data);
    })();
  }, [jwt]);

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
          value={userInformation[input.name]}
          // ERROR HERE EDIT THIS
          onChange={(e) => {
            setUserInformation({
              ...userInformation,
              [input.name]: e.target.value,
            });
          }}
        />
        <Label>{input.label}</Label>
      </div>
      {/* ERROR MESSAGES */}
      <InputErrorMessage />
    </div>
  ));

  return (
    <div className="text-white my-14 flex flex-col justify-center items-center">
      <div className=" flex flex-col justify-center items-center mb-5">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
          alt="avatar"
          className="p-0.5 inline-block relative object-cover object-center !rounded-full  border-2 border-gray-900  size-28"
        />
      </div>
      <div className="max-w-fit md:max-w-lg min-w-max md:min-w-80 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* Inputs */}
          {renderRegisterFormInputs}
          <Button
            className="font-outfit w-full flex justify-center items-center bg-indigo-500 py-4 px-6 rounded-lg text-base tracking-widest mt-7"
            type="submit"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
export default Account;
