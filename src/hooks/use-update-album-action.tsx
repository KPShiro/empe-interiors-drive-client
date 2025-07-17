import { EditIcon } from 'lucide-react';
import { useUpdateAlbum } from './use-update-album';
import { useCallback } from 'react';
import { useToast } from '@components/toast/context';
import { UpdateAlbumParams } from '@services/drive/update-album';

export const useUpdateAlbumAction = () => {
    const toast = useToast();

    const { mutate } = useUpdateAlbum({
        onSuccess: () => {
            toast.show('success', {
                title: 'Album zaktualizowany',
            });
        },
        onError: () => {
            toast.show('danger', {
                title: 'Błąd podczas aktualizacji albumu',
                description:
                    'Spróbuj ponownie później, jeśli bład się powtarza, skontaktuj się z deweloperem',
            });
        },
    });

    const handleExecute = useCallback(
        (params: UpdateAlbumParams) => {
            mutate(params);
        },
        [mutate]
    );

    return {
        icon: EditIcon,
        label: 'Edytuj',
        execute: handleExecute,
    };
};
