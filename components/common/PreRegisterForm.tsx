"use client"
import React, { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { onPreRegisterFormSubmit } from "@/lib/onPreRegisterFormSubmit";
import Input from "@/components/common/Input";
import { Titulo } from "@/components/common/Titulo";
import clsx from "clsx";
import { useLocale, useTranslations } from 'next-intl';

type ResponseResult = {
    message: string,
    success: boolean,
    error?: unknown
}

export default function PreRegisterForm() {
    const t = useTranslations('PreRegisterForm');
    const ref = useRef<HTMLFormElement>(null);
    const captchaRef = useRef<HCaptcha | null>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState<ResponseResult | undefined>();
    const [formErrors, setFormErrors] = useState<{ [key: string]: ResponseResult }>({});
    const locale = useLocale();

    const onCaptchaChange = (token: string) => setCaptchaToken(token);
    const onCaptchaExpire = () => setCaptchaToken(null);

    // Validate form fields
    const validateForm = () => {
        const errors: { [key: string]: ResponseResult } = {};

        if (!username) {
            errors.username = {
                success: false,
                message: t("inputs.username.requiredError"),
            };
        }
        if (!email) {
            errors.email = {
                success: false,
                message: t("inputs.email.requiredError"),
            };
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = {
                success: false,
                message: t("inputs.email.validError"),
            };
        }
        if (!password) {
            errors.password = {
                success: false,
                message: t("inputs.password.requiredError"),
            };
        } else if (password.length < 6) {
            errors.password = {
                success: false,
                message: t("inputs.password.validError"),
            };
        }
        if (!captchaToken) {
            errors.captcha = {
                success: false,
                message: t("inputs.captcha.requiredError"),
            };
        }

        setFormErrors(errors);
        let multiplier = 3;
        Object.keys(errors).forEach((key) => {
            if (errors[key]) {
                setTimeout(() => {
                    // Update the errors state of the form using a function of update based on the previous state
                    setFormErrors((prevErrors) => {
                        // Create a new copy of the object prevErrors to avoid direct mutations of the state
                        const newErrors = { ...prevErrors };
                        // Eliminate the specific error associated with the key 'key' (for example "username, "email", etc.)
                        delete newErrors[key];
                        // Return the oject "newErrors" updated (without the eliminated error) for React to use ir like a new state
                        return newErrors;
                    });
                }, 1000 * multiplier);
                multiplier = multiplier + 1;
            }
        });
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate the form before send it 
        if (!validateForm()) return;

        if (ref.current) {
            const formData = new FormData(ref.current);
            formData.append('captcha', captchaToken || ''); // Handle null token by using empty string as fallback
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            // Proceed to send formData to your backend
            try {
                const result = await onPreRegisterFormSubmit(formData); // Call backend funciton
                setResponseMessage(result); // Shows the message of backend
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error("Error al obtener los datos", error);
                }
            }
        }
    };

    // Function to render error messages
    const renderResponse = (response: ResponseResult | undefined) => (
        <div
            className={clsx(
                "opacity-0 transition-all duration-500",
                { "opacity-100": response }
            )}
        >
            {response && <p className={clsx(
                "p-4 m-4 w-60 text-center font-bold",
                { "text-red-300 bg-red-600": response.success == false },
                { "text-green-300 bg-green-600": response.success == true }
            )}>{response.message}</p>}
        </div>
    );

    return (
        <div className="container">
            <div data-aos="fade-down">
                <Titulo as={"h2"} position="center" className="text-2xl sm:text-4xl font-bold my-4">{t("title")}<span className="text-corporative">#</span></Titulo>
            </div>
            <div className="max-w-2xl mx-auto">
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
                            className="px-6 py-4 mt-8 text-lg bg-corporative text-white transition-all hover:bg-white hover:text-black"
                        >
                            {t("inputs.submit.placeholder")}
                        </button>
                    </div>
                </form>
                
            </div>
            <div className="fixed bottom-0 right-0 transition-all">
                {/* Usin the renderResponse for server response */}
                {renderResponse(responseMessage)}
                {/* Using the renderResponse for each error */}
                {renderResponse(formErrors.username)}
                {renderResponse(formErrors.email)}
                {renderResponse(formErrors.password)}
                {renderResponse(formErrors.captcha)}
            </div>
        </div>
    );
}
