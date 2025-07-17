import { cn } from '@utils/cn';

type DialogContainerProps = Pick<React.ComponentProps<'div'>, 'children' | 'className'>;

export const DialogContainer = ({ children, className, ...props }: DialogContainerProps) => {
    return (
        <div {...props} className={cn('flex flex-col gap-4 p-4', className)}>
            {children}
        </div>
    );
};
