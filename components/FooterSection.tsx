import Image from "next/image";

const socialMedia = [
    {
        "link": "https://ko-fi.com/blacksmith3",
        "logo": "kofi",
    },
    {
        "link": "https://blacksmith94.itch.io/heartoffantasy",
        "logo": "itchio",
    },
    {
        "link": "https://www.twitch.tv/blacksmith3",
        "logo": "twitch",
    },
    {
        "link": "https://www.youtube.com/@blacksmith94",
        "logo": "youtube",
    },
]

export default function FooterSection() {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="container">
            <div className="py-8 flex flex-wrap gap-8 justify-center items-center">
                {
                    socialMedia.map((media, index) =>(
                        <div key={index}>
                            <a href={`${media.link}`} target="_blank">
                                <Image src={`/rrss_svg/${media.logo}.svg`} className="w-10 h-10 transition-all duration-300 hover:animate-wiggle" alt="" width={40} height={40} unoptimized={true}/>
                            </a>
                        </div>
                    ))
                }
            </div>
            <hr />
            <div className="py-8 text-center">
                <p>
                    Heart of Fantasy &copy; {year} All Rights Reserved
                </p>
            </div>
        </footer>
    );
}