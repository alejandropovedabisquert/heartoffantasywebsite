import { useTranslations } from "next-intl";
import { Titulo } from "./common/Titulo";
import GridVideo from "./GridVideo";

export default function VideosSection() {
    const t = useTranslations('VideosSection');
    return (
        <div className="relative my-24">
            <div data-aos="fade-right">
                <Titulo as={"h2"} position="left" className="text-4xl font-bold my-4">{t.rich("title")}</Titulo>
            </div>
            <GridVideo/>
        </div>
    );
}
