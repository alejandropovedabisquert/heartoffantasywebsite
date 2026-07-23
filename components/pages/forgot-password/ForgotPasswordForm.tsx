"use client";

import React, { useRef, useState } from "react";
import { Titulo } from "@/components/ui/Titulo";
import clsx from "clsx";
import { validateCaptcha } from "@/lib/validations/captcha";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/lib/routes";

import {
    TurnstileWidget,
    TurnstileHandle,
} from "@/components/ui/TurnstileWidget";
import { AnimatedInput } from "@/components/ui/animated/AnimatedInput";
import { useForgotPassword } from "@/lib/hooks/useForgotPassword";
import { validateForgotPasswordForm } from "@/lib/validations/forgotPassword";

const API_ERRORS = {
    DATA_ERROR: "Error to obtain data",
} as const;

export type FormErrors = {
    message?: string;
    success?: boolean;
};

export default function ForgotPasswordForm({
    dict,
    locale,
}: {
    dict: Awaited<ReturnType<typeof getDictionary>>["ForgotPasswordForm"];
    locale: Locale;
}) {
    const formRef = useRef<HTMLFormElement>(null);
    const captchaRef = useRef<TurnstileHandle>(null);

    const [email, setEmail] = useState<string>("");
    const [errors, setErrors] = useState<{
        [key: string]: FormErrors | undefined;
    }>({});

    const { forgotPassword, isLoading, response } = useForgotPassword();

    const clearError = (field: string) =>
        setErrors((prev) => ({ ...prev, [field]: undefined }));

    const validateForm = (turnstileToken: string | null) => {
        const formErrors = validateForgotPasswordForm({ email }, dict);
        const captchaError = validateCaptcha(turnstileToken || "", dict);

        const newErrors = { ...formErrors, ...captchaError };
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
        const turnstileToken = formData.get("cf-turnstile-response") as
            | string
            | null;

        if (!validateForm(turnstileToken)) return;

        formData.append("captcha", turnstileToken || "");
        formData.append("email", email);

        await forgotPassword(formData);

        captchaRef.current?.reset();
    };

    const renderServerResponse = (
        response: FormErrors | undefined | null
    ) => {
        if (!response) return null;

        return (
            <div
                className={clsx(
                    "text-center",
                    { "text-red-600": response?.success === false },
                    {
                        "bg-green-600 px-6 py-2 text-green-200": response?.success === true,
                    },
                )}
            >
                {response?.success === true ? (
                    <p>
                        {dict.inputs.statusMessage.success}
                    </p>
                ) : response?.message === API_ERRORS.DATA_ERROR ? (
                    <p>{dict.inputs.statusMessage.error}</p>
                ) : (
                    <p>{response?.message}</p>
                )}
            </div>
        );
    };

    return (
        <div className="container relative z-10">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Titulo
                    as={"h1"}
                    position="center"
                    className="text-2xl sm:text-4xl font-bold my-4"
                >
                    {dict.title} <span className="text-corporative">#</span>
                </Titulo>
            </motion.div>
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-lg">{dict.description}</p>
                </motion.div>

                <form ref={formRef} onSubmit={handleFormSubmit}>
                    <AnimatedInput
                        id="email"
                        type="text"
                        direction="left"
                        placeholder={dict.inputs.email.placeholder}
                        value={email}
                        error={errors.email?.message}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            clearError("email");
                        }}
                    />

                    <TurnstileWidget
                        ref={captchaRef}
                        locale={locale}
                        error={errors.captcha?.message}
                    />
                    <div>
                        {response?.success === true &&
                            renderServerResponse(response)}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-4"
                    >
                        <div className="flex gap-4 flex-wrap items-center">
                            <button
                                type="submit"
                                className="cursor-pointer px-6 py-4 text-lg flex items-center justify-center gap-2 bg-corporative text-white transition-all hover:bg-white hover:text-black"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" />{" "}
                                        {dict.inputs.submit.loading}
                                    </>
                                ) : (
                                    dict.inputs.submit.placeholder
                                )}
                            </button>
                            <div>
                                {response?.success === false && renderServerResponse(response)}
                            </div>
                        </div>
                    </motion.div>
                </form>
            </div>
        </div>
    );
}
