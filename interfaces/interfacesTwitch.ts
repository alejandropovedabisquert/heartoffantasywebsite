interface Stream {
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    type: string;
    title: string;
    viewer_count: number;
    started_at: string; // O puedes usar `Date` si lo conviertes
    language: string;
    thumbnail_url: string;
    tag_ids: string[]; // Array de strings
    tags: string[]; // Array de strings
    is_mature: boolean;
}

interface Pagination {
    cursor: string;
}

interface TwitchStreamResponse {
    data: Stream[];
    pagination: Pagination;
}