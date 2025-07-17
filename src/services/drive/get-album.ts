import { Album } from '@models/album';
import request from '@utils/request';

export const getAlbum = (albumId: Album['id']): Promise<Album> => {
    return request({
        url: `/albums/${albumId}`,
        method: 'get',
    });
};
