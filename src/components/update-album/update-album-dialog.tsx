import * as Dialog from '@components/dialog';
import { FormFieldset } from '@components/form/form-fieldset';
import { FormLabel } from '@components/form/form-label';
import { TextInput } from '@components/input/text-input';
import { FilledButton } from '@components/button/filled-button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateAlbumAction } from '@hooks/use-update-album-action';
import { Album } from '@models/album';

const updateAlbumSchema = z.object({
    title: z.string().min(1),
});

type UpdateAlbumData = z.infer<typeof updateAlbumSchema>;

type UpdateAlbumDialogProps = {
    album: Album;
};

export const UpdateAlbumDialog = (props: UpdateAlbumDialogProps) => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<UpdateAlbumData>({
        resolver: zodResolver(updateAlbumSchema),
        mode: 'onChange',
        defaultValues: {
            title: props.album.title,
        },
    });

    const updateAlbumAction = useUpdateAlbumAction();

    const onSubmit = (update: UpdateAlbumData) => {
        updateAlbumAction.execute({ albumId: props.album.id, update });
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Container aria-describedby={undefined}>
                <Dialog.Header>
                    <Dialog.Title>Edytuj album</Dialog.Title>
                </Dialog.Header>
                <Dialog.Content>
                    <form className="my-6 flex flex-col gap-4">
                        <FormFieldset>
                            <FormLabel htmlFor="title">Nazwa albumu</FormLabel>
                            <TextInput
                                id="title"
                                placeholder="Dodaj tytuł..."
                                {...register('title')}
                            />
                        </FormFieldset>
                    </form>
                </Dialog.Content>
                <Dialog.Footer>
                    <Dialog.Close asChild>
                        <FilledButton
                            text="Zapisz zmiany"
                            disabled={!isValid}
                            onClick={() => void handleSubmit(onSubmit)()}
                        />
                    </Dialog.Close>
                </Dialog.Footer>
            </Dialog.Container>
        </Dialog.Portal>
    );
};
