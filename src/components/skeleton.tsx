import { cn } from '@utils/cn';

type SkeletonProps = Pick<React.ComponentProps<'div'>, 'className'>;

export const Skeleton = ({ className }: SkeletonProps) => {
    return <div className={cn('h-4 w-full animate-pulse rounded-sm bg-current/5', className)}></div>;
};
