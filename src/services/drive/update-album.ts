import { Album } from '@models/album';
import request from '@utils/request';

export type UpdateAlbumParams = {
    albumId: Album['id'];
    update: {
        title: Album['title'];
        thumbnailId: Album['thumbnail']['id'];
    };
};

export const updateAlbum = (params: UpdateAlbumParams): Promise<void> => {
    return request({
        url: `/albums/${params.albumId}`,
        method: 'patch',
        data: params.update,
    });
};
