import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '@utils/cn';

type SelectSeparatorProps = RadixSelect.SelectSeparatorProps;

export const SelectSeparator = (props: SelectSeparatorProps) => {
    return (
        <RadixSelect.Separator {...props} className={cn('bg-border my-2 h-px', props.className)} />
    );
};
