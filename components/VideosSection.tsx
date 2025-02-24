"use client"
import { getYoutubeVideos } from "@/lib/getYoutubeVideos";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';

type YoutubeResponse = {
    items: Video[];
};

type Video = {
    id: string;
    king: string;
    snippet: {
        title: string;
    };
};

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
    console.log(videos.items[0].id);

    return (
        <div>
            {/* <Swiper
                slidesPerView={1}
            >
                {
                    videos.items.map((video: Video) => (
                        <SwiperSlide key={video.id}>
                            <iframe src={`https://www.youtube.com/embed/${video.id}`} />
                        </SwiperSlide>
                    ))
                }
            </Swiper> */}
            <iframe src={`https://www.youtube.com/embed/${videos.items[0].id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"/>
        </div>
    );
}