import * as Dialog from '@components/dialog';
import { UpdateAlbumDialog } from './update-album-dialog';
import { useState } from 'react';
import { TonalButton } from '@components/button/tonal-button';
import { useUpdateAlbumAction } from '@hooks/use-update-album-action';
import { Album } from '@models/album';

type UpdateAlbumButtonProps = {
    album: Album;
};

export const UpdateAlbumButton = ({ album }: UpdateAlbumButtonProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const updateAlbumAction = useUpdateAlbumAction();

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
                <TonalButton icon={updateAlbumAction.icon} text={updateAlbumAction.label} />
            </Dialog.Trigger>
            {isDialogOpen ? <UpdateAlbumDialog album={album} /> : null}
        </Dialog.Root>
    );
};
