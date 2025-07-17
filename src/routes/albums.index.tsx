import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { AlbumCard } from '@components/album/album-card';
import { CreateAlbumButton } from '@components/create-album/create-album-button';
import { PageTitle } from '@components/page/page-title';
import { PageDescription } from '@components/page/page-description';
import { LayoutWithNavbar } from '@components/layout/layout-with-navbar';
import { Grid } from '@components/grid';
import { DriveService } from '@services/drive';

export const Route = createFileRoute('/albums/')({
    component: AlbumsPage,
    loader: () => DriveService.getAlbums(),
});

function AlbumsPage() {
    const albums = useLoaderData({ from: Route.id });

    if (albums.length === 0) {
        return (
            <LayoutWithNavbar className="flex flex-1 items-center justify-center gap-10">
                <div className="flex flex-col gap-2 text-center">
                    <PageTitle text="Brak albumów do wyświetlenia" />
                    <PageDescription text="Wygląda na to, że nie masz jeszcze żadnych albumów w swojej kolecji. Wszystkie utworzone albumy będą widoczne na tej stronie." />
                </div>
                <CreateAlbumButton variant="secondary" text="Dodaj pierwszy album" />
            </LayoutWithNavbar>
        );
    }

    return (
        <LayoutWithNavbar>
            <Grid>
                {albums.map((album) => (
                    <AlbumCard
                        key={album.id}
                        id={album.id}
                        title={album.title}
                        createdAt={album.createdAt}
                        imagesCount={album.images.length}
                        thumbnailSrc={album.thumbnail.src}
                    />
                ))}
            </Grid>
        </LayoutWithNavbar>
    );
}
