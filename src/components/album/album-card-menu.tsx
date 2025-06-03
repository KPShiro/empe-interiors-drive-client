import { GhostButton } from '@components/button/ghost-button';
import { DropdownMenu } from '@components/dropdown-menu';
import { useDeleteAlbumAction } from '@hooks/use-delete-album-action';
import { usePreviewAlbumAction } from '@hooks/use-preview-album-action';
import { EllipsisVerticalIcon } from 'lucide-react';

type AlbumCardMenuProps = {
    albumId: string;
};

export const AlbumCardMenu = (props: AlbumCardMenuProps) => {
    const deleteAlbumAction = useDeleteAlbumAction();
    const previewAlbumAction = usePreviewAlbumAction();

    return (
        <DropdownMenu>
            <DropdownMenu.Trigger asChild>
                <GhostButton
                    icon={EllipsisVerticalIcon}
                    variant="neutral-inverted"
                    className="backdrop-blur-md"
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content align="end" sideOffset={5}>
                    <DropdownMenu.Item
                        icon={previewAlbumAction.icon}
                        label={previewAlbumAction.label}
                        onClick={() => previewAlbumAction.execute(props.albumId)}
                    />
                    <DropdownMenu.Item
                        icon={deleteAlbumAction.icon}
                        label={deleteAlbumAction.label}
                        onClick={() => deleteAlbumAction.execute(props.albumId)}
                    />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu>
    );
};
