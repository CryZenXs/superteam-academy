import * as Sentry from "@sentry/nextjs";
import posthog from 'posthog-js';

export const initAnalytics = () => {
    if (typeof window !== 'undefined') {
        // Sentry Initialization
        Sentry.init({
            dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "https://examplePublicKey@o0.ingest.sentry.io/0",
            integrations: [
                Sentry.browserTracingIntegration(),
                Sentry.replayIntegration(),
            ],
            tracesSampleRate: 1.0,
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,
        });

        // PostHog Initialization
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
                capture_pageview: true,
            });
        }
    }
};

export const trackEvent = (name: string, properties?: any) => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.capture(name, properties);
    }
};
