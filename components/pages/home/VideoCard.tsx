"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Video } from "@/types/youtube";

type VideoCardProps = {
    video: Video;
    index: number;
};

export default function VideoCard({ video, index }: VideoCardProps) {
    const thumbnails = video.snippet.thumbnails;
    const thumbnail =
        thumbnails.maxres ??
        thumbnails.high ??
        thumbnails.medium ??
        thumbnails.default;

    if (!thumbnail) return null;

    const videoId = video.snippet.resourceId.videoId;
    const playlistId = video.snippet.playlistId;

    return (
        <motion.div
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: index * 0.1,
            }}
        >
            <div className="group/image relative overflow-hidden">
                <a
                    href={`https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver en YouTube: ${video.snippet.title}`}
                >
                    <div className="before:absolute before:z-10 before:h-full before:w-full before:bg-black before:opacity-40 before:transition-all group-hover/image:before:opacity-20">
                        <Image
                            className="transition-all group-hover/image:scale-110"
                            src={thumbnail.url}
                            alt={video.snippet.title}
                            width={800}
                            height={800}
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />

                        <h3 className="absolute top-0 z-20 p-4 text-lg font-bold text-white">
                            {video.snippet.title}
                        </h3>
                    </div>
                </a>
            </div>
        </motion.div>
    );
}