import { Icon } from '@components/icon';
import { formatDateTime } from '@utils/format-datetime';
import { ImageIcon } from 'lucide-react';
import { AlbumCardMenu } from './album-card-menu';

type AlbumCardProps = {
    id: string;
    title: string;
    createdAt: string;
    imagesCount: number;
    thumbnailSrc: string;
};

export const AlbumCard = (props: AlbumCardProps) => {
    return (
        <div className="flex flex-col gap-3 select-none">
            <div className="bg-on-surface-0/5 group/album relative isolate w-full overflow-clip rounded-md">
                <img
                    src={props.thumbnailSrc}
                    alt={props.title}
                    className="aspect-square size-full object-cover text-xs transition-transform duration-300 group-hover/album:scale-105"
                />
                <div className="pointer-events-none absolute bottom-2 left-2 z-10">
                    <div className="bg-surface-0/25 text-on-surface-0 flex items-center gap-2 rounded-sm px-2 py-1 text-sm font-medium backdrop-blur-md">
                        <Icon icon={ImageIcon} size="sm" /> {props.imagesCount}
                    </div>
                </div>
                <div className="absolute top-2 right-2 z-10">
                    <AlbumCardMenu albumId={props.id} albumTitle={props.title} />
                </div>
            </div>
            <div className="flex flex-col gap-0.5 text-left">
                <div title={props.title} className="text-md line-clamp-1 font-medium text-ellipsis">
                    {props.title}
                </div>
                <div className="text-on-surface-0-variant line-clamp-1 text-xs text-ellipsis">
                    {formatDateTime(props.createdAt)}
                </div>
            </div>
        </div>
    );
};
