export type AlbumImage = {
    id: string;
    index: number;
    name: string;
    src: string;
};

export type AlbumThumbnail = Pick<AlbumImage, 'id' | 'src'>;

export type Album = {
    id: string;
    title: string;
    images: AlbumImage[];
    thumbnail: AlbumThumbnail;
    createdAt: string;
    updatedAt: string;
};
