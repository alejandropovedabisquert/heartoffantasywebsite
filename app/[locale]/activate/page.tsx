"use client";

import { notFound, useSearchParams } from "next/navigation";
import LandingLayout from "../landing-layout/layout";
import { useUserActivate } from "@/lib/hooks/useUserActivate";
import { useEffect } from "react";

export default function Activate() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
    const { activate, isLoading, message } = useUserActivate();
    if (!token) {
        notFound();
    }
    useEffect(() => {
        activate(token).then(result => {
            alert(result?.message);
        });
    }, []);

  return (
    <LandingLayout>
      <div>
        {isLoading ? <p>Activating...</p> : (
            <>
                <h1>Activate Account</h1>
                <p>{message}</p>
            </>
        )}
      </div>
    </LandingLayout>
  );
}
