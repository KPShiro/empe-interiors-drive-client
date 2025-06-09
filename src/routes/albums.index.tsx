import { createFileRoute } from '@tanstack/react-router';
import { AlbumCard } from '@components/album/album-card';
import { useGetAlbums } from '@hooks/use-get-albums';
import { Skeleton } from '@components/skeleton';
import { CreateAlbumButton } from '@components/create-album/create-album-button';
import { PageTitle } from '@components/page/page-title';
import { PageDescription } from '@components/page/page-description';

export const Route = createFileRoute('/albums/')({
    component: AlbumsPage,
});

function AlbumsPage() {
    const albums = useGetAlbums();

    if (albums.isLoading) {
        return (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex flex-col gap-3">
                        <Skeleton className="aspect-square h-[initial]" />
                        <div className="flex flex-col gap-0.5">
                            <Skeleton className="h-6 w-4/5" />
                            <Skeleton className="h-4 w-2/5" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (albums.isError || !albums.data) {
        return (
            <div className="text-danger bg-danger/10 flex flex-col gap-1 rounded-md p-6">
                <div className="text-base font-medium">Wystąpił błąd podczas ładowania albumów</div>
                <div className="text-sm text-current/60">
                    Spróbuj ponownie za chwilę lub skontaktuj się z administratorem, jeśli problem
                    będzie się powtarzał.
                </div>
            </div>
        );
    }

    return (
        <>
            <CreateAlbumButton />
            {albums.data.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {albums.data.map((album) => (
                        <AlbumCard
                            key={album.id}
                            id={album.id}
                            title={album.title}
                            createdAt={album.createdAt}
                            imagesCount={album.images.length}
                            thumbnailUrl={album.images[0]?.url}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <PageTitle text="Utwórz swój pierwszy album" />
                    <PageDescription text="Wygląda na to, że nie masz jeszcze żadnych albumów w swojej kolecji. Wszystkie utworzone albumy będą widoczne na tej stronie." />
                </div>
            )}
        </>
    );
}
