import { FilledButton } from '@components/button/filled-button';
import { Dialog } from '@components/dialog';
import { CreateAlbumForm } from './create-album-form';
import { useState } from 'react';
import { TonalButton } from '@components/button/tonal-button';
import { useCreateAlbumAction } from '@hooks/use-create-album-action';

type CreateAlbumButtonProps = {
    variant?: 'primary' | 'secondary';
    text?: string | undefined;
};

export const CreateAlbumButton = ({ variant = 'primary', text }: CreateAlbumButtonProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const ButtonComponent = variant === 'primary' ? FilledButton : TonalButton;

    const createAlbumAction = useCreateAlbumAction();

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
                <ButtonComponent
                    icon={createAlbumAction.icon}
                    text={text ?? createAlbumAction.label}
                />
            </Dialog.Trigger>
            <Dialog.Content aria-describedby={undefined}>
                <Dialog.Header title="Tworzenie nowego albumu" />
                <Dialog.Container>
                    <CreateAlbumForm onSuccess={() => setIsDialogOpen(false)} />
                </Dialog.Container>
            </Dialog.Content>
        </Dialog>
    );
};
