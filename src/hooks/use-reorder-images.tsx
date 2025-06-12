import { DriveApiConfig } from '@config/drive-api.config';
import { Album, AlbumImage } from '@models/album';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '@utils/fetcher';

export type ReorderImagesParms = {
    albumId: Album['id'];
    imageIds: AlbumImage['id'][];
};

function reorderImages(
    albumId: ReorderImagesParms['albumId'],
    imageIds: ReorderImagesParms['imageIds']
): Promise<void> {
    const url: Parameters<typeof fetcher>[0] =
        `${DriveApiConfig.baseUrl}${DriveApiConfig.endpoints.albums}/${albumId}/reorder-images`;

    const options: Parameters<typeof fetcher>[1] = {
        method: 'PATCH',
        body: {
            imageIds,
        },
    };

    return fetcher(url, options);
}

export type UseReorderImagesOptions = {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
};

export const useReorderImages = (options: UseReorderImagesOptions = {}) => {
    return useMutation({
        mutationFn: (params: ReorderImagesParms) => {
            return reorderImages(params.albumId, params.imageIds);
        },
        onSuccess: () => {
            options.onSuccess?.();
        },
        onError: (error) => {
            options.onError?.(error);
        },
    });
};
