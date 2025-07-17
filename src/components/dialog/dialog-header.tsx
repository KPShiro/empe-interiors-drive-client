import { cn } from '@utils/cn';
import { DialogTitle } from './dialog-title';
import { DialogDescription } from './dialog-description';

type DialogHeaderProps = Pick<React.ComponentProps<'div'>, 'className'> & {
    title: string;
    description?: string | undefined;
};

export const DialogHeader = (props: DialogHeaderProps) => {
    return (
        <div className={cn('relative flex flex-col gap-1 border-b p-4', props.className)}>
            <DialogTitle>{props.title}</DialogTitle>
            {props.description ? <DialogDescription>{props.description}</DialogDescription> : null}
        </div>
    );
};
