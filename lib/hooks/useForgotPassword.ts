'use client';
import { useState } from "react";
import { usersApi } from "../api/users";
import { verifyCaptcha } from "../actions/verifyCaptchaActions";
import { FormErrors } from "@/types/formErrors";

export function useForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<FormErrors>({});
    const forgotPassword = async (formData: FormData) => {
        const email = formData.get('email')?.toString() || '';
        const token = formData.get('captcha')?.toString() || "";

        if (!email || !token) {
            const data = { message: 'All fields are required', success: false };
            setResponse(data);
            return data;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            const data = { message: 'Invalid email format', success: false };
            setResponse(data);
            return data;
        }

        const captchaValid = await verifyCaptcha(token);
        if (!captchaValid) {
            const data = { message: 'Invalid captcha', success: false };
            setResponse(data);
            return data;
        }

        setIsLoading(true);
        try {
            const result = await usersApi.forgotPasswordUser(email);
            let responseData: { success: boolean; message?: string;};

            if (!result.data) {
                responseData = {
                    success: result.status === 200,
                    message: result.status === 200 ? "Registration successful" : "Registration failed",
                };
            } else {
                responseData = { 
                    success: result.status === 200, 
                    message: result.data.message
                 };

            }
            setResponse(responseData);
            return responseData;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const errorData = { success: false, message: "Error to obtain data" };
            setResponse(errorData);
            return errorData;
        } finally {
            setIsLoading(false);
        }
    };

    return { forgotPassword, isLoading, response };
}