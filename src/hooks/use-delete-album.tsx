import { DriveApiConfig } from '@config/drive-api.config';
import { Album } from '@models/album';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@utils/fetcher';

function deleteAlbum(albumId: Album['id']): Promise<void> {
    const url: Parameters<typeof fetcher>[0] =
        `${DriveApiConfig.baseUrl}${DriveApiConfig.endpoints.albums}/${albumId}`;

    const options: Parameters<typeof fetcher>[1] = {
        method: 'DELETE',
    };

    return fetcher(url, options);
}

export type UseDeleteAlbumOptions = {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
};

export const useDeleteAlbum = (options: UseDeleteAlbumOptions = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (albumId: string) => deleteAlbum(albumId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['albums'], exact: true });
            options.onSuccess?.();
        },
        onError: (error) => {
            options.onError?.(error);
        },
    });
};
