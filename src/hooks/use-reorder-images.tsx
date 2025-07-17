import { DriveService } from '@services/drive';
import { ReorderImagesParams } from '@services/drive/reorder-images';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export type UseReorderImagesOptions = {
    onMutate?: () => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
};

export const useReorderImages = (options: UseReorderImagesOptions = {}) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (params: ReorderImagesParams) => {
            return DriveService.reorderImages(params);
        },
        onMutate: () => {
            options.onMutate?.();
        },
        onSuccess: async (_, variables) => {
            await Promise.allSettled([
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
