/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: 'development' | 'production';
    readonly VITE_TITLE: string;
    readonly VITE_API_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
