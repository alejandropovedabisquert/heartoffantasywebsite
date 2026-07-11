"use client"
import { hasLocale, Locale } from "@/lib/routes";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const errorTranslations: Record<Locale, { title: string; description: string; retry: string }> = {
  en: { 
    title: "Something went wrong!", 
    description: "An unexpected error occurred.", 
    retry: "Try again" 
  },
  es: { 
    title: "¡Algo salió mal!", 
    description: "Ha ocurrido un error inesperado.", 
    retry: "Reintentar" 
  },
  ca: { 
    title: "Alguna cosa ha sortit malament",
    description: "Ha ocorregut un error inesperat.",
    retry: "Tornar a intentar" 
  },
  ja: { 
    title: "問題が発生しました！", 
    description: "予期しないエラーが発生しました。", 
    retry: "再試行" 
  }
};

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }, 
  reset: () => void 
}) {
  // Opcional: Registrar el error en la consola o en un servicio (ej. Sentry)
  useEffect(() => {
    console.error("Error capturado por error.tsx:", error);
  }, [error]);

  // 2. Obtenemos el idioma de la URL usando el hook de cliente
  const params = useParams();
  const maybeLang = params?.lang as string;
  const lang = hasLocale(maybeLang) ? (maybeLang as Locale) : "en";

  // 3. Cargamos los textos del mini-diccionario
  const dict = errorTranslations[lang];

  return (
    <div className="container mx-auto px-4 min-h-125 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">{dict.title}</h2>
      <p className="mb-4">{dict.description}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-4 bg-corporative text-white transition-all hover:bg-white hover:text-black"
      >
        {dict.retry}
      </button>
    </div>
  );
}