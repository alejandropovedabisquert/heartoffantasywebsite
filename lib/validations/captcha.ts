import { FormErrors } from "@/types/formErrors";

type ValidateCaptchaDict = {
  inputs: {
    captcha: { requiredError: string; };
  };
};

export function validateCaptcha(
  value: string,
  dict: ValidateCaptchaDict
): { [key: string]: FormErrors } {
  const errors: { [key: string]: FormErrors } = {};
  if (!value || !value.trim()) {
    errors.captcha = {
      success: false,
      message: dict.inputs.captcha.requiredError,
    };
  }
  return errors;
}