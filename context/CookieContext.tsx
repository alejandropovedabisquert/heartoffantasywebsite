"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { setCookieAction } from "@/lib/actions/cookiesActions";
import { Locale } from "@/lib/routes";

// Tipos
type CookiePreferences = {
  essential: boolean;
  preferences: boolean;
};

type CookieContextType = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  preferences: CookiePreferences;
  setPreferences: (prefs: CookiePreferences) => void;
  saveConsent: (prefs: CookiePreferences) => Promise<void>;
};

// Crear el contexto
const CookieContext = createContext<CookieContextType | undefined>(undefined);

// Provider
export function CookieProvider({
  children,
  hasConsent,
  locale,
}: {
  children: ReactNode;
  hasConsent: boolean;
  locale: Locale;
}) {
  const [isVisible, setIsVisible] = useState(!hasConsent);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    preferences: true,
  });

  // Función global para guardar el consentimiento
  const saveConsent = async (prefs: CookiePreferences) => {
    await setCookieAction({
      name: "cookie-consent",
      data: JSON.stringify(prefs),
    });
    
    setPreferences(prefs);
    setIsVisible(false);
    setShowSettings(false);

    if (!prefs.preferences) {
      document.cookie = "lang=; path=/; max-age=0;";
    } else {
      await setCookieAction({ name: "lang", data: locale });
    }
  };

  return (
    <CookieContext.Provider
      value={{
        isVisible,
        setIsVisible,
        showSettings,
        setShowSettings,
        preferences,
        setPreferences,
        saveConsent,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

// Hook personalizado para usar el contexto fácilmente
export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error("useCookies debe usarse dentro de un CookieProvider");
  }
  return context;
}