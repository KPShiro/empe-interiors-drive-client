import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@utils/cn';

export const DialogDescription = (props: React.ComponentProps<typeof RadixDialog.Description>) => (
    <RadixDialog.Description
        {...props}
        className={cn('text-on-surface-0-variant max-w-prose text-sm', props.className)}
    />
);
