import { TwitchStreamResponse } from "@/types/twitch";
import "server-only";
async function getAccessToken(): Promise<string> { // ya no se exporta
    const params = new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID!,
        client_secret: process.env.TWITCH_CLIENT_SECRET!,
        grant_type: "client_credentials",
    });
    const res = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        body: params,
        next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Twitch token error: ${res.status}`);
    return (await res.json()).access_token;
}
export async function checkIfStreamerIsLive(streamerName: string): Promise<TwitchStreamResponse> {
    const res = await fetch(
        `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(streamerName)}`,
        {
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID!,
                Authorization: `Bearer ${await getAccessToken()}`,
            },
            next: { revalidate: 60 },
        },
    );
    if (!res.ok) throw new Error(`Twitch streams error: ${res.status}`);
    return res.json();
}