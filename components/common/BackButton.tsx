import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import LinkCustom from "../ui/LinkCustom";

export default function BackButton() {
    const locale = useLocale();
    const t = useTranslations('BackButton');
    return (
        <LinkCustom href={"/"} locale={locale} variant="corporative" className="flex gap-2"><ArrowLeft /> {t("text")}</LinkCustom>
    );
}