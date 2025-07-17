import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '@utils/cn';

type SelectItemProps = RadixSelect.SelectItemProps & {
    imageSrc?: string;
    label: string;
};

export const SelectItem = ({ label, imageSrc, ...props }: SelectItemProps) => {
    return (
        <RadixSelect.SelectItem
            {...props}
            className={cn(
                'flex cursor-default items-center px-4 outline-none select-none',
                'data-[state=checked]:bg-primary/5 data-[state=checked]:text-primary',
                'hover:not-data-[disabled]:not-data-[state=checked]:bg-current/5 focus-visible:bg-current/5',
                'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-25',
                imageSrc ? 'h-16 gap-1 pl-1' : 'h-10 gap-4',
                props.className
            )}
        >
            {imageSrc ? (
                <div className="aspect-square h-full rounded-md p-2">
                    <img src={imageSrc} alt={label} className="size-full rounded-sm object-cover" />
                </div>
            ) : null}
            <RadixSelect.ItemText asChild>
                <span className="line-clamp-1 truncate text-sm">{label}</span>
            </RadixSelect.ItemText>
        </RadixSelect.SelectItem>
    );
};
