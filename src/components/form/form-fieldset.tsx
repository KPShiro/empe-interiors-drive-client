import { cn } from '@utils/cn';

type FormFieldsetProps = React.ComponentProps<'fieldset'>;

export const FormFieldset = (props: FormFieldsetProps) => {
    return <fieldset {...props} className={cn('flex min-w-0 flex-col gap-2', props.className)} />;
};
