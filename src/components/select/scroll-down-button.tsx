import { Icon } from '@components/icon';
import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '@utils/cn';
import { ChevronDownIcon } from 'lucide-react';

type SelectScrollDownButtonProps = RadixSelect.SelectScrollDownButtonProps;

export const SelectScrollDownButton = (props: SelectScrollDownButtonProps) => {
    return (
        <RadixSelect.ScrollDownButton
            {...props}
            className={cn('flex items-center justify-center py-1', props.className)}
        >
            <Icon icon={ChevronDownIcon} size="xs" />
        </RadixSelect.ScrollDownButton>
    );
};
