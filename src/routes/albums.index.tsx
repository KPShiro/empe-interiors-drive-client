import { createFileRoute } from '@tanstack/react-router';
import { AlbumCard } from '@components/album/album-card';
import { useGetAlbums } from '@hooks/use-get-albums';
import { Skeleton } from '@components/skeleton';
import { CreateAlbumButton } from '@components/create-album/create-album-button';

export const Route = createFileRoute('/albums/')({
    component: AlbumsPage,
});

function AlbumsPage() {
    const albums = useGetAlbums();

    if (albums.isLoading || !albums.data) {
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

    return (
        <>
            <CreateAlbumButton />
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
        </>
    );
}
