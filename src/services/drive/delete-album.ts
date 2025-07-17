import { Album } from '@models/album';
import request from '@utils/request';

export type DeleteAlbumParams = {
    albumId: Album['id'];
};

export const deleteAlbum = (params: DeleteAlbumParams): Promise<void> => {
    return request({
        url: `/albums/${params.albumId}`,
        method: 'delete',
    });
};
