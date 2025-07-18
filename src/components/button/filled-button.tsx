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
        'group relative flex w-fit items-center justify-center rounded-md cursor-pointer overflow-clip',
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
                danger: 'bg-danger text-on-danger',
                neutral: 'bg-on-surface-1 text-surface-1',
                'neutral-inverted':
                    'bg-surface-1 text-on-surface-1 disabled:bg-surface-1/5 disabled:text-surface-1/25',
                primary: 'bg-primary text-on-primary',
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'primary',
        },
    }
);

type FilledButtonProps = {
    text?: string;
    icon?: React.ComponentProps<typeof Icon>['icon'];
    loading?: boolean;
    ref?: RefObject<HTMLButtonElement | null>;
} & Omit<React.ComponentProps<'button'>, 'children'> &
    VariantProps<typeof variants>;

export const FilledButton = ({
    text,
    icon,
    loading,
    ref,
    variant,
    size,
    ...props
}: FilledButtonProps) => {
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
            {!props.disabled && !loading ? (
                <div className="absolute inset-0 -z-1 group-hover:bg-current/20 group-active:bg-current/14"></div>
            ) : null}
        </button>
    );
};
