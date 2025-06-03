import * as Sentry from '@sentry/react';

Sentry.init({
    dsn: 'https://21db6234056abe947f4fc479e33d9de8@o4508167329153024.ingest.de.sentry.io/4509322944381008',
    environment: import.meta.env.VITE_ENV,
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
            maskAllInputs: false,
            blockAllMedia: false,
            maskAllText: false,
        }),
    ],

    // Tracing
    tracesSampleRate: 1.0,

    // Session Replay
    replaysSessionSampleRate: 0.0,
    replaysOnErrorSampleRate: 1.0,
});
