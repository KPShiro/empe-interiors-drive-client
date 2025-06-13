import React, { RefObject } from 'react';
import { cn } from '@utils/cn';
import { Icon } from '@components/icon';
import { LoaderIcon } from 'lucide-react';
import {
    ButtonContentLayoutClassName,
    ButtonIconSize,
    ButtonSize,
    ButtonVariant,
} from './constats';
import { cva, VariantProps } from 'class-variance-authority';

const variants = cva<{
    size: Record<ButtonSize, string>;
    variant: Record<ButtonVariant, string>;
}>(
    [
        'group relative isolate flex w-fit items-center justify-center rounded-md cursor-pointer overflow-clip',
        'disabled:cursor-not-allowed disabled:bg-on-surface-0/5 disabled:text-on-surface-0/25',
    ],
    {
        variants: {
            size: {
                md: 'h-10 px-4 text-sm rounded-md',
                sm: 'h-8 px-4 text-xs rounded-sm',
                xs: 'h-7 px-3 text-xs rounded-sm',
            },
            variant: {
                danger: 'bg-danger/10 hover:bg-danger/15 active:bg-danger/25 text-danger',
                neutral:
                    'bg-on-surface-0/10 hover:bg-on-surface-0/15 active:bg-on-surface-0/20 text-on-surface-0',
                'neutral-inverted':
                    'bg-surface-0/10 hover:bg-surface-0/15 active:bg-surface-0/25 text-surface-0 disabled:bg-surface-0/5 disabled:text-surface-0/25',
                primary: 'bg-primary/10 hover:bg-primary/15 active:bg-primary/20 text-primary',
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'primary',
        },
    }
);

type TonalButtonProps = {
    text?: string;
    icon?: React.ComponentProps<typeof Icon>['icon'];
    loading?: boolean;
    ref?: RefObject<HTMLButtonElement | null>;
} & Omit<React.ComponentProps<'button'>, 'children'> &
    VariantProps<typeof variants>;

export const TonalButton = ({
    text,
    icon,
    loading,
    ref,
    variant,
    size,
    ...props
}: TonalButtonProps) => {
    const iconSize = ButtonIconSize[size ?? 'md'];

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (props.disabled || loading) {
            return;
        }

        props.onClick?.(e);
    };

    return (
        <button
            {...props}
            ref={ref}
            type={props.type ?? 'button'}
            title={props.title ?? text}
            disabled={props.disabled || loading}
            onClick={handleOnClick}
            className={cn(
                variants({ size, variant, className: props.className }),
                icon && text && ButtonContentLayoutClassName[size ?? 'md'],
                icon && !text && 'aspect-square p-0',
                props.className
            )}
        >
            {icon ? (
                <Icon icon={icon} size={iconSize} className={cn(loading && 'opacity-0')} />
            ) : null}
            {text ? (
                <span className={cn('truncate font-medium', loading && 'opacity-0')}>{text}</span>
            ) : null}
            {loading ? (
                <Icon
                    icon={LoaderIcon}
                    size={iconSize}
                    className="absolute top-1/2 left-1/2 z-1 -translate-x-1/2 -translate-y-1/2 animate-spin"
                />
            ) : null}
        </button>
    );
};
