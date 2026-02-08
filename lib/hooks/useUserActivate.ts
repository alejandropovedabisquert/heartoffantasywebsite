import { useState } from "react";
import { usersApi } from "../api/users";

// Hook for user activation from token in query parameters /activate?token=abc123
export function useUserActivate() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    const activate = async (token: string) => {
        if (!token) {
            return { success: false, message: "Token is required" };
        }
        setIsLoading(true);
        try {
            const response = await usersApi.activateUser(token);
            setMessage(response.data?.message || "Activation successful");
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }
            setMessage("Activation failed");
        } finally {
            setIsLoading(false);
        }   
    };

    return { activate, isLoading, message };
}