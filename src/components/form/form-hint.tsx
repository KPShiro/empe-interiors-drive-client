import { cn } from '@utils/cn';

type FormHintProps = Pick<React.ComponentProps<'div'>, 'className' | 'children'>;

export const FormHint = (props: FormHintProps) => {
    return <div {...props} className={cn('text-on-surface-0-variant text-xs', props.className)} />;
};
