import { cn } from '@utils/cn';

type PageContainerProps = Pick<React.ComponentProps<'div'>, 'children' | 'className'>;

export const PageContainer = ({ className, children }: PageContainerProps) => {
    return <div className={cn('mx-auto px-6 md:max-w-10/12 xl:max-w-8/12', className)}>{children}</div>;
};
