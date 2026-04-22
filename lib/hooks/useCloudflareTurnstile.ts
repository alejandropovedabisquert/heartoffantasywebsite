import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useCloudflareTurnstile
 * Hook to easily integrate Cloudflare Turnstile widget in React components.
 *
 * @param siteKey - Cloudflare Turnstile site key
 * @returns { ref, verified, reset } - ref to attach to the div, verified state, and reset function
 */
type TurnstileWidgetId = string | number;
type TurnstileRenderOptions = {
    sitekey: string;
    callback: (token: string) => void;
    "error-callback"?: () => void;
    "expired-callback"?: () => void;
    language?: string;
};
interface Turnstile {
    render: (element: HTMLElement, options: TurnstileRenderOptions) => TurnstileWidgetId;
    remove: (widgetId: TurnstileWidgetId) => void;
}

declare global {
    interface Window {
        turnstile?: Turnstile;
    }
}

export function useCloudflareTurnstile(siteKey: string, language?: string) {
    const refCloudflare = useRef<HTMLDivElement>(null);
    const [token, setToken] = useState<string | null>(null);
    const [verified, setVerified] = useState(false);
    const widgetIdRef = useRef<TurnstileWidgetId | null>(null);

    const handleVerify = useCallback((receivedToken: string) => {
        setToken(receivedToken);
        setVerified(true);
    }, []);

    const handleError = useCallback(() => {
        setToken(null);
        setVerified(false);
    }, []);

    const handleExpire = useCallback(() => {
        setToken(null);
        setVerified(false);
    }, []);

    useEffect(() => {
        if (!refCloudflare.current) return;
        let cleanupId: TurnstileWidgetId | null = null;

        const renderWidget = () => {
            const turnstile = window.turnstile;
            if (!turnstile || !refCloudflare.current || widgetIdRef.current !== null) return;
            cleanupId = turnstile.render(refCloudflare.current, {
                sitekey: siteKey,
                callback: handleVerify,
                "error-callback": handleError,
                "expired-callback": handleExpire,
                language,
            });
            widgetIdRef.current = cleanupId;
        };

        if (window.turnstile) {
            renderWidget();
        } else {
            const interval = setInterval(() => {
                if (window.turnstile) {
                    clearInterval(interval);
                    renderWidget();
                }
            }, 100);
            return () => {
                clearInterval(interval);
                if (cleanupId !== null) window.turnstile?.remove(cleanupId);
            };
        }

        return () => {
            if (cleanupId !== null) window.turnstile?.remove(cleanupId);
        };
    }, [siteKey, language, handleVerify, handleError, handleExpire]);

    const reset = useCallback(() => {
        setToken(null);
        setVerified(false);
        const turnstile = window.turnstile;
        if (turnstile && widgetIdRef.current !== null) {
            turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
        }
        if (refCloudflare.current && window.turnstile) {
            widgetIdRef.current = window.turnstile.render(refCloudflare.current, {
                sitekey: siteKey,
                callback: handleVerify,
                "error-callback": handleError,
                "expired-callback": handleExpire,
                language,
            });
        }
    }, [siteKey, language, handleVerify, handleError, handleExpire]);

    return { refCloudflare, token, verified, reset };
}
