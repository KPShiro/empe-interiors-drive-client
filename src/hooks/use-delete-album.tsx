import { DriveService } from '@services/drive';
import { DeleteAlbumParams } from '@services/drive/delete-album';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export type UseDeleteAlbumOptions = {
    onMutate?: () => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
};

export const useDeleteAlbum = (options: UseDeleteAlbumOptions = {}) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (params: DeleteAlbumParams) => {
            return DriveService.deleteAlbum(params);
        },
        onMutate: () => {
            options.onMutate?.();
        },
        onSuccess: async (_, params) => {
            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ['albums'], exact: true }),
                queryClient.invalidateQueries({
                    queryKey: ['albums', params.albumId],
                    exact: true,
                }),
                router.invalidate(),
            ]);
            options.onSuccess?.();
        },
        onError: (error) => {
            options.onError?.(error);
        },
        onSettled: () => {
            options.onSettled?.();
        },
    });
};
