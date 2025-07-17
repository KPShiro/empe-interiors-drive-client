import { FormFieldset } from '@components/form/form-fieldset';
import { FormLabel } from '@components/form/form-label';
import { TextInput } from '@components/input/text-input';
import { FilledButton } from '@components/button/filled-button';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageInput } from '@components/input/image-input';
import {
    ALLOWED_FILE_TYPES,
    MAX_FILE_SIZE_IN_BYTES,
    MAX_FILE_SIZE_IN_MEGABYTES,
    MAX_FILES_PER_ALBUM,
    MIN_FILES_PER_ALBUM,
} from '@services/drive';
import { isFileTypeValid } from '@utils/is-file-type-valid';
import { useCreateAlbumAction } from '@hooks/use-create-album-action';
import { useState } from 'react';

const fileSchema = z
    .instanceof(File)
    .refine(
        (file) => file.size <= MAX_FILE_SIZE_IN_BYTES,
        `Maksymalny rozmiar pliku: ${String(MAX_FILE_SIZE_IN_MEGABYTES)}MB`
    )
    .refine(
        (file) => isFileTypeValid(file, ALLOWED_FILE_TYPES.join(',')),
        'Niepoprawy rodzaj pliku'
    );

const createAlbumSchema = z.object({
    title: z.string().min(1),
    images: fileSchema.array().min(MIN_FILES_PER_ALBUM).max(MAX_FILES_PER_ALBUM),
});

type CreateAlbumInput = z.input<typeof createAlbumSchema>;
type CreateAlbumOutput = z.output<typeof createAlbumSchema>;

type CreateAlbumFormProps = {
    onSubmit?: (data: CreateAlbumOutput) => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
};

export const CreateAlbumForm = (props: CreateAlbumFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        control,
        register,
        handleSubmit,
        formState: { isValid, isDirty },
    } = useForm<CreateAlbumInput, undefined, CreateAlbumOutput>({
        resolver: zodResolver(createAlbumSchema),
        mode: 'onChange',
        disabled: isLoading,
    });

    const createAlbumAction = useCreateAlbumAction({
        onSuccess: () => props.onSuccess?.(),
        onError: (error) => props.onError?.(error),
        onSettled: () => setIsLoading(false),
    });

    const onSubmit = async (data: CreateAlbumOutput) => {
        setIsLoading(true);
        await createAlbumAction.execute(data);
        props.onSubmit?.(data);
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
            <Controller
                control={control}
                name="images"
                render={({ field, formState }) => (
                    <FormFieldset>
                        <FormLabel htmlFor="files">Zdjęcia</FormLabel>
                        <ImageInput
                            id="files"
                            placeholder="Dodaj zdjęcia"
                            multiple
                            max={MAX_FILE_SIZE_IN_BYTES}
                            minLength={MIN_FILES_PER_ALBUM}
                            maxLength={MAX_FILES_PER_ALBUM}
                            accept={ALLOWED_FILE_TYPES.join(',')}
                            onValueChange={field.onChange}
                            disabled={formState.disabled}
                        />
                    </FormFieldset>
                )}
            />
            <FilledButton
                type="submit"
                text="Stwórz album"
                disabled={!isValid || !isDirty || createAlbumAction.isDisabled}
                loading={createAlbumAction.isLoading}
            />
        </form>
    );
};
