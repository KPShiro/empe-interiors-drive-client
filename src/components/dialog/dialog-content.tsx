import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@utils/cn';

type ContentProps = RadixDialog.DialogContentProps;

export const DialogContent = (props: ContentProps) => {
    return (
        <RadixDialog.Portal>
            <RadixDialog.Overlay className="fixed inset-0 grid place-items-center bg-black/25 backdrop-blur-sm">
                <RadixDialog.Content
                    {...props}
                    className={cn(
                        'bg-surface-1 isolate flex max-h-[90dvh] w-full max-w-[90dvw] flex-col overflow-clip overflow-y-auto rounded-md md:max-w-xl',
                        props.className
                    )}
                >
                    {props.children}
                </RadixDialog.Content>
            </RadixDialog.Overlay>
        </RadixDialog.Portal>
    );
};
