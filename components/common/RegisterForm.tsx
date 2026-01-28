"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [errors, setErrors] = useState<{ [key: string]: FormErrors }>({});
  const [serverResponse, setServerResponse] = useState<FormErrors | null>(null);

  const { register, isLoading, response } = useRegister();
  const locale = useLocale();

  const onCaptchaChange = (token: string) => setCaptchaToken(token);
  const onCaptchaExpire = () => setCaptchaToken(null);

  useEffect(() => {
    const keys = Object.keys(errors);
    if (keys.length > 0) {
      keys.forEach((key, idx) => {
        setTimeout(() => {
          setErrors((prev) => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
          });
        }, 2000 * (idx + 1));
      });
    }
    // No cleanup necesario porque los timeouts son independientes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(errors)]);

  useEffect(() => {
    if (response) {
      setServerResponse(response);
      const timer = setTimeout(() => setServerResponse(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [response]);

  const validateForm = () => {
    const formErrors = validateRegisterForm({ username, email, password }, t);
    const captchaError = validateCaptcha(captchaToken || "", t);
    const termsError = !acceptedTerms && { terms: { message: t("inputs.conditions.requiredError"), success: false } };
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
  const renderResponses = (responses: (FormErrors | undefined | null)[]) => (
    <div>
      {responses.map((res, idx) => (
        <div
          key={idx}
          className={clsx(
            "transition-all duration-500 opacity-0 max-w-96 min-w-80 w-full",
            { "opacity-100": res }
          )}
        >
          {res && (
            <div
              className={clsx(
                "text-center font-bold text-white p-4 m-4",
                { "bg-red-600": res.success === false },
                { "bg-green-600": res.success === true }
              )}
            >
              {res.message === "Username already exists." ? (
                <>{t("inputs.usernameExists.text")}</>
              ) : res.message === "Email already exists." ? (
                <>{t("inputs.emailExists.text")}</>
              ) : res.success === true ? (
                <>{t("inputs.successMessage.text")}</>
              ) : res.message === "Error to obtain data" ? (
                <>{t("inputs.errorMessage.text")}</>
              ) : (
                <>{res.message}</>
              )}
            </div>
          )}
        </div>
      ))}
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div data-aos="fade-right">
            <Input
              type="email"
              placeholder={t("inputs.email.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div data-aos="fade-left">
            <Input
              type="password"
              placeholder={t("inputs.password.placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center mt-4" data-aos="fade-up">
              <input
                type="checkbox"
                className="mr-2"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span
                className="text-base"
                dangerouslySetInnerHTML={{
                  __html: t.raw("inputs.conditions.label"),
                }}
              />
            </label>
          </div>

          <div className="mt-8">
            <HCaptcha
              theme={"dark"}
              sitekey="bb18a7e6-0478-4bb4-bbcc-6cf814367412"
              onVerify={onCaptchaChange}
              ref={captchaRef}
              onExpire={onCaptchaExpire}
              languageOverride={locale}
            />
          </div>

          <div data-aos="fade-up">
            <button
              type="submit"
              className="px-6 py-4 mt-8 text-lg flex items-center justify-center gap-2 bg-corporative text-white transition-all hover:bg-white hover:text-black"
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
        </form>
      </div>
      <div className="fixed top-0 right-0 transition-all">
        {renderResponses([
          serverResponse,
          errors.username,
          errors.email,
          errors.password,
          errors.captcha,
          errors.terms,
        ])}
      </div>
    </div>
  );
}
