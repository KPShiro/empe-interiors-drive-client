import { Album } from '@models/album';
import request from '@utils/request';

export const getAlbums = (limit?: number): Promise<Album[]> => {
    const params =
        limit && limit > 0
            ? {
                  limit: limit.toString(),
              }
            : undefined;

    return request({
        url: '/albums',
        method: 'get',
        params,
    });
};
