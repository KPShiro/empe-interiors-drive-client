import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '@utils/cn';
import { SelectScrollUpButton } from './scroll-up-button';
import { SelectScrollDownButton } from './scroll-down-button';

type SelectContentProps = RadixSelect.SelectContentProps;

export const SelectContent = ({ children, className, ...props }: SelectContentProps) => {
    return (
        <RadixSelect.Content
            {...props}
            position={props.position ?? 'popper'}
            sideOffset={props.sideOffset ?? 4}
            className={cn(
                'bg-surface-1 max-h-[min(var(--radix-select-content-available-height),_20rem)] max-w-[var(--radix-select-trigger-width)] rounded-md border shadow-md',
                className
            )}
        >
            <SelectScrollUpButton />
            <RadixSelect.Viewport className="py-2">{children}</RadixSelect.Viewport>
            <SelectScrollDownButton />
        </RadixSelect.Content>
    );
};
