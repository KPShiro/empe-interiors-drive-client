import { useCallback } from 'react';
import { useDeleteAlbum } from './use-delete-album';
import { TrashIcon } from 'lucide-react';
import { Album } from '@models/album';

export const useDeleteAlbumAction = () => {
    const { mutate } = useDeleteAlbum();

    const handleExecute = useCallback(
        (albumId: Album['id']) => {
            if (!confirm(`Czy na pewno chcesz usunąć ten album?`)) {
                return;
            }

            mutate(albumId);
        },
        [mutate]
    );

    return {
        icon: TrashIcon,
        label: 'Usuń',
        execute: handleExecute,
    };
};
