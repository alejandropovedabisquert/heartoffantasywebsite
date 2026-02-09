"use client";
import React, { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Input from "@/components/common/Input";
import { Titulo } from "@/components/common/Titulo";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { validateRegisterForm } from "@/lib/formValidations/registerValidation";
import { validateCaptcha } from "@/lib/formValidations/captchaValidation";
import { useRegister } from "@/lib/hooks/useRegister";
import { Loader2 } from "lucide-react";

export type FormErrors = {
  message?: string;
  success?: boolean;
};

export default function RegisterForm() {
  const t = useTranslations("RegisterForm");
  const ref = useRef<HTMLFormElement>(null);
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    [key: string]: FormErrors | undefined;
  }>({});

  const { register, isLoading, response } = useRegister();
  const locale = useLocale();

  const onCaptchaChange = (token: string) => {
    setCaptchaToken(token);
    setErrors((prev) => ({ ...prev, captcha: undefined }));
  };
  const onCaptchaExpire = () => setCaptchaToken(null);

  const validateForm = () => {
    const formErrors = validateRegisterForm({ username, email, password }, t);
    const captchaError = validateCaptcha(captchaToken || "", t);
    const termsError = !acceptedTerms && {
      terms: { message: t("inputs.conditions.requiredError"), success: false },
    };
    const newErrors = { ...formErrors, ...captchaError, ...termsError };
    setErrors(newErrors);
    captchaRef.current?.resetCaptcha();
    setCaptchaToken(null);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    if (ref.current) {
      const formData = new FormData(ref.current);
      formData.append("captcha", captchaToken || "");
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      await register(formData);
    }
  };

  // Function to render error messages
  const renderServerResponse = (response: FormErrors | undefined | null, email?: string) => (
    <div
      className={clsx(
        "text-center",
        { "text-red-600": response?.success === false },
        { "bg-green-600 px-6 py-2 text-green-200": response?.success === true }
      )}
    >
      {response?.message === "Username already exists." ? (
        <p>{t("inputs.usernameExists.text")}</p>
      ) : response?.message === "Email already exists." ? (
        <p>{t("inputs.emailExists.text")}</p>
      ) : response?.success === true ? (
        <p>{t("inputs.successMessage.text", { email: email || "undefined" })}</p>
      ) : response?.message === "Error to obtain data" ? (
        <p>{t("inputs.errorMessage.text")}</p>
      ) : (
        <p>{response?.message}</p>
      )}
    </div>
  );

  return (
    <div className="container">
      <div data-aos="fade-down">
        <Titulo
          as={"h2"}
          position="center"
          className="text-2xl sm:text-4xl font-bold my-4"
        >
          {t("title")}
          <span className="text-corporative">#</span>
        </Titulo>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 text-white p-4 mb-6" data-aos="fade-up">
          <h3 className="font-bold mb-2">{t("disclaimer.title")}</h3>
          <p
            className="text-base"
            dangerouslySetInnerHTML={{ __html: t.raw("disclaimer.text") }}
          />
        </div>
        <form ref={ref} onSubmit={handleFormSubmit}>
          <div data-aos="fade-left">
            <Input
              type="text"
              placeholder={t("inputs.username.placeholder")}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: undefined }));
              }}
            />
            {errors.username && (
              <div className="text-red-600"><p>{errors.username.message}</p></div>
            )}
          </div>

          <div data-aos="fade-right">
            <Input
              type="text"
              placeholder={t("inputs.email.placeholder")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
            />
            {errors.email && (
              <div className="text-red-600"><p>{errors.email.message}</p></div>
            )}
          </div>

          <div data-aos="fade-left">
            <Input
              type="password"
              placeholder={t("inputs.password.placeholder")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
            />
            {errors.password && (
              <div className="text-red-600"><p>{errors.password.message}</p></div>
            )}
          </div>

          <div data-aos="fade-up">
            <label className="flex items-center my-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  setErrors((prev) => ({ ...prev, terms: undefined }));
                }}
              />
              <span
                className="text-base"
                dangerouslySetInnerHTML={{
                  __html: t.raw("inputs.conditions.label"),
                }}
              />
            </label>
            {errors.terms && (
              <div className="text-red-600"><p>{errors.terms.message}</p></div>
            )}
          </div>
          <div>
            <div className="py-4">
              <HCaptcha
                theme={"dark"}
                sitekey="bb18a7e6-0478-4bb4-bbcc-6cf814367412"
                onVerify={onCaptchaChange}
                ref={captchaRef}
                onExpire={onCaptchaExpire}
                languageOverride={locale}
              />
            </div>
            {errors.captcha && (
              <div className="text-red-600"><p>{errors.captcha.message}</p></div>
            )}
          </div>
          <div>
            {response.success === true && renderServerResponse(response, email)}
          </div>
          <div data-aos="fade-up" className="mt-4">
            <div className="flex gap-4 flex-wrap items-center">
              <div>
                <button
                  type="submit"
                  className="px-6 py-4 text-lg flex items-center justify-center gap-2 bg-corporative text-white transition-all hover:bg-white hover:text-black"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      {t("inputs.submit.loading")}
                    </>
                  ) : (
                    t("inputs.submit.placeholder")
                  )}
                </button>
              </div>
              <div>
                {response.success === false && renderServerResponse(response)}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
