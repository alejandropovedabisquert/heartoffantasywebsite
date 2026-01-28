'use client';
import { useState } from "react";
import { FormErrors } from "@/components/common/RegisterForm";
import { usersApi } from "../api/users";
import { verifyCaptcha } from "../actions/verifyCaptcha";

export function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<FormErrors>({});
    const register = async (formData: FormData) => {
        const username = formData.get('username')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const password = formData.get('password')?.toString() || '';
        const token = formData.get('captcha')?.toString() || "";

        if (!username || !email || !password || !token) {
            const data = { message: 'All fields are required', success: false };
            setResponse(data);
            return data;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            const data = { message: 'Invalid email format', success: false };
            setResponse(data);
            return data;
        }

        if (password.length < 6) {
            const data = { message: 'Password must be at least 6 characters', success: false };
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
            const result = await usersApi.register(username, email, password);
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
        } catch (error: unknown) {
            if (error instanceof Error) {
                setResponse({ success: false, message: "Error to obtain data" });
                throw error;
            }
            return { success: false, message: "Error to obtain data" };
        } finally {
            setIsLoading(false);
        }
    };

    return { register, isLoading, response };
}