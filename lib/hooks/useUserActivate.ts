import { useState, useCallback } from "react";
import { usersApi } from "../api/users";
import { notFound } from "next/navigation";

export function useUserActivate() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  
  const activate = useCallback(async (token: string) => {
    if (!token) {
      setResponse({ success: false, message: "Token is required" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await usersApi.activateUser(token);
      
      if (res.data?.message) {
        notFound();  
      } else {
        setResponse({ success: true, message: "Activation successful" });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? "Activation failed" : "An unknown error occurred";
      setResponse({ success: false, message: errorMessage });
    } finally {
      setIsLoading(false);
    }   
  }, []);

  return { activate, isLoading, response };
}