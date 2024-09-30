import { ReactElement } from "react";

export interface IRegisterInput {
  name: "email" | "username" | "password";
  label: string;
  type: string;
  icon?: ReactElement;
}

export interface ILoginInput {
  name: "identifier" | "password";
  label: string;
  icon?: ReactElement;
  type: string;
}

export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}

export interface ITodo {
  id?: number;
  title: string;
  description: string;
}
