import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/lib/routes";
import LocalizedLink from "../ui/LocalizedLink";

export default function BackButton({
  dict,
  locale,
}: {
  locale: Locale;
  dict: Awaited<ReturnType<typeof getDictionary>>["BackButton"];
}) {
  const text = dict.text;
  return (
    <LocalizedLink
      href={"/"}
      locale={locale}
      variant="corporative"
      className="flex gap-2"
    >
      <ArrowLeft /> {text}
    </LocalizedLink>
  );
}
