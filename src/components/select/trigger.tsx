import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '@utils/cn';
import { Icon } from '@components/icon';
import { ChevronDownIcon } from 'lucide-react';

type SelectTriggerProps = RadixSelect.SelectTriggerProps & {
    placeholder?: string;
};

export const SelectTrigger = (props: SelectTriggerProps) => {
    return (
        <RadixSelect.Trigger
            {...props}
            className={cn(
                'flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm',
                'focus-visible:outline-primary/15 focus-visible:border-primary focus-visible:outline-4',
                'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
                props.className
            )}
        >
            <RadixSelect.Value
                placeholder={
                    <div className="text-on-surface-0-variant">
                        {props.placeholder ?? 'Select item'}
                    </div>
                }
            />
            <RadixSelect.Icon asChild>
                <Icon icon={ChevronDownIcon} />
            </RadixSelect.Icon>
        </RadixSelect.Trigger>
    );
};
