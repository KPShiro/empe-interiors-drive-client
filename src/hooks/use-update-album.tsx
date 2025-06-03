import { DriveApiConfig } from '@config/drive-api.config';
import { Album } from '@models/album';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@utils/fetcher';

export type UpdateAlbumParms = {
    albumId: Album['id'];
    update: Pick<Album, 'title'>;
};

function updateAlbum(
    albumId: UpdateAlbumParms['albumId'],
    update: UpdateAlbumParms['update']
): Promise<void> {
    const url: Parameters<typeof fetcher>[0] =
        `${DriveApiConfig.baseUrl}${DriveApiConfig.endpoints.albums}/${albumId}`;

    const options: Parameters<typeof fetcher>[1] = {
        method: 'PATCH',
        body: JSON.stringify(update),
    };

    return fetcher(url, options);
}

export const useUpdateAlbum = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UpdateAlbumParms) => {
            return updateAlbum(params.albumId, params.update);
        },
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['albums'] });
        },
    });
};
