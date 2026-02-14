"use client"
import { checkIfStreamerIsLive } from "@/lib/api/apiTwitch";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookmarkX } from "lucide-react";
import { TwitchStreamResponse } from "@/types/twitch";

type nameProps = {
    streamerName: string,
}

export default function StreamerStatus(name: nameProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(true);
    const [data, setData] = useState<TwitchStreamResponse>();
    const t = useTranslations("TwitchPopup");

    useEffect(() => {
        const fetchStreamerStatus = async () => {
            try {
                const data = await checkIfStreamerIsLive(name.streamerName);
                setData(data);
            } catch (error) {
                console.error('Error fetching streamer status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStreamerStatus();

    }, [name.streamerName]);

    const handleClosePopup = () => {
        setIsPopupVisible(false); // Ocultar el popup
    };

    if (isLoading || !data || !isPopupVisible) {
        return null;
    }

    return (
        <>
            {
                data.data.length > 0 ? (
                    <div className="group/close fixed bottom-4 right-4 z-30 bg-[#6441a5] rounded-xl">
                        <button
                            onClick={handleClosePopup}
                            className="absolute -right-2 -top-6 z-10 transition-all opacity-0 group-hover/close:opacity-100 group-hover/close:-top-3"
                        >
                            <BookmarkX width={32} height={32} className="text-corporative" fill="white" />
                        </button>
                        <Link href={`https://www.twitch.tv/${data?.data[0].user_login}`} target="_blank">
                            <div className="relative flex">
                                <div className="h-4 w-4 bg-red-700 animate-pulse absolute -left-1 -top-1 rounded-full"></div>
                                <div className="flex justify-center items-center p-4 sm:pl-4">
                                    <Image src="/rrss_svg/twitch_white.svg" width={30} height={30} alt="Twitch" unoptimized={true} />
                                </div>
                                <div className="py-4 pr-4 hidden md:block">
                                    <h3 className="font-bold">
                                        {data?.data[0].user_name} {t("online")}
                                    </h3>
                                    <h4 className="truncate max-w-64">
                                        {data?.data[0].title}
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                ) : null
            }
        </>
    );
}