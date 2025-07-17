import { Album, AlbumImage } from '@models/album';
import request from '@utils/request';

export type ReorderImagesParams = {
    albumId: Album['id'];
    imageIds: AlbumImage['id'][];
};

export const reorderImages = (params: ReorderImagesParams): Promise<void> => {
    return request({
        url: `/albums/${params.albumId}/reorder-images`,
        method: 'patch',
        data: {
            imageIds: params.imageIds,
        },
    });
};
