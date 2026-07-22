import { fetchApi } from "./apiClient";

const ENDPOINTBASE = '/User';

export const usersApi = {
    register: (username: string, email: string, password: string) =>
        fetchApi<{ message: string, success: boolean }>(`${ENDPOINTBASE}`, {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
        }),
    activateUser: (token: string) =>
        fetchApi<{ message: string, success: boolean }>(`${ENDPOINTBASE}/activate`, {
            method: "POST",
            body: JSON.stringify({ token }),
        }),
    forgotPasswordUser: (email: string) =>
        fetchApi<{ message: string, success: boolean }>(`${ENDPOINTBASE}/forgot-password`, {
            method: "POST",
            body: JSON.stringify({ email }),
        }),
    resetPasswordUser: (newPassword: string, token: string) =>
        fetchApi<{ message: string, success: boolean }>(`${ENDPOINTBASE}/reset-password`, {
            method: "POST",
            body: JSON.stringify({ newPassword, token }),
        }),
};