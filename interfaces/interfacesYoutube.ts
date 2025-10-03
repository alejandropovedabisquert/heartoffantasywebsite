// TODO: Considera renombrar la carpeta "interfaces" a "types" para seguir la convención de Next.js y TypeScript.
interface YoutubeResponse {
    items: Video[];
};

export interface Video {
    id: string;
    snippet: {
        title: string;
        description: string;
        publishedAt: string;
        playlistId: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
            maxres: {
                url: string;
                width: number;
                height: number;
            };
        };
        resourceId: {
            videoId: string;
        }
    };
};

export default YoutubeResponse;