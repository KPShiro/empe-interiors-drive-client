import { Navbar } from '@components/navbar/navbar';
import { Outlet } from 'react-router';

export const DefaultPageLayout = () => {
    return (
        <div>
            <Navbar className="fixed top-0 right-0 left-0 z-10" />
            <Outlet />
        </div>
    );
};
