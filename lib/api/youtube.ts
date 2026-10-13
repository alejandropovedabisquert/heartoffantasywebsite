import "server-only";
import type YoutubeResponse from "@/types/youtube";

export async function getYoutubeVideos(): Promise<YoutubeResponse> {
    const apiKey = process.env.YT_API_KEY;
    const channelId = process.env.YT_CHANNEL_ID;
    const apiURL = process.env.YT_API_URL;
    const playlistId = process.env.YT_PLAYLIST_ID;

    const url = `${apiURL}?key=${apiKey}&channelId=${channelId}&playlistId=${playlistId}&part=snippet&maxResults=6`;

    const response = await fetch(url, {
        next: { revalidate: 604800 },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status}`);
    }

    return (await response.json()) as YoutubeResponse;
}