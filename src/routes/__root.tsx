import { PageContainer } from '@components/page/page-container';
import { Navbar } from '@components/navbar';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: PageLayout,
});

function PageLayout() {
    return (
        <div className="isolate flex h-dvh flex-col">
            <Navbar className="sticky top-0 z-10" />
            <PageContainer className="flex w-full flex-col gap-6 py-6">
                <Outlet />
            </PageContainer>
        </div>
    );
}
