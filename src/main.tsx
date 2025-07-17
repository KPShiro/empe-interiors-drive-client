import * as Sentry from '@sentry/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './config/sentry.config.ts';
import './styles/index.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen.ts';
import { ToastProvider } from '@components/toast/provider.tsx';
import { PendingPage } from '@components/page/pending-page.tsx';
import { ErrorPage } from '@components/page/error-page.tsx';

const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPendingMs: 250,
    defaultPendingMinMs: 500,
    defaultPendingComponent: PendingPage,
    defaultErrorComponent: ErrorPage,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('root element is missing!');
}

const root = createRoot(rootElement, {
    onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
        console.warn('Uncaught error:', error, errorInfo.componentStack);
    }),
    onCaughtError: Sentry.reactErrorHandler(),
    onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <RouterProvider router={router} />
            </ToastProvider>
        </QueryClientProvider>
    </StrictMode>
);
