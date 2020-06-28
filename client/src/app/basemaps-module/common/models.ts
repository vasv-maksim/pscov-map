export interface Basemap {
    _id: string;
    title: string;
    description: string;
    user: string;
    url: string;
    date: string;
}

export interface Payload {
    _id?: string;
    title: string;
    description: string;
    url: string;
}

