import { DriveApiConfig } from '@config/drive-api.config';
import { Album } from '@models/album';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@utils/fetcher';

async function getAlbums(limit?: number): Promise<Album[]> {
    const url: Parameters<typeof fetcher>[0] =
        `${DriveApiConfig.baseUrl}${DriveApiConfig.endpoints.albums}`;

    const options: Parameters<typeof fetcher>[1] = {
        queryParams: limit && limit > 0 ? { limit: limit.toString() } : undefined,
    };

    return fetcher(url, options);
}

type UseGetAlbumsParams = {
    limit?: number;
};

export const useGetAlbums = (params: UseGetAlbumsParams = {}) => {
    return useQuery({
        queryKey: ['albums'],
        queryFn: () => getAlbums(params.limit),
    });
};
