import { useState, useCallback } from "react";
import { usersApi } from "../api/users";

export function useUserActivate() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{ success: boolean | null; message: string }>({
    success: null,
    message: ""
  });

  const activate = useCallback(async (token: string) => {
    setIsLoading(true);
    try {
      const res = await usersApi.activateUser(token);
      setResponse({ success: res.status === 200, message: res.data?.message ?? "" });
    } catch {
      setResponse({ success: false, message: "" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { activate, isLoading, response };
}