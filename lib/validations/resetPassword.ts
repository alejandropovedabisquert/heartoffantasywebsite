import { FormErrors } from "@/types/formErrors";

type ResetPasswordDict = {
  inputs: {
    password: { requiredError: string; validError: string; };
    samePassword: { requiredError: string; validError: string; };
  };
};

type Passwords = {
    password: string,
    samePassword: string,
}

export function validateResetPasswordForm(
  values: Passwords,
  dict: ResetPasswordDict
): { [key: string]: FormErrors } {
  const errors: { [key: string]: FormErrors } = {};

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

  if (!values.samePassword) {
    errors.samePassword = {
      success: false,
      message: dict.inputs.samePassword.requiredError,
    };
  } else if (values.password !== values.samePassword) {
    errors.samePassword = {
      success: false,
      message: dict.inputs.samePassword.validError,
    };
  }

  return errors;
}