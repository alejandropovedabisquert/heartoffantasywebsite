'use client';
import { useState } from "react";
import { usersApi } from "../api/users";
import { verifyCaptcha } from "../actions/verifyCaptchaActions";
import { FormErrors } from "@/types/formErrors";

export function useResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<FormErrors>({});
    const resetPassword = async (formData: FormData) => {
        const password = formData.get('password')?.toString() || '';
        const samePassword = formData.get('samePassword')?.toString() || '';
        const captchaToken = formData.get('captcha')?.toString() || "";
        const token = formData.get('token')?.toString() || "";

        if (!password || !samePassword || !captchaToken) {
            const data = { message: 'All fields are required', success: false };
            setResponse(data);
            return data;
        }

        if (password.length < 6) {
            const data = { message: 'Password must be at least 6 characters', success: false };
            setResponse(data);
            return data;
        }

        if(password !== samePassword){
            const data = { message: 'Passwords do not match', success: false };
            setResponse(data);
            return data;
        }

        const captchaValid = await verifyCaptcha(captchaToken);
        if (!captchaValid) {
            const data = { message: 'Invalid captcha', success: false };
            setResponse(data);
            return data;
        }

        setIsLoading(true);
        try {
            const result = await usersApi.resetPasswordUser(samePassword, token);
            let responseData: { success: boolean; message?: string; };

            if (!result.data) {
                responseData = {
                    success: result.status === 200,
                    message: result.status === 200 ? "Change Password successful" : "Change Password failed",
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

    return { resetPassword, isLoading, response };
}