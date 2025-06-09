import { DriveApiConfig } from '@config/drive-api.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@utils/fetcher';

function createAlbum(title: string, images: File[]): Promise<void> {
    const url: Parameters<typeof fetcher>[0] =
        `${DriveApiConfig.baseUrl}${DriveApiConfig.endpoints.albums}`;

    const formData = new FormData();
    formData.append('title', title);

    images.forEach((file) => {
        formData.append('images', file);
    });

    const options: Parameters<typeof fetcher>[1] = {
        method: 'POST',
        body: formData,
    };

    return fetcher(url, options);
}

export type UseCreateAlbumOptions = {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
};

export const useCreateAlbum = (options: UseCreateAlbumOptions = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ title, images }: { title: string; images: File[] }) => {
            return createAlbum(title, images);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['albums'], exact: true });
            options.onSuccess?.();
        },
        onError: (error) => {
            options.onError?.(error);
        },
    });
};
