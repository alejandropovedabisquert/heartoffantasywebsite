"use client"
import YoutubeResponse, { Video } from "@/types/youtube";
import { getYoutubeVideos } from "@/lib/actions/getYoutubeVideos";
import { useEffect, useState } from "react";
import SkeletonGridVideo from "./skeleton/SkeletonGridVideo";
import Image from "next/image";
import clsx from "clsx";

export default function GridVideo() {
    const [videos, setVideos] = useState<YoutubeResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const backgroundStyles = clsx(
        "before:absolute before:w-full before:h-full before:bg-black before:opacity-40 before:z-10 before:group-hover/image:opacity-20 before:transition-all",
    );

    useEffect(() => {
        async function fetchVideos() {
            try {
                const res = await getYoutubeVideos();
                setVideos(res)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error ocurred');
                }
            }
        }
        fetchVideos();
    }, [])

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!videos) {
        return <SkeletonGridVideo length={3}/>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {videos?.items.map((video: Video, index: number) => (
                <div className="col-span-2" key={video.id} data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
                    <div className="relative overflow-hidden group/image">
                        <a href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}&list=${video.snippet.playlistId}`} target="_blank">
                            <div className={backgroundStyles}>
                                <Image
                                    className="group-hover/image:scale-110 transition-all"
                                    src={`${video.snippet.thumbnails.maxres.url}`}
                                    alt={video.snippet.title}
                                    width={800}
                                    height={800}
                                />
                                <h3 className="font-bold text-white text-lg absolute top-0 p-4 z-20">
                                    {video.snippet.title}
                                </h3>
                            </div>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
