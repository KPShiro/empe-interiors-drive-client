import { EditIcon } from 'lucide-react';
import { UpdateAlbumParms, useUpdateAlbum } from './use-update-album';
import { useCallback } from 'react';

export const useUpdateAlbumAction = () => {
    const { mutate } = useUpdateAlbum();

    const handleExecute = useCallback(
        (params: UpdateAlbumParms) => {
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
