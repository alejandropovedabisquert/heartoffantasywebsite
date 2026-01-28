import { FormErrors } from "@/components/common/RegisterForm";
import { User } from "@/types/user";

export function validateRegisterForm(
  values: User,
  t: (key: string) => string
): { [key: string]: FormErrors } {
  const errors: { [key: string]: FormErrors } = {};

  if (!values.username?.trim()) {
    errors.username = {
      success: false,
      message: t("inputs.username.requiredError"),
    };
  } else if (values.username && /\s/.test(values.username)) {
    errors.username = {
      success: false,
      message: t("inputs.username.validError"),
    };
  }

  if (!values.email?.trim()) {
    errors.email = {
      success: false,
      message: t("inputs.email.requiredError"),
    };
  } else if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = {
      success: false,
      message: t("inputs.email.validError"),
    };
  }

  if (!values.password) {
    errors.password = {
      success: false,
      message: t("inputs.password.requiredError"),
    };
  } else if (values.password && values.password.length < 6) {
    errors.password = {
      success: false,
      message: t("inputs.password.validError"),
    };
  }

  return errors;
}