export type AlbumImage = {
    id: string;
    name: string;
    url: string;
};

export type Album = {
    id: string;
    title: string;
    images: AlbumImage[];
    createdAt: string;
    updatedAt: string;
};
