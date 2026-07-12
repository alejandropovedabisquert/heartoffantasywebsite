"use client";

import React, { useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    onloadTurnstileCallback?: () => void;
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          language?: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  locale: string;
  error?: string;
}

export interface TurnstileHandle {
  reset: () => void;
}

export const TurnstileWidget = forwardRef<TurnstileHandle, TurnstileProps>(
  ({ locale, error }, ref) => {
    const turnstileRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | undefined>(undefined);

    // Exponemos la función reset al componente padre
    useImperativeHandle(ref, () => ({
      reset: () => {
        if (window.turnstile && widgetIdRef.current) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      window.onloadTurnstileCallback = () => {
        if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
          widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string,
            theme: "dark",
            language: locale,
          });
        }
      };

      if (window.turnstile && !widgetIdRef.current && window.onloadTurnstileCallback) {
        window.onloadTurnstileCallback();
      }

      return () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = undefined;
        }
        delete window.onloadTurnstileCallback;
      };
    }, [locale]);

    return (
      <div className="py-4">
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit"
          strategy="afterInteractive"
        />
        <div ref={turnstileRef}></div>
        {error && <div className="text-red-600"><p>{error}</p></div>}
      </div>
    );
  }
);

TurnstileWidget.displayName = "TurnstileWidget";