import { TonalButton } from '@components/button/tonal-button';
import { UpdateAlbumButton } from '@components/update-album/update-album-button';
import { PageDescription } from '@components/page/page-description';
import { PageTitle } from '@components/page/page-title';
import { Skeleton } from '@components/skeleton';
import { useDeleteAlbumAction } from '@hooks/use-delete-album-action';
import { useGetAlbum } from '@hooks/use-get-album';
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import { formatDateTime } from '@utils/format-datetime';
import { ArrowLeftIcon } from 'lucide-react';

export const Route = createFileRoute('/albums/$albumId')({
    component: RouteComponent,
});

function RouteComponent() {
    const { albumId } = useParams({ from: Route.id });
    const albumQuery = useGetAlbum({ id: albumId });
    const album = albumQuery.data;

    const navigate = useNavigate();

    const deleteAlbumAction = useDeleteAlbumAction({
        onSuccess: () => {
            void navigate({ to: '/albums' });
        },
    });

    const navigateBack = () => {
        void navigate({ to: '/albums' });
    };

    if (albumQuery.isLoading) {
        return (
            <>
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-10 w-80" />
                    <Skeleton className="h-6 w-56" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 max-w-40 max-md:max-w-[unset]" />
                    <Skeleton className="h-10 max-w-24 max-md:max-w-[unset]" />
                    <Skeleton className="h-10 max-w-24 max-md:max-w-[unset]" />
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} className="aspect-square h-[unset]" />
                    ))}
                </div>
            </>
        );
    }

    if (albumQuery.isError || !album) {
        return (
            <>
                <div className="flex flex-col gap-1">
                    <PageTitle text="Nie udało się pobrać Albumu" />
                    <PageDescription text="Sprawdź czy link do albumu jest poprawny i spróbuj ponownie za chwilę." />
                </div>
                <TonalButton icon={ArrowLeftIcon} text="Powrót do listy" onClick={navigateBack} />
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-1">
                <PageTitle text={album.title} />
                <PageDescription
                    text={`Ostatnia aktualizacja: ${formatDateTime(album.updatedAt)}`}
                />
            </div>
            <div className="flex gap-2">
                <TonalButton icon={ArrowLeftIcon} text="Powrót do listy" onClick={navigateBack} />
                <UpdateAlbumButton album={album} />
                <TonalButton
                    icon={deleteAlbumAction.icon}
                    text={deleteAlbumAction.label}
                    onClick={() => deleteAlbumAction.execute(album.id)}
                />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
                {album.images.map((image) => (
                    <div key={image.id} className="group overflow-clip rounded-md">
                        <img
                            src={image.url}
                            className="aspect-square size-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

