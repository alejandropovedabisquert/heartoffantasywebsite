"use client";

import React, { useRef, useState } from "react";
import { Titulo } from "@/components/ui/Titulo";
import clsx from "clsx";
import { validateRegisterForm } from "@/lib/validations/register";
import { validateCaptcha } from "@/lib/validations/captcha";
import { useRegister } from "@/lib/hooks/useRegister";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { getDictionary } from "@/app/[lang]/dictionaries";
import LocalizedLink from "../ui/LocalizedLink";
import { Locale } from "@/lib/routes";

import { TurnstileWidget, TurnstileHandle } from "@/components/ui/TurnstileWidget";
import { AnimatedInput } from "@/components/ui/animated/AnimatedInput";
import { FormErrors } from "@/types/formErrors";

const API_ERRORS = {
  USERNAME_EXISTS: "Username already exists.",
  EMAIL_EXISTS: "Email already exists.",
  DATA_ERROR: "Error to obtain data",
} as const;

export default function RegisterForm({
  dict,
  locale,
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>["RegisterForm"];
  locale: Locale;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const captchaRef = useRef<TurnstileHandle>(null);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: FormErrors | undefined }>({});

  const { register, isLoading, response } = useRegister();

  const clearError = (field: string) => setErrors((prev) => ({ ...prev, [field]: undefined }));

  const validateForm = (turnstileToken: string | null) => {
    const formErrors = validateRegisterForm({ username, email, password }, dict);
    const captchaError = validateCaptcha(turnstileToken || "", dict);
    const termsError = !acceptedTerms && {
      terms: { message: dict.inputs.conditions.requiredError, success: false },
    };
    
    const newErrors = { ...formErrors, ...captchaError, ...termsError };
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      captchaRef.current?.reset();
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const turnstileToken = formData.get("cf-turnstile-response") as string | null;

    if (!validateForm(turnstileToken)) return;

    formData.append("captcha", turnstileToken || "");
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    await register(formData);

    captchaRef.current?.reset();
  };

  const renderServerResponse = (
    response: FormErrors | undefined | null,
    email?: string
  ) => {
    if (!response) return null;
    
    return (
      <div
        className={clsx(
          "text-center",
          { "text-red-600": response?.success === false },
          { "bg-green-600 px-6 py-2 text-green-200": response?.success === true }
        )}
      >
        {response?.message === API_ERRORS.USERNAME_EXISTS ? (
          <p>{dict.inputs.usernameExists.text}</p>
        ) : response?.message === API_ERRORS.EMAIL_EXISTS ? (
          <p>{dict.inputs.emailExists.text}</p>
        ) : response?.success === true ? (
          <p>
            {dict.inputs.successMessage.text_a} {email || "undefined"}{" "}
            {dict.inputs.successMessage.text_b}
          </p>
        ) : response?.message === API_ERRORS.DATA_ERROR ? (
          <p>{dict.inputs.errorMessage.text}</p>
        ) : (
          <p>{response?.message}</p>
        )}
      </div>
    );
  };

  return (
    <div className="container relative z-10">
      <motion.div initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <Titulo as={"h1"} position="center" className="text-2xl sm:text-4xl font-bold my-4">
          {dict.title} <span className="text-corporative">#</span>
        </Titulo>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-gray-800 text-white p-4 mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-bold mb-2">{dict.disclaimer.title}</h3>
          <p className="text-base" dangerouslySetInnerHTML={{ __html: dict.disclaimer.text }} />
        </motion.div>

        <form ref={formRef} onSubmit={handleFormSubmit}>
          
          <AnimatedInput 
            id="username" type="text" direction="right"
            placeholder={dict.inputs.username.placeholder} 
            value={username} error={errors.username?.message}
            onChange={(e) => { setUsername(e.target.value); clearError("username"); }} 
          />

          <AnimatedInput 
            id="email" type="text" direction="left"
            placeholder={dict.inputs.email.placeholder} 
            value={email} error={errors.email?.message}
            onChange={(e) => { setEmail(e.target.value); clearError("email"); }} 
          />

          <AnimatedInput 
            id="password" type="password" direction="right"
            placeholder={dict.inputs.password.placeholder} 
            value={password} error={errors.password?.message}
            onChange={(e) => { setPassword(e.target.value); clearError("password"); }} 
          />

          {/* Términos y Condiciones */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <label className="flex items-center my-4">
              <input type="checkbox" className="mr-2" checked={acceptedTerms}
                onChange={(e) => { setAcceptedTerms(e.target.checked); clearError("terms"); }}
              />
              <span className="text-base">
                {dict.inputs.conditions.label}{" "}
                <LocalizedLink className="underline" target="_blank" href="/privacy-policy" locale={locale}>
                  {dict.inputs.conditions.cta}
                </LocalizedLink>
                {dict.inputs.conditions.label_ja ? ` ${dict.inputs.conditions.label_ja}` : "."}
              </span>
            </label>
            {errors.terms && <div className="text-red-600"><p>{errors.terms.message}</p></div>}
          </motion.div>

          <TurnstileWidget 
            ref={captchaRef} 
            locale={locale} 
            error={errors.captcha?.message} 
          />

          <div>{response?.success === true && renderServerResponse(response, email)}</div>

          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="mt-4">
            <div className="flex gap-4 flex-wrap items-center">
              <button type="submit" className="cursor-pointer px-6 py-4 text-lg flex items-center justify-center gap-2 bg-corporative text-white transition-all hover:bg-white hover:text-black">
                {isLoading ? <><Loader2 className="animate-spin" /> {dict.inputs.submit.loading}</> : dict.inputs.submit.placeholder}
              </button>
              <div>{response?.success === false && renderServerResponse(response)}</div>
            </div>
          </motion.div>

        </form>
      </div>
    </div>
  );
}