import { ArrowLeft } from "lucide-react";
import LinkCustom from "../ui/LocalizedLink";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/lib/routes";

export default function BackButton({
  dict,
  locale,
}: {
  locale: Locale;
  dict: Awaited<ReturnType<typeof getDictionary>>["BackButton"];
}) {
  const text = dict.text;
  return (
    <LinkCustom
      href={"/"}
      locale={locale}
      variant="corporative"
      className="flex gap-2"
    >
      <ArrowLeft /> {text}
    </LinkCustom>
  );
}
