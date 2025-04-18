import { HomePage } from '@components/page-home';
import { DefaultPageLayout } from '@components/page-layout/default-page-layout';
import { MinimalPageLayout } from '@components/page-layout/minimal-page-layout';
import { NotFoundPage } from '@components/page-not-found';
import { ProjectsPage } from '@components/page-projects';
import { createBrowserRouter, Navigate } from 'react-router';
import App from './app';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                Component: DefaultPageLayout,
                children: [{ index: true, Component: HomePage }],
            },
            {
                Component: MinimalPageLayout,
                children: [
                    { path: 'projects', Component: ProjectsPage },
                    { path: 'not-found', Component: NotFoundPage },
                ],
            },
            {
                path: '*',
                element: <Navigate to="/not-found" />,
            },
        ],
    },
]);
