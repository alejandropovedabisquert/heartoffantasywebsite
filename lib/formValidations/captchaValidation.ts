import { FormErrors } from "@/components/common/RegisterForm";

export function validateCaptcha(
  value: string,
  t: (key: string) => string
): { [key: string]: FormErrors } {
  const errors: { [key: string]: FormErrors } = {};
  if (!value || !value.trim()) {
    errors.captcha = {
      success: false,
      message: t("inputs.captcha.requiredError"),
    };
  }
  return errors;
}