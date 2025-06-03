import { PageContainer } from '@components/page/page-container';
import { cn } from '@utils/cn';

type NavbarProps = Pick<React.ComponentProps<'div'>, 'className'>;

export const Navbar = ({ className }: NavbarProps) => {
    return (
        <div className={cn('bg-surface-1 border-b', className)}>
            <PageContainer className="flex h-14 items-center justify-between gap-4">
                <div className="flex gap-1.5 text-sm select-none">
                    <span className="text-on-surface-0 font-semibold">EMPE Interiors</span>
                    <span className="text-on-surface-0-variant">Albums</span>
                </div>
            </PageContainer>
        </div>
    );
};
