import { useCallback } from 'react';
import { useDeleteAlbum, UseDeleteAlbumOptions } from './use-delete-album';
import { TrashIcon } from 'lucide-react';
import { Album } from '@models/album';

type UseDeleteAlbumActionOptions = UseDeleteAlbumOptions;

export const useDeleteAlbumAction = (options: UseDeleteAlbumActionOptions = {}) => {
    const { mutate } = useDeleteAlbum({ ...options });

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
