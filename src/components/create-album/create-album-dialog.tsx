import * as Dialog from '@components/dialog';
import { FormFieldset } from '@components/form/form-fieldset';
import { FormLabel } from '@components/form/form-label';
import { TextInput } from '@components/input/text-input';
import { useCreateAlbum } from '@hooks/use-create-album';
import { FilledButton } from '@components/button/filled-button';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageInput } from '@components/input/image-input';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const fileSchema = z
    .instanceof(File)
    .refine(
        (file) => file.size <= MAX_FILE_SIZE_BYTES,
        `Maksymalny rozmiar pliku: ${String(MAX_FILE_SIZE_MB)}MB`
    )
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), 'Niepoprawy rodzaj pliku');

const createAlbumSchema = z.object({
    title: z.string().min(1),
    images: fileSchema.array().min(1),
});

type CreateAlbumInput = z.input<typeof createAlbumSchema>;
type CreateAlbumOutput = z.output<typeof createAlbumSchema>;

export const CreateAlbumDialog = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<CreateAlbumInput, undefined, CreateAlbumOutput>({
        resolver: zodResolver(createAlbumSchema),
        mode: 'onChange',
    });

    const createAlbum = useCreateAlbum();

    const onSubmit = ({ title, images }: CreateAlbumOutput) => {
        createAlbum.mutate({ title, images });
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Container aria-describedby={undefined}>
                <Dialog.Header>
                    <Dialog.Title>Utwórz album</Dialog.Title>
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
                        <Controller
                            control={control}
                            name="images"
                            render={({ field }) => (
                                <FormFieldset>
                                    <FormLabel htmlFor="files">Zdjęcia</FormLabel>
                                    <ImageInput
                                        id="files"
                                        placeholder="Dodaj zdjęcia"
                                        multiple
                                        max={MAX_FILE_SIZE_BYTES}
                                        accept={ALLOWED_IMAGE_TYPES.join(',')}
                                        onValueChange={field.onChange}
                                    />
                                </FormFieldset>
                            )}
                        />
                    </form>
                </Dialog.Content>
                <Dialog.Footer>
                    <Dialog.Close asChild>
                        <FilledButton
                            text="Zapisz Album"
                            disabled={!isValid}
                            onClick={() => void handleSubmit(onSubmit)()}
                        />
                    </Dialog.Close>
                </Dialog.Footer>
            </Dialog.Container>
        </Dialog.Portal>
    );
};
