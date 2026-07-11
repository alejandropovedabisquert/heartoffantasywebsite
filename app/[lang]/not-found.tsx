import FirefliesEffect from "@/components/common/FirefliesEffect";
import HeartV2 from "@/components/ui/HeartV2";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
import { headers } from "next/headers";
import { hasLocale, Locale } from "@/lib/routes";

export default async function NotFound() {
  const headersList = await headers();

  const headerLocale = headersList.get("x-locale") as Locale;
  const lang = hasLocale(headerLocale) ? headerLocale : "en";
  const dict = await getDictionary(lang);

  const title = dict.PageNotFound.title;
  const backButton = dict.PageNotFound.backButton;

  return (
    <div>
      <div id="bodyNotFound">
        <HeartV2 />
        <h1>{title}</h1>
        <Link href={`/${lang}`}>{backButton}</Link>
      </div>

      <FirefliesEffect
        count={100} // Cuantas luciernagas apareceran
        speed={3} // A que velocidad se mueven
        flicker={true} // Activar parpadeo
        colors={["#A43046", "#FFFFFF"]} // Colores de las luciernagas
        sizeRange={[3, 4]} // Tamaños entre 3px y 8px
        glow={true} // Activar glow
      />
    </div>
  );
}
