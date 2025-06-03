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

export const useCreateAlbum = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ title, images }: { title: string; images: File[] }) => {
            return createAlbum(title, images);
        },
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['albums'] });
        },
    });
};
