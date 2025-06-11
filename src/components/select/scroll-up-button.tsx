import { Icon } from '@components/icon';
import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '@utils/cn';
import { ChevronUpIcon } from 'lucide-react';

type SelectScrollUpButtonProps = RadixSelect.SelectScrollUpButtonProps;

export const SelectScrollUpButton = (props: SelectScrollUpButtonProps) => {
    return (
        <RadixSelect.ScrollUpButton
            {...props}
            className={cn('flex items-center justify-center py-1', props.className)}
        >
            <Icon icon={ChevronUpIcon} size="xs" />
        </RadixSelect.ScrollUpButton>
    );
};
