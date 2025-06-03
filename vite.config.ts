/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [TanStackRouterVite({ target: 'react', autoCodeSplitting: true }), react()],
    test: {
        dir: 'src',
        environment: 'jsdom',
        exclude: ['**/node_modules/**', '**/dist/**', '**/public/**'],
        testTimeout: 10000,
        globals: true,
        setupFiles: './vitest.setup.ts',
    },
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@config': path.resolve(__dirname, './src/config'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@models': path.resolve(__dirname, './src/models'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@state': path.resolve(__dirname, './src/state'),
            // Add more path aliases here, just remember to add them to the tsconfing as well...
        },
    },
    server: {
        host: true,
    },
});
