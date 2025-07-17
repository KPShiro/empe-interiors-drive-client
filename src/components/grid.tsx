import { cn } from '@utils/cn';

type GridProps = Pick<React.ComponentProps<'div'>, 'children' | 'className'>;

export const Grid = (props: GridProps) => {
    return (
        <div
            className={cn(
                'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
                props.className
            )}
        >
            {props.children}
        </div>
    );
};
