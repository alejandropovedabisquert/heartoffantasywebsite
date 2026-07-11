import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/app/[lang]/dictionaries";
import LocalizedLink from "../ui/LocalizedLink";
import { Locale } from "@/lib/routes";

type socialMediaProps = {
    link: string;
    logo: string;
}

const SOCIAL_MEDIA = [
    {
      "link": "https://www.twitch.tv/blacksmith3",
      "logo": "twitch"
    },
    {
      "link": "https://www.youtube.com/@blacksmith94",
      "logo": "youtube"
    },
    {
      "link": "https://discord.gg/Qmp4aqJcQ8",
      "logo": "discord"
    },
    {
      "link": "https://ko-fi.com/blacksmith3",
      "logo": "kofi"
    },
    {
      "link": "https://blacksmith94.itch.io/heartoffantasy",
      "logo": "itchio"
    }
]

export default function FooterSection({
  dict,
  locale
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>["FooterSection"],
  locale: Locale
}) {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="container">
            <div className="py-8 flex flex-wrap gap-8 justify-center items-center">
                {
                    SOCIAL_MEDIA.map((media: socialMediaProps, index: number) =>(
                        <div key={index}>
                            <Link href={`${media.link}`} target="_blank">
                                <Image src={`/rrss_svg/${media.logo}.svg`} className="w-10 h-10 transition-all duration-300 hover:animate-wiggle" alt={media.logo} width={40} height={40} unoptimized={true}/>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <hr />
            <div className="flex flex-wrap justify-between">
                <div className="py-8">
                    <p>
                        {dict.gameName} {year} {dict.copyright}
                    </p>
                </div>
                <div className="py-8 flex flex-wrap gap-4">
                    {
                        dict.legalNav.map((item, index) => (
                            <LocalizedLink key={index} href={item.link} locale={locale}>{item.text}</LocalizedLink>
                        ))
                    }
                </div>
            </div>
        </footer>
    );
}
