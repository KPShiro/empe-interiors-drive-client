import * as RadixToast from '@radix-ui/react-toast';
import { Icon } from '@components/icon';
import { XIcon } from 'lucide-react';
import { cva, VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { TastDurationMap, ToastVariant } from '@components/toast/constants';

const variants = cva<{
    variant: Record<ToastVariant, string>;
}>(
    [
        'bg-surface-1 text-on-surface-0 relative flex  flex-col rounded-md border border-l-4 shadow-md',
        'data-[state=open]:animate-toastSlideIn',
        'data-[state=closed]:animate-toastSlideOut',
        'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
        'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[all_200ms_ease-out]',
        'data-[swipe=end]:animate-toastSlideOut',
    ],
    {
        variants: {
            variant: {
                danger: 'border-l-danger',
                info: 'border-l-primary',
                success: 'border-l-success',
                warning: 'border-l-warning',
            },
        },
        defaultVariants: {
            variant: 'info',
        },
    }
);

export type ToastData = VariantProps<typeof variants> & {
    variant: ToastVariant;
    title: string;
    description?: string;
    duration?: number;
};

type ToastProps = Omit<RadixToast.ToastProps, 'duration'> &
    ToastData & {
        onOpened?: () => void;
        onClosed?: () => void;
    };

export const Toast = ({
    variant,
    title,
    description,
    duration,
    className,
    onOpened,
    onClosed,
    ...toastProps
}: ToastProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <RadixToast.Root
            {...toastProps}
            open={isOpen}
            onOpenChange={setIsOpen}
            onAnimationEnd={() => {
                if (isOpen) {
                    onOpened?.();
                } else {
                    onClosed?.();
                }
            }}
            duration={duration ?? TastDurationMap[variant]}
            className={variants({ variant, className })}
        >
            <div className="flex flex-col gap-1 p-4">
                <RadixToast.Title className="text-sm font-medium">{title}</RadixToast.Title>
                {description ? (
                    <RadixToast.Description className="text-xs text-current/60">
                        {description}
                    </RadixToast.Description>
                ) : null}
            </div>
            <RadixToast.Close asChild>
                <Icon
                    icon={XIcon}
                    className="absolute top-2 right-2 cursor-pointer opacity-25 hover:opacity-100"
                />
            </RadixToast.Close>
        </RadixToast.Root>
    );
};
