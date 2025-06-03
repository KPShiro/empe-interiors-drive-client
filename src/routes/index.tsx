import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    loader: () => {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw redirect({ to: '/albums' });
    },
});

