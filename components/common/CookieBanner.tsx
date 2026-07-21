"use client";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { Button } from "../ui/Button";
import { useCookies } from "@/context/CookieContext";

export default function CookieBanner({
  dict,
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>["CookieConsent"];
}) {
  // Consumimos el estado global
  const {
    isVisible,
    showSettings,
    setShowSettings,
    preferences,
    setPreferences,
    saveConsent,
  } = useCookies();

  const handleAcceptAll = () =>
    saveConsent({ essential: true, preferences: true });
  const handleRejectAll = () =>
    saveConsent({ essential: true, preferences: false });
  const handleSaveSettings = () => saveConsent(preferences);

  // IMPORTANTE: Si no es visible el banner Y no están abiertos los ajustes, no renderizamos nada.
  // Esto permite que el modal se abra desde el footer aunque isVisible sea false.
  if (!isVisible && !showSettings) return null;

  return (
    <>
      {/* BANNER PRINCIPAL (Solo se muestra si isVisible es true) */}
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col md:flex-row items-center justify-between p-4 bg-zinc-900 text-white shadow-xl border-t border-zinc-800">
          <div className="text-base mb-4 md:mb-0 md:mr-4 max-w-4xl">
            <p>{dict.banner.text}</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 shrink-0">
            <Button
              onClick={() => setShowSettings(true)}
              variant="link"
              className="underline hover:text-zinc-400"
            >
              {dict.banner.buttons.configure}
            </Button>
            <Button onClick={handleRejectAll} variant="contrast">
              {dict.banner.buttons.reject}
            </Button>
            <Button onClick={handleAcceptAll} variant="corporative">
              {dict.banner.buttons.acceptAll}
            </Button>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIGURACIÓN */}
      {showSettings && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-zinc-900 text-zinc-900 rounded-lg max-w-lg w-full p-6 shadow-2xl">
            <h2 className="text-xl text-white font-bold mb-4">
              {dict.modal.title}
            </h2>
            <p className="text-sm text-white mb-6">{dict.modal.description}</p>

            <div className="space-y-4 mb-6">
              {/* Esenciales */}
              <div className="flex items-start justify-between p-3 border border-zinc-200 rounded-md bg-zinc-900">
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {dict.modal.sections.essential.text}
                  </h3>
                  <p className="text-xs text-white mt-1">
                    {dict.modal.sections.essential.text}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-1 h-5 w-5 accent-blue-600"
                />
              </div>

              {/* Preferencias (Idioma) */}
              <div className="flex items-start justify-between p-3 border border-zinc-200 rounded-md">
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {dict.modal.sections.preferences.title}
                  </h3>
                  <p className="text-xs text-white mt-1">
                    {dict.modal.sections.preferences.text}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.preferences}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      preferences: e.target.checked,
                    })
                  }
                  className="mt-1 h-5 w-5 accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-zinc-200 pt-4">
              <Button
                onClick={() => setShowSettings(false)}
                variant="link"
                className="text-black hover:text-zinc-400"
              >
                {dict.modal.buttons.cancel}
              </Button>
              <Button onClick={handleSaveSettings} variant="corporative">
                {dict.modal.buttons.save}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
