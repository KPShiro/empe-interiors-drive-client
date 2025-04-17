import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.tsx';
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('root element is missing!');
}

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);
