import { useTranslations } from "next-intl";
import Image from "next/image";
import StreamerStatus from "./common/StreamerStatus";
import { Link } from "@/i18n/navigation";
interface socialMediaProps {
    link: string;
    logo: string;
}
interface legalNavProps {
    text: string,
    link : string,
    locale: string,
}


export default function FooterSection() {
    const date = new Date();
    const year = date.getFullYear();
    const rrssT = useTranslations();
    const t = useTranslations('FooterSection');
    return (
        <footer className="container">
            <div className="py-8 flex flex-wrap gap-8 justify-center items-center">
                {
                    rrssT.raw("SocialMedia").map((media: socialMediaProps, index: number) =>(
                        <div key={index}>
                            <a href={`${media.link}`} target="_blank">
                                <Image src={`/rrss_svg/${media.logo}.svg`} className="w-10 h-10 transition-all duration-300 hover:animate-wiggle" alt={media.logo} width={40} height={40} unoptimized={true}/>
                            </a>
                        </div>
                    ))
                }
            </div>
            <hr />
            <div className="flex flex-wrap justify-between">
                <div className="py-8">
                    <p>
                        {t('copyright', { year: year })}
                    </p>
                </div>
                <div className="py-8 flex flex-wrap gap-4">
                    {
                        t.raw("legalNav").map((item: legalNavProps, index: number) => (
                            // @ts-expect-error - item.link es seguro en este contexto
                            <Link key={index} href={item.link} locale={`${item.locale}`} className="transition-all hover:text-[#A43046]">{item.text}</Link>
                        ))
                    }
                </div>
            </div>
            <StreamerStatus streamerName="blacksmith3" />
        </footer>
    );
}