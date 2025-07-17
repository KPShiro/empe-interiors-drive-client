import { DriveService } from '@services/drive';
import { CreateAlbumParams } from '@services/drive/create-album';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export type UseCreateAlbumOptions = {
    onMutate?: () => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
};

export const useCreateAlbum = (options: UseCreateAlbumOptions = {}) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (params: CreateAlbumParams) => {
            return DriveService.createAlbum(params);
        },
        onMutate: () => {
            options.onMutate?.();
        },
        onSuccess: async () => {
            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ['albums'], exact: true }),
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
