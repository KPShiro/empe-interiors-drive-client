import { Skeleton } from '@components/skeleton';

export const AlbumCardSkeleton = () => {
    return (
        <div className="flex animate-pulse flex-col gap-3">
            <Skeleton className="aspect-square size-full" />
            <div className="flex flex-col gap-0.5 text-left">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
            </div>
        </div>
    );
};
