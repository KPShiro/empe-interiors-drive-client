import { cn } from '@utils/cn';

type DialogFooterProps = Pick<React.ComponentProps<'div'>, 'children' | 'className'>;

export const DialogFooter = ({ children, className, ...props }: DialogFooterProps) => {
    return (
        <div
            {...props}
            className={cn('flex items-center justify-end gap-2 border-t p-4', className)}
        >
            {children}
        </div>
    );
};
