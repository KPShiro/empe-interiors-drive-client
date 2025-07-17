export const ToastVariants = ['danger', 'info', 'success', 'warning'] as const;
export type ToastVariant = (typeof ToastVariants)[number];

export const TastDurationMap: Record<ToastVariant, number> = {
    danger: Infinity,
    info: 3_000,
    success: 3_000,
    warning: 3_000,
};
