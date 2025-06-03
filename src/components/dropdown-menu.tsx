import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@utils/cn';
import React from 'react';
import { Icon } from '@components/icon';

const DropdownMenuTrigger = RadixDropdownMenu.Trigger;
const DropdownMenuPortal = RadixDropdownMenu.Portal;

const DropdownMenuContent = (props: React.ComponentProps<typeof RadixDropdownMenu.Content>) => {
    return (
        <RadixDropdownMenu.Content
            {...props}
            className={cn('bg-surface-1 w-40 rounded-md py-2 shadow-xl', props.className)}
        />
    );
};

const DropdownMenuLabel = RadixDropdownMenu.Label;
const DropdownMenuGroup = RadixDropdownMenu.Group;
const DropdownMenuRadioGroup = RadixDropdownMenu.RadioGroup;

type DropdownMenuItemProps = Omit<
    React.ComponentProps<typeof RadixDropdownMenu.Item>,
    'children'
> & {
    label: string;
    icon?: React.ComponentProps<typeof Icon>['icon'];
};

const DropdownMenuItem = ({ label, icon, ...props }: DropdownMenuItemProps) => {
    return (
        <RadixDropdownMenu.Item
            {...props}
            className={cn(
                'flex h-10 cursor-pointer items-center gap-1 px-3 hover:bg-current/10 hover:outline-none disabled:cursor-default',
                props.className
            )}
        >
            {icon ? <Icon icon={icon} size="sm" className="mr-1.5 opacity-60" /> : null}
            <span className="line-clamp-1 flex-1 text-sm">{label}</span>
        </RadixDropdownMenu.Item>
    );
};

const DropdownMenuItemIndicator = RadixDropdownMenu.ItemIndicator;
const DropdownMenuCheckboxItem = RadixDropdownMenu.CheckboxItem;
const DropdownMenuRadioItem = RadixDropdownMenu.RadioItem;
const DropdownMenuSub = RadixDropdownMenu.Sub;
const DropdownMenuSubTrigger = RadixDropdownMenu.SubTrigger;
const DropdownMenuSubContent = RadixDropdownMenu.SubContent;
const DropdownMenuSeparator = RadixDropdownMenu.Separator;
const DropdownMenuArrow = RadixDropdownMenu.Arrow;

export const DropdownMenu = (props: React.ComponentProps<typeof RadixDropdownMenu.Root>) => {
    return <RadixDropdownMenu.Root {...props} />;
};

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Portal = DropdownMenuPortal;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.Group = DropdownMenuGroup;
DropdownMenu.RadioGroup = DropdownMenuRadioGroup;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.ItemIndicator = DropdownMenuItemIndicator;
DropdownMenu.CheckboxItem = DropdownMenuCheckboxItem;
DropdownMenu.RadioItem = DropdownMenuRadioItem;
DropdownMenu.Sub = DropdownMenuSub;
DropdownMenu.SubTrigger = DropdownMenuSubTrigger;
DropdownMenu.SubContent = DropdownMenuSubContent;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Arrow = DropdownMenuArrow;
