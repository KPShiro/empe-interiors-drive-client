import { TonalButton } from '@components/button/tonal-button';
import { UpdateAlbumButton } from '@components/update-album/update-album-button';
import { PageDescription } from '@components/page/page-description';
import { PageTitle } from '@components/page/page-title';
import { useDeleteAlbumAction } from '@hooks/use-delete-album-action';
import { createFileRoute, useLoaderData, useNavigate, useParams } from '@tanstack/react-router';
import { formatDateTime } from '@utils/format-datetime';
import { ArrowLeftIcon } from 'lucide-react';
import { SortableItem } from '@components/sortable/sortable-item';
import { useState } from 'react';
import { AlbumImage } from '@models/album';
import { useReorderImages } from '@hooks/use-reorder-images';
import { SortableGrid } from '@components/sortable/sortable-grid';
import { AlbumImageCard } from '@components/album/album-image-card';
import { AlbumThumbnail } from '@components/album/album-thumbnail';
import { LayoutWithNavbar } from '@components/layout/layout-with-navbar';
import { DriveService } from '@services/drive';

export const Route = createFileRoute('/albums/$albumId')({
    component: RouteComponent,
    loader: ({ params }) => DriveService.getAlbum(params.albumId),
});

function RouteComponent() {
    const { albumId } = useParams({ from: Route.id });
    const album = useLoaderData({ from: Route.id });
    const navigate = useNavigate();

    const [images, setImages] = useState<AlbumImage[]>(album.images);

    const navigateToList = () => {
        void navigate({ to: '/albums' });
    };

    const reorderImages = useReorderImages();
    const deleteAlbumAction = useDeleteAlbumAction({
        onMutate: () => {
            navigateToList();
        },
    });

    const handleReorderImages = (sortedItems: AlbumImage[]) => {
        setImages(sortedItems);

        const imageIds = sortedItems.map((item) => item.id);
        reorderImages.mutate({ albumId, imageIds });
    };

    return (
        <LayoutWithNavbar>
            <div className="flex items-center gap-4">
                <AlbumThumbnail src={album.thumbnail.src} alt={album.thumbnail.id} />
                <div className="flex flex-col gap-1">
                    <PageTitle text={album.title} />
                    <PageDescription
                        text={`Ostatnia aktualizacja: ${formatDateTime(album.updatedAt)}`}
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <TonalButton icon={ArrowLeftIcon} text="Powrót do listy" onClick={navigateToList} />
                <UpdateAlbumButton album={album} />
                <TonalButton
                    icon={deleteAlbumAction.icon}
                    text={deleteAlbumAction.label}
                    onClick={() => {
                        deleteAlbumAction.execute({
                            albumId: album.id,
                            albumTitle: album.title,
                        });
                    }}
                />
            </div>
            <SortableGrid
                items={images}
                itemIdKey={'id'}
                itemsKeys={images.map((image) => image.id)}
                onListSorted={handleReorderImages}
            >
                {images.map((image) => (
                    <SortableItem key={image.id} id={image.id}>
                        <SortableItem.Handle>
                            <AlbumImageCard
                                src={image.src}
                                alt={image.name}
                                isThumbnail={image.id === album.thumbnail.id}
                            />
                        </SortableItem.Handle>
                    </SortableItem>
                ))}
            </SortableGrid>
        </LayoutWithNavbar>
    );
}

