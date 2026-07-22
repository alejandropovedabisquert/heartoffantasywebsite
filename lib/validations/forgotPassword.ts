import { FormErrors } from "@/types/formErrors";

type ForgotPasswordDict = {
  inputs: {
    email: { requiredError: string; validError: string; };
  };
};

type Mail = {
    email: string
}

export function validateForgotPasswordForm(
  values: Mail,
  dict: ForgotPasswordDict
): { [key: string]: FormErrors } {
  const errors: { [key: string]: FormErrors } = {};

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

  return errors;
}