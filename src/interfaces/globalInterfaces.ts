export interface IImage {
    src: string;
    alt: string;
}

export interface ISong {
    accent: string;
    artist: string;
    cover: string;
    date_created: string;
    date_updated: string;
    id: number;
    name: string;
    duration?: number;
    sort: string | null;
    status: string;
    top_track: boolean;
    url: string;
    user_created: string;
    user_updated: string;
}