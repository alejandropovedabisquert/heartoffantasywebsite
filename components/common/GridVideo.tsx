import { getYoutubeVideos } from "@/lib/api/youtube"; // con "server-only", sin "use server"
import VideoCard from "../pages/home/VideoCard";
export default async function GridVideo() {
    const videos = await getYoutubeVideos().catch(() => null);
    if (!videos?.items.length) return null;
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {videos.items.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
            ))}
        </div>
    );
}