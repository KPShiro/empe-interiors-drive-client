import React, { RefObject } from 'react';
import { cn } from '@utils/cn';
import { Icon } from '@components/icon';
import { LoaderIcon } from 'lucide-react';
import { ButtonSize } from './constats';
import { cva, VariantProps } from 'class-variance-authority';

export const ButtonVariants = ['primary', 'danger'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

const variants = cva<{
    size: Record<ButtonSize, string>;
    variant: Record<ButtonVariant, string>;
}>(
    [
        'group relative isolate flex w-fit items-center justify-center rounded-md cursor-pointer overflow-clip',
        'disabled:cursor-default disabled:bg-on-surface-0/10 disabled:text-on-surface-0/30',
    ],
    {
        variants: {
            size: {
                md: 'h-10 text-sm rounded-md',
                sm: 'h-8 text-xs rounded-sm',
                xs: 'h-7 text-xs rounded-sm',
            },
            variant: {
                primary: 'text-primary',
                danger: 'text-danger',
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

export const TonalButton = (props: TonalButtonProps) => {
    const contentLayoutClassName: Record<string, string> = {
        xs: 'gap-1 pr-3 pl-2',
        sm: 'gap-1 pr-4 pl-3',
        md: 'gap-2 pr-5 pl-4',
    };

    const iconSize: Record<string, React.ComponentProps<typeof Icon>['size']> = {
        xs: 'xs',
        sm: 'xs',
        md: 'md',
    };

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (props.disabled || props.loading) {
            return;
        }

        props.onClick?.(e);
    };

    return (
        <button
            {...props}
            type={props.type ?? 'button'}
            title={props.title ?? props.text}
            disabled={props.disabled || props.loading}
            onClick={handleOnClick}
            className={cn(
                variants({
                    size: props.size,
                    variant: props.variant,
                    className: props.className,
                }),
                props.icon && props.text && contentLayoutClassName[props.size ?? 'md'],
                props.icon && !props.text && 'aspect-square',
                !props.icon && props.text && 'px-5',
                props.className
            )}
        >
            {props.icon ? (
                <Icon
                    icon={props.icon}
                    size={iconSize[props.size ?? 'md']}
                    className={cn(props.loading && 'opacity-0')}
                />
            ) : null}
            {props.text ? (
                <span className={cn('truncate font-medium', props.loading && 'opacity-0')}>
                    {props.text}
                </span>
            ) : null}
            {props.loading ? (
                <Icon
                    icon={LoaderIcon}
                    size={iconSize[props.size ?? 'md']}
                    className="absolute top-1/2 left-1/2 z-1 -translate-x-1/2 -translate-y-1/2 animate-spin"
                />
            ) : null}
            {!props.disabled && !props.loading ? (
                <div className="bg-current/10 group-hover:bg-current/15 group-active:bg-current/10 absolute inset-0 -z-1"></div>
            ) : null}
        </button>
    );
};
