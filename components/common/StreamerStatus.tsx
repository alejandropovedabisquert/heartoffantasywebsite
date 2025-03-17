"use client"
import { checkIfStreamerIsLive } from "@/lib/apiTwitch";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface nameProps {
    streamerName: string,
}

export default function StreamerStatus(name: nameProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
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

    if (isLoading || !data) {
        return null;
    }

    return (
        <>
            {
                data.data.length > 0 ? (
                    <div className="fixed bottom-4 right-4 z-30 bg-[#6441a5] rounded-xl">
                        <Link href={`https://www.twitch.tv/${data?.data[0].user_login}`} target="_blank">
                            <div className="relative flex gap-4">
                                <div className="h-4 w-4 bg-red-700 animate-pulse absolute -left-1 -top-1 rounded-full"></div>
                                <div className="flex justify-center items-center p-4 sm:pl-4">
                                    <Image src="/rrss_svg/twitch_white.svg" width={30} height={30} alt="" unoptimized={true}/>
                                </div>
                                <div className="py-4 pr-4 hidden md:block">
                                    <h3 className="font-bold">
                                        {data?.data[0].user_name} {t.rich("online")}
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