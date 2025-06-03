import { cn } from '@utils/cn';
import { LucideProps } from 'lucide-react';
import { useMemo } from 'react';

export const IconSizes = ['xs', 'sm', 'md', 'lg'] as const;
export type IconSize = (typeof IconSizes)[number];

type IconProps = LucideProps & {
    icon: React.ElementType<LucideProps>;
    size?: IconSize | number;
};

export const Icon = ({ icon, size = 'md', className, ...props }: IconProps) => {
    const IconComponent = icon;

    const iconSize = useMemo(() => {
        if (typeof size === 'number') {
            return size;
        }

        switch (size) {
            case 'xs':
                return 12;
            case 'sm':
                return 14;
            case 'lg':
                return 24;
            case 'md':
            default:
                return 16;
        }
    }, [size]);

    return (
        <IconComponent
            {...props}
            size={iconSize}
            className={cn('flex-shrink-0 flex-grow-0', className)}
        />
    );
};
