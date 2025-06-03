import { cn } from '@utils/cn';

type TextInputProps = React.ComponentProps<'input'>;

export const TextInput = (props: TextInputProps) => {
    return (
        <input
            {...props}
            type={props.type ?? 'text'}
            className={cn(
                'focus-visible:outline-primary/15 focus-visible:border-primary h-10 w-full rounded-md border px-3 text-sm focus-visible:outline-4',
                props.className
            )}
        />
    );
};
