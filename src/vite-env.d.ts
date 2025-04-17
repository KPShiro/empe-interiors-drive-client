/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: 'development' | 'production';
    readonly VITE_TITLE: string;

    readonly VITE_SENTRY_DNS: string;
    readonly VITE_SENTRY_ORG: string;
    readonly VITE_SENTRY_PROJECT: string;
    readonly VITE_SENTRY_DEBUG: boolean;
    readonly VITE_SENTRY_REPLAY_MASK_ALL_INPUTS: boolean;
    readonly VITE_SENTRY_REPLAY_MASK_ALL_TEXTS: boolean;
    readonly VITE_SENTRY_REPLAY_BLOCK_ALL_MEDIA: boolean;
    readonly VITE_SENTRY_REPLAY_SESSIONS_SAMPLE_RATE: number;
    readonly VITE_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE: number;
    readonly VITE_SENTRY_TRACES_SAMPLE_RATE: number;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
