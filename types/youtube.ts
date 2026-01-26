type YoutubeResponse = {
    items: Video[];
};

export type Video = {
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