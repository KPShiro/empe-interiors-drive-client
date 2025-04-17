/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
            // Add more path aliases here, just remember to add them to the tsconfing as well...
        },
    },
    server: {
        host: true,
    },
});
