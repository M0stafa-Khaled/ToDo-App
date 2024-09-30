import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";
import { ILoginInput, IRegisterInput } from "../interfaces";

export const REGISTER_FORM_INPUTS: IRegisterInput[] = [
  {
    name: "username",
    label: "Username",
    icon: <UserIcon />,
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    icon: <EnvelopeIcon />,
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

// --------------------------------------------------------------------
export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "identifier",
    label: "Email",
    icon: <EnvelopeIcon />,
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];
