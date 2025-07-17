import { createContext, useContext } from 'react';
import { ToastData } from '.';

export type Toast = ToastData & {
    id: string;
};

export type ShowToastOptions = Omit<ToastData, 'variant'> & {
    id?: Toast['id'];
};

type ToastContext = {
    show: (variant: ToastData['variant'], options: ShowToastOptions) => Toast['id'];
    dismiss: (id: Toast['id']) => void;
    toasts: Toast[];
};

export const ToastContext = createContext<ToastContext | null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
};
