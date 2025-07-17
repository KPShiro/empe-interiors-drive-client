import { useCallback, useMemo, useState } from 'react';
import { ShowToastOptions, Toast, ToastContext } from './context';
import { v4 as uuidv4 } from 'uuid';
import { ToastViewport } from './viewport';

type ToastProviderProps = React.PropsWithChildren;

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((variant: Toast['variant'], options: ShowToastOptions) => {
        const id = options.id ?? uuidv4();

        setToasts((toasts) => [
            {
                id,
                variant,
                ...options,
            },
            ...toasts,
        ]);

        return id;
    }, []);

    const dismissToast = useCallback((id: Toast['id']) => {
        setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    }, []);

    const value = useMemo(
        () => ({
            show: showToast,
            dismiss: dismissToast,
            toasts,
        }),
        [showToast, dismissToast, toasts]
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastViewport />
        </ToastContext.Provider>
    );
};
