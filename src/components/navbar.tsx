import { cn } from '@utils/cn';
import { CreateAlbumButton } from '@components/create-album/create-album-button';
import { PageContainer } from '@components/page/page-container';

type NavbarProps = Pick<React.ComponentProps<'div'>, 'className'>;

export const Navbar = ({ className }: NavbarProps) => {
    return (
        <div className={cn('bg-surface-1 border-b', className)}>
            <PageContainer className="flex h-16 items-center justify-between gap-4">
                <div className="flex gap-1.5 text-sm select-none">
                    <span className="text-on-surface-1 font-semibold">EMPE Interiors</span>
                    <span className="text-on-surface-1-variant">Albums</span>
                </div>
                <CreateAlbumButton text="Nowy Album" />
            </PageContainer>
        </div>
    );
};
