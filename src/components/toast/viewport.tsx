import * as RadixToast from '@radix-ui/react-toast';
import { useToast } from './context';
import { Toast } from '.';

export const ToastViewport = () => {
    const { toasts, dismiss } = useToast();

    return (
        <RadixToast.ToastProvider swipeDirection="right">
            {toasts.map((toast) => (
                <Toast {...toast} key={toast.id} onClosed={() => dismiss(toast.id)} />
            ))}
            <RadixToast.Viewport className="fixed right-0 bottom-0 z-99999 flex w-full max-w-sm list-none flex-col gap-1 p-6 outline-none" />
        </RadixToast.ToastProvider>
    );
};
