import { FilledButton } from '@components/button/filled-button';
import * as Dialog from '@components/dialog';
import { PlusIcon } from 'lucide-react';
import { CreateAlbumDialog } from './create-album-dialog';
import { useState } from 'react';

export const CreateAlbumButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
                <FilledButton icon={PlusIcon} text="Nowy Album" />
            </Dialog.Trigger>
            {isDialogOpen ? <CreateAlbumDialog /> : null}
        </Dialog.Root>
    );
};
