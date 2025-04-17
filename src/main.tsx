import * as Sentry from '@sentry/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.tsx';
import './sentry-init.ts';
import './styles/index.css';

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
        <App />
    </StrictMode>
);
