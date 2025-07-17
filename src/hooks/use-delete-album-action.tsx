import { useCallback } from 'react';
import { useDeleteAlbum, UseDeleteAlbumOptions } from './use-delete-album';
import { TrashIcon } from 'lucide-react';
import { useToast } from '@components/toast/context';
import { DeleteAlbumParams } from '@services/drive/delete-album';

type UseDeleteAlbumActionOptions = UseDeleteAlbumOptions;
type UseDeleteAlbumActionParams = DeleteAlbumParams & {
    albumTitle: string;
};

export const useDeleteAlbumAction = (options: UseDeleteAlbumActionOptions = {}) => {
    const toast = useToast();

    const { mutate } = useDeleteAlbum({
        onMutate: () => {
            options.onMutate?.();
        },
        onSettled: () => {
            options.onSettled?.();
        },
        onSuccess: () => {
            toast.show('success', {
                title: 'Album został usunięty',
            });
            options.onSuccess?.();
        },
        onError: (error) => {
            toast.show('danger', {
                title: 'Błąd podczas usuwania albumu',
                description:
                    'Spróbuj ponownie później, jeśli bład się powtarza, skontaktuj się z deweloperem',
            });
            options.onError?.(error);
        },
    });

    const handleExecute = useCallback(
        (params: UseDeleteAlbumActionParams) => {
            const { albumTitle, ...mutationParams } = params;

            if (!confirm(`Usunąć album "${albumTitle}"?`)) {
                return;
            }

            mutate(mutationParams);
        },
        [mutate]
    );

    return {
        icon: TrashIcon,
        label: 'Usuń',
        execute: handleExecute,
    };
};
