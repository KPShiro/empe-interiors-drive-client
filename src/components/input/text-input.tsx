import { cn } from '@utils/cn';

type TextInputProps = React.ComponentProps<'input'>;

export const TextInput = (props: TextInputProps) => {
    return (
        <input
            {...props}
            type={props.type ?? 'text'}
            className={cn(
                'h-10 w-full rounded-md border px-3 text-sm',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'focus-visible:outline-primary/15 focus-visible:border-primary focus-visible:outline-4',
                props.className
            )}
        />
    );
};
