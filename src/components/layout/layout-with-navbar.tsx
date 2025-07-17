import { Navbar } from '@components/navbar';
import { PageContainer } from '@components/page/page-container';
import { cn } from '@utils/cn';

type LayoutWithNavbarProps = React.ComponentProps<'div'>;

export const LayoutWithNavbar = ({ className, children, ...props }: LayoutWithNavbarProps) => {
    return (
        <div {...props} className="isolate flex min-h-dvh flex-col">
            <Navbar className="sticky top-0 z-10" />
            <PageContainer className={cn('flex w-full flex-col gap-6 py-6', className)}>
                {children}
            </PageContainer>
        </div>
    );
};
