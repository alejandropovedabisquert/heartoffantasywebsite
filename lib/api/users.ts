import { fetchApi } from "./connectApi";

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
};