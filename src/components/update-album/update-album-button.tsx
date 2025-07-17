import { Dialog } from '@components/dialog';
import { UpdateAlbumForm } from './update-album-form';
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
                <TonalButton icon={updateAlbumAction.icon} text={updateAlbumAction.label} />
            </Dialog.Trigger>
            <Dialog.Content aria-describedby={undefined}>
                <Dialog.Header title="Edycja Albumu" />
                <Dialog.Container>
                    <UpdateAlbumForm album={album} afterSubmit={() => setIsDialogOpen(false)} />
                </Dialog.Container>
            </Dialog.Content>
        </Dialog>
    );
};
