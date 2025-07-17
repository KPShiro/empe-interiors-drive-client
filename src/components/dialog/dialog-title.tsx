import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@utils/cn';

export const DialogTitle = (props: React.ComponentProps<typeof RadixDialog.Title>) => (
    <RadixDialog.Title
        {...props}
        className={cn('text-on-surface-0 max-w-prose text-lg font-semibold', props.className)}
    />
);
