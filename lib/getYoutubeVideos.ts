"use server"
export async function getYoutubeVideos() {
    const apiKey = process.env.YT_API_KEY;
    const channelId = process.env.YT_CHANNEL_ID;
    const apiURL = process.env.YT_API_URL;
    const playlistId = process.env.YT_PLAYLIST_ID

    try {
        const data = await fetch(`${apiURL}?key=${apiKey}&channelId=${channelId}&playlistId=${playlistId}&part=snippet&maxResults=6`);

        if(!data.ok){
            throw Error('Failed to fetch videos');
        }

        return await data.json();

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An error acurred while fetching the videos");
        }
    }
}