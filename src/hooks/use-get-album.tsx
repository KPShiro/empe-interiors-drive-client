import { DriveApiConfig } from '@config/drive-api.config';
import { Album } from '@models/album';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@utils/fetcher';

async function getAlbumById(id: Album['id']): Promise<Album> {
    const url: Parameters<typeof fetcher>[0] =
        `${DriveApiConfig.baseUrl}${DriveApiConfig.endpoints.albums}/${id}`;

    return fetcher(url);
}

type UseGetAlbumsParams = {
    id: Album['id'];
};

export const useGetAlbum = (params: UseGetAlbumsParams) => {
    return useQuery({
        queryKey: ['albums', params.id],
        queryFn: () => getAlbumById(params.id),
        retry: 1,
    });
};
