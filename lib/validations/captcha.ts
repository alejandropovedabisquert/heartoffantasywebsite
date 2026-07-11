import { FormErrors } from "@/components/common/RegisterForm";

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