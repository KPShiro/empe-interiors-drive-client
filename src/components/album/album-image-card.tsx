import { Icon } from '@components/icon';
import { cn } from '@utils/cn';
import { GripIcon, WallpaperIcon } from 'lucide-react';

type AlbumImageCardProps = React.ComponentProps<'div'> & {
    src: string;
    alt: string;
    isThumbnail: boolean;
};

export const AlbumImageCard = ({ src, alt, isThumbnail, ...props }: AlbumImageCardProps) => {
    return (
        <div
            {...props}
            className={cn(
                'group bg-on-surface-0/5 relative isolate cursor-grab overflow-clip rounded-md',
                'active:z-1 active:cursor-grabbing active:shadow-md',
                props.className
            )}
        >
            <div className="pointer-events-none absolute -inset-1 z-9 flex items-center justify-center opacity-0 backdrop-blur-xl group-hover:opacity-100">
                <Icon icon={GripIcon} className="text-on-surface-0" />
            </div>
            {isThumbnail ? (
                <div
                    title="Okładka albumu"
                    className="bg-surface-1 absolute top-0 left-2 z-10 flex size-10 items-center justify-center rounded-b-md"
                >
                    <Icon icon={WallpaperIcon} className="text-on-surface-1" />
                </div>
            ) : null}
            <img
                src={src}
                alt={alt}
                className="pointer-events-none aspect-square size-full object-cover text-xs"
            />
        </div>
    );
};
