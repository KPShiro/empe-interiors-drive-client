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

export type UseUpdateAlbumOptions = {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
};

export const useUpdateAlbum = (options: UseUpdateAlbumOptions = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UpdateAlbumParms) => {
            return updateAlbum(params.albumId, params.update);
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({ queryKey: ['albums'], exact: true });
            await queryClient.invalidateQueries({
                queryKey: ['albums', variables.albumId],
                exact: true,
            });
            options.onSuccess?.();
        },
        onError: (error) => {
            options.onError?.(error);
        },
    });
};
