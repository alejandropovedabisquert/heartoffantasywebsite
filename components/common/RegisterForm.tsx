"use client";
import React, { useRef, useState } from "react";
import Input from "@/components/ui/Input";
import { Titulo } from "@/components/ui/Titulo";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { validateRegisterForm } from "@/lib/formValidations/registerValidation";
import { useRegister } from "@/lib/hooks/useRegister";
import { useCloudflareTurnstile } from "@/lib/hooks/useCloudflareTurnstile";
import { verifyTurnstile } from "@/lib/actions/verifyCaptchaCloudflare";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const API_ERRORS = {
  USERNAME_EXISTS: "Username already exists.",
  EMAIL_EXISTS: "Email already exists.",
  DATA_ERROR: "Error to obtain data",
} as const;

export type FormErrors = {
  message?: string;
  success?: boolean;
};
export default function RegisterForm() {
  const locale = useLocale();
  const { refCloudflare, token: captchaToken, verified, reset: resetTurnstile } = useCloudflareTurnstile(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!, locale);
  const t = useTranslations("RegisterForm");
  const ref = useRef<HTMLFormElement>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    [key: string]: FormErrors | undefined;
  }>({});

  const { register, isLoading, response } = useRegister();

  const validateForm = async () => {
    const formErrors = validateRegisterForm({ username, email, password }, t);
    const termsError = !acceptedTerms && {
      terms: { message: t("inputs.conditions.requiredError"), success: false },
    };
    const captchaValid = await verifyTurnstile(captchaToken || "");
    const turnstileError = !captchaValid
      ? { captcha: { message: t("inputs.captcha.requiredError"), success: false } }
      : {};

    const newErrors = { ...formErrors, ...turnstileError, ...termsError };
    setErrors(newErrors);
    if (!captchaValid) resetTurnstile();
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(await validateForm())) return;

    if (ref.current) {
      const formData = new FormData(ref.current);
      formData.append("captcha", captchaToken || "");
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      await register(formData);
      resetTurnstile();
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
      {response?.message === API_ERRORS.USERNAME_EXISTS ? (
        <p>{t("inputs.usernameExists.text")}</p>
      ) : response?.message === API_ERRORS.EMAIL_EXISTS ? (
        <p>{t("inputs.emailExists.text")}</p>
      ) : response?.success === true ? (
        <p>{t("inputs.successMessage.text", { email: email || "undefined" })}</p>
      ) : response?.message === API_ERRORS.DATA_ERROR ? (
        <p>{t("inputs.errorMessage.text")}</p>
      ) : (
        <p>{response?.message}</p>
      )}
    </div>
  );

  return (
    <div className="container relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .3, ease: "easeOut" }}>
        <Titulo
          as={"h2"}
          position="center"
          className="text-2xl sm:text-4xl font-bold my-4"
        >
          {t("title")}
          <span className="text-corporative">#</span>
        </Titulo>
      </motion.div>
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="bg-gray-800 text-white p-4 mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .3, ease: "easeOut" }}
        >
          <h3 className="font-bold mb-2">{t("disclaimer.title")}</h3>
          <p
            className="text-base"
            dangerouslySetInnerHTML={{ __html: t.raw("disclaimer.text") }}
          />
        </motion.div>
        <form ref={ref} onSubmit={handleFormSubmit}>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .3, ease: "easeOut" }}
          >
            <Input
              id="username"
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .3, ease: "easeOut" }}
          >
            <Input
              id="email"
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .3, ease: "easeOut" }}
          >
            <Input
              id="password"
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .3, ease: "easeOut" }}
          >
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
          </motion.div>
          <div>
            <div className="py-4">
              <div ref={refCloudflare}></div>
            </div>
            {errors.captcha && (
              <div className="text-red-600"><p>{errors.captcha.message}</p></div>
            )}
          </div>
          <div>
            {response.success === true && renderServerResponse(response, email)}
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .3, ease: "easeOut" }}
            className="mt-4"
          >
            <div className="flex gap-4 flex-wrap items-center">
              <div>
                <button
                  type="submit"
                  className="px-6 py-4 text-lg flex items-center justify-center gap-2 cursor-pointer bg-corporative text-white transition-all hover:bg-white hover:text-black disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
                  disabled={!verified || isLoading}
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
          </motion.div>
        </form>
      </div>
    </div>
  );
}
