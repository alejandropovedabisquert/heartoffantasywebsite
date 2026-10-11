import { NextResponse } from "next/server";
import { checkIfStreamerIsLive } from "@/lib/api/twitch";
export const revalidate = 60;
const STREAMER = "blacksmith3";
export async function GET() {
    try {
        const { data } = await checkIfStreamerIsLive(STREAMER);
        const stream = data[0] ?? null;
        return NextResponse.json({
            live: !!stream,
            stream: stream && {
                user_login: stream.user_login, user_name: stream.user_name, title:
                    stream.title
            },
        });
    } catch {
        return NextResponse.json({ live: false, stream: null });
    }
}