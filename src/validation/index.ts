import * as yup from "yup";
export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(4, "Username should be at least 4 characters long")
      .max(30, "Username should be at most 30 characters long")
      .matches(
        /^(?=.*[a-zA-Z])[a-zA-Z0-9._]+$/,
        "Username should only contain letters, numbers, . and _"
      ),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Please enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 characters long")
      .max(20, "Password should be at most 20 characters long"),
  })
  .required();
export const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .required("Email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Please enter a valid email"),
    password: yup.string().required("Password is required"),
  })
  .required();
