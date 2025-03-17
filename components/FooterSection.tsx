import { useTranslations } from "next-intl";
import Image from "next/image";
import StreamerStatus from "./common/StreamerStatus";
interface socialMediaProps {
    link: string;
    logo: string;
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
            <div className="py-8 text-center">
                <p>
                    {t('copyright', { year: year })}
                </p>
            </div>
            <StreamerStatus streamerName="blacksmith3" />
        </footer>
    );
}