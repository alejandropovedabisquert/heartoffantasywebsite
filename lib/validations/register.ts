import { FormErrors } from "@/types/formErrors";
import { User } from "@/types/user";

type RegisterDict = {
  inputs: {
    username: { requiredError: string; validError: string; };
    email: { requiredError: string; validError: string; };
    password: { requiredError: string; validError: string; };
  };
};

export function validateRegisterForm(
  values: User,
  dict: RegisterDict
): { [key: string]: FormErrors } {
  const errors: { [key: string]: FormErrors } = {};

  if (!values.username?.trim()) {
    errors.username = {
      success: false,
      message: dict.inputs.username.requiredError,
    };
  } else if (values.username && /\s/.test(values.username)) {
    errors.username = {
      success: false,
      message: dict.inputs.username.validError,
    };
  }

  if (!values.email?.trim()) {
    errors.email = {
      success: false,
      message: dict.inputs.email.requiredError,
    };
  } else if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = {
      success: false,
      message: dict.inputs.email.validError,
    };
  }

  if (!values.password) {
    errors.password = {
      success: false,
      message: dict.inputs.password.requiredError,
    };
  } else if (values.password && values.password.length < 6) {
    errors.password = {
      success: false,
      message: dict.inputs.password.validError,
    };
  }

  return errors;
}