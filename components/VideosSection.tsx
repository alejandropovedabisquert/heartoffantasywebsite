"use client"
import YoutubeResponse, { Video } from "@/interfaces/interfacesYoutube";
import { getYoutubeVideos } from "@/lib/getYoutubeVideos";
import { useEffect, useState } from "react";
import { Titulo } from "./common/Titulo";

export default function VideosSection() {
    const [videos, setVideos] = useState<YoutubeResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

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
            } finally {

            }
        }
        fetchVideos();
    }, [])

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!videos) {
        return "Loading";
    }

    console.log(videos);

    return (
        <div className="relative">
            <Titulo as={"h2"} position="left" className="text-4xl font-bold my-4">#Devlogs</Titulo>
            <div className="grid grid-cols-6 gap-4">
                {
                    videos.items.map((video: Video) => (
                        <div className="col-span-2" key={video.id}>
                            <div className="relative overflow-hidden group/image">
                                <a href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}&list=${video.snippet.playlistId}`} target="_blank">
                                <div className="absolute w-full h-full bg-black opacity-40 z-10 group-hover/image:opacity-20 transition-all"></div>
                                    <img className="group-hover/image:scale-110 transition-all" src={`${video.snippet.thumbnails.maxres.url}`} alt="" />
                                    <h3 className="font-bold text-white text-lg absolute top-0 p-4 z-20">
                                        {video.snippet.title}
                                    </h3>
                                </a>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
}
