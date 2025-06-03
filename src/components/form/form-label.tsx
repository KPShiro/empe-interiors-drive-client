import { cn } from '@utils/cn';

type FormLabelProps = React.ComponentProps<'label'>;

export const FormLabel = (props: FormLabelProps) => {
    return (
        <label
            {...props}
            className={cn('text-on-surface-0 text-xs font-medium', props.className)}
        />
    );
};
