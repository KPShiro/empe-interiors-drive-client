import { FormFieldset } from '@components/form/form-fieldset';
import { FormLabel } from '@components/form/form-label';
import { TextInput } from '@components/input/text-input';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateAlbumAction } from '@hooks/use-update-album-action';
import { Album } from '@models/album';
import { Select } from '@components/select';
import { SelectItem } from '@components/select/item';
import { FilledButton } from '@components/button/filled-button';

const updateAlbumSchema = z.object({
    title: z.string().min(1),
    thumbnailId: z.string().min(1),
});

type UpdateAlbumData = z.infer<typeof updateAlbumSchema>;

type UpdateAlbumFormProps = {
    album: Album;
    afterSubmit: () => void;
};

export const UpdateAlbumForm = (props: UpdateAlbumFormProps) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { isValid, isDirty },
    } = useForm<UpdateAlbumData>({
        resolver: zodResolver(updateAlbumSchema),
        mode: 'onChange',
        defaultValues: {
            title: props.album.title,
            thumbnailId: props.album.thumbnail.id,
        },
    });

    const updateAlbumAction = useUpdateAlbumAction();

    const onSubmit = (update: UpdateAlbumData) => {
        updateAlbumAction.execute({ albumId: props.album.id, update });
        props.afterSubmit();
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                void handleSubmit(onSubmit)();
            }}
            className="flex flex-col gap-4"
        >
            <FormFieldset>
                <FormLabel htmlFor="title">Nazwa albumu</FormLabel>
                <TextInput id="title" placeholder="Dodaj tytuł..." {...register('title')} />
            </FormFieldset>
            <FormFieldset>
                <FormLabel htmlFor="thumbnail">Okładka</FormLabel>
                <Controller
                    control={control}
                    name="thumbnailId"
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            {props.album.images.map((image) => (
                                <SelectItem
                                    key={image.id}
                                    value={image.id}
                                    label={image.name}
                                    imageSrc={image.src}
                                />
                            ))}
                        </Select>
                    )}
                />
            </FormFieldset>
            <FilledButton type="submit" text="Zapisz zmiany" disabled={!isValid || !isDirty} />
        </form>
    );
};
