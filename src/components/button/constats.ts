import { Icon } from '@components/icon';

export const ButtonSizes = ['xs', 'sm', 'md'] as const;
export type ButtonSize = (typeof ButtonSizes)[number];

export const ButtonVariants = ['danger', 'neutral', 'neutral-inverted', 'primary'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

export const ButtonContentLayoutClassName: Record<ButtonSize, string> = {
    md: 'gap-1.5 pr-4 pl-3',
    sm: 'gap-1.5 pr-4 pl-3',
    xs: 'gap-1.5 pr-3 pl-2',
};

export const ButtonIconSize: Record<ButtonSize, React.ComponentProps<typeof Icon>['size']> = {
    md: 'md',
    sm: 'md',
    xs: 'sm',
};
