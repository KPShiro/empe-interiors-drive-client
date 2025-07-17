import { useCallback, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { useCreateAlbum, UseCreateAlbumOptions } from './use-create-album';
import { useToast } from '@components/toast/context';
import { CreateAlbumParams } from '@services/drive/create-album';
import { UIAction } from '@models/ui-action';

type UseCreateAlbumActionOptions = UseCreateAlbumOptions;

export const useCreateAlbumAction = (
    options: UseCreateAlbumActionOptions = {}
): UIAction<CreateAlbumParams> => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isHidden] = useState<boolean>(false);

    const toast = useToast();

    const [loadingToastId, setLoadingToastId] = useState<string | null>(null);
    const [loadingToastTimeout, setLoadingToastTimeout] = useState<NodeJS.Timeout | null>(null);
    const loadingToastThreshold: number = 3_000;

    const handleLongMutate = () => {
        const timeoutId = setTimeout(() => {
            const id = toast.show('info', {
                title: 'Dodawanie nowego albumu...',
                description: 'Proces trwa dłużej niż zwykle, już prawie gotowe.',
                duration: Infinity,
            });
            setLoadingToastId(id);
        }, loadingToastThreshold);

        setLoadingToastTimeout(timeoutId);
    };

    const { mutate } = useCreateAlbum({
        onMutate: () => {
            setIsDisabled(true);
            setIsLoading(true);

            handleLongMutate();

            options.onMutate?.();
        },
        onSettled: () => {
            setIsDisabled(false);
            setIsLoading(false);

            if (loadingToastTimeout) {
                clearTimeout(loadingToastTimeout);
                setLoadingToastTimeout(null);
            }

            if (loadingToastId) {
                toast.dismiss(loadingToastId);
                setLoadingToastId(null);
            }

            options.onSettled?.();
        },
        onSuccess: () => {
            toast.show('success', {
                title: 'Nowy album został dodany',
            });
            options.onSuccess?.();
        },
        onError: (error) => {
            toast.show('danger', {
                title: 'Błąd podczas dodawania albumu',
                description:
                    'Spróbuj ponownie później, jeśli bład się powtarza, skontaktuj się z deweloperem',
            });
            options.onError?.(error);
        },
    });

    const handleExecute = useCallback(
        (params: CreateAlbumParams) => {
            mutate(params);
        },
        [mutate]
    );

    return {
        icon: PlusIcon,
        label: 'Dodaj Album',
        execute: handleExecute,
        isDisabled,
        isHidden,
        isLoading,
    };
};
