import { EyeIcon } from 'lucide-react';
import { Album } from '@models/album';
import { useNavigate } from '@tanstack/react-router';

export const usePreviewAlbumAction = () => {
    const navigate = useNavigate();

    const handleExecute = (albumId: Album['id']) => {
        void navigate({
            to: '/albums/$albumId',
            params: { albumId },
        });
    };

    return {
        icon: EyeIcon,
        label: 'Otwórz',
        execute: handleExecute,
    };
};
