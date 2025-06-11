import * as RadixSelect from '@radix-ui/react-select';
import { SelectTrigger } from './trigger';
import { SelectItem } from './item';
import { SelectContent } from './content';
import { SelectSeparator } from './separator';

type SelectItem = {
    value: string;
    label: string;
    disabled?: boolean;
};

type SelectProps = RadixSelect.SelectProps &
    Pick<React.ComponentProps<typeof SelectTrigger>, 'placeholder'>;

export const Select = ({ children, placeholder, ...props }: SelectProps) => {
    return (
        <RadixSelect.Root {...props}>
            <SelectTrigger placeholder={placeholder} />
            <RadixSelect.Portal>
                <SelectContent>{children}</SelectContent>
            </RadixSelect.Portal>
        </RadixSelect.Root>
    );
};

Select.Item = SelectItem;
Select.Separator = SelectSeparator;
