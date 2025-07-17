import { DriveService } from '@services/drive';
import { UpdateAlbumParams } from '@services/drive/update-album';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export type UseUpdateAlbumOptions = {
    onMutate?: () => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
};

export const useUpdateAlbum = (options: UseUpdateAlbumOptions = {}) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (params: UpdateAlbumParams) => {
            return DriveService.updateAlbum(params);
        },
        onMutate: () => {
            options.onMutate?.();
        },
        onSuccess: async (_, variables) => {
            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ['albums'], exact: true }),
                queryClient.invalidateQueries({
                    queryKey: ['albums', variables.albumId],
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
