import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function BackButton() {
    const locale = useLocale();
    const t = useTranslations('BackButton');
    return (
        // @ts-expect-error - item.link es seguro en este contexto
        <Link href={"/"} locale={locale} className="p-2 mb-8 bg-[#A43046] text-white block w-fit flex gap-2 transition-all hover:bg-white hover:text-black"><ArrowLeft /> {t("text")}</Link>
    );
}