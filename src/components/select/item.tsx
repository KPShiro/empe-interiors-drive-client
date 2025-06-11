import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '@utils/cn';

type SelectItemProps = RadixSelect.SelectItemProps & {
    label: string;
};

export const SelectItem = ({ label, ...props }: SelectItemProps) => {
    return (
        <RadixSelect.SelectItem
            {...props}
            className={cn(
                'flex h-10 cursor-default items-center gap-4 px-4 outline-none select-none',
                'data-[state=checked]:bg-primary/5 data-[state=checked]:text-primary',
                'hover:not-data-[disabled]:not-data-[state=checked]:bg-current/5 focus-visible:bg-current/5',
                'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-25',
                props.className
            )}
        >
            <RadixSelect.ItemText asChild>
                <span className="line-clamp-1 truncate text-sm">{label}</span>
            </RadixSelect.ItemText>
        </RadixSelect.SelectItem>
    );
};
