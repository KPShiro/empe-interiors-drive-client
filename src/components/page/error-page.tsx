import { FilledButton } from '@components/button/filled-button';
import { useNavigate } from '@tanstack/react-router';

type ErrorPageProps = {
    title?: string;
    description?: string;
};

const DEFAULT_ERROR_TITLE = 'Coś poszło nie tak...';
const DEFAULT_ERROR_DESCRIPTION =
    'Spróbuj ponownie za krótką chwilę. Jeśli problem się powtarza, skontaktuj się z deweloperem.';

export const ErrorPage = (props: ErrorPageProps) => {
    const navigate = useNavigate();

    return (
        <div className="bg-danger/5 flex h-dvh w-dvw flex-col items-center justify-center gap-6">
            <div className="text-on-surface-0 flex max-w-sm flex-col gap-2 text-center">
                <div className="text-lg font-medium">{props.title ?? DEFAULT_ERROR_TITLE}</div>
                <div className="text-sm text-current/60">
                    {props.description ?? DEFAULT_ERROR_DESCRIPTION}
                </div>
            </div>
            <FilledButton text="Wróć na stronę główną" onClick={() => void navigate({ to: '/' })} />
        </div>
    );
};
