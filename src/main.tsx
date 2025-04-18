import * as Sentry from '@sentry/react';
import '@styles/index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import './sentry-init.ts';

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

root.render(<RouterProvider router={router} />);
