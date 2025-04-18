import { FilledButton } from './button/filled-button';

export const NotFoundPage = () => {
    return (
        <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-10 overflow-clip p-6">
            <div className="laptop:max-w-96 flex w-full max-w-80 flex-col items-center justify-center gap-2 text-center">
                <h1 className="text-xl font-bold">Nie znaleziono strony</h1>
                <p className="text-on-surface-0/60 text-sm">
                    Możliwe, że strona została usunięta, zmieniono jej nazwę lub jest tymczasowo
                    niedostępna.
                </p>
            </div>
            <FilledButton text="Powrót do strony głównej" path="/" />
        </div>
    );
};
