import * as Sentry from '@sentry/react';

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DNS,
    debug: import.meta.env.VITE_SENTRY_DEBUG,
    environment: import.meta.env.VITE_ENV,
    sendDefaultPii: true,
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
            maskAllInputs: import.meta.env.VITE_SENTRY_REPLAY_MASK_ALL_INPUTS,
            maskAllText: import.meta.env.VITE_SENTRY_REPLAY_MASK_ALL_TEXTS,
            blockAllMedia: import.meta.env.VITE_SENTRY_REPLAY_BLOCK_ALL_MEDIA,
        }),
    ],

    // Tracing
    tracesSampleRate: import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE,

    // Session Replay
    replaysSessionSampleRate: import.meta.env.VITE_SENTRY_REPLAY_SESSIONS_SAMPLE_RATE,
    replaysOnErrorSampleRate: import.meta.env.VITE_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE,
});
