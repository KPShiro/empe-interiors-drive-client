import { cn } from '@utils/cn';

type AlbumThumbnailProps = React.ComponentProps<'div'> & {
    src: string;
    alt: string;
};

export const AlbumThumbnail = ({ src, alt, ...props }: AlbumThumbnailProps) => {
    return (
        <div
            {...props}
            className={cn(
                'aspect-square h-16 overflow-clip rounded-md bg-current',
                props.className
            )}
        >
            <img src={`${src}?_=${alt}`} alt={alt} className="size-full object-cover" />
        </div>
    );
};
