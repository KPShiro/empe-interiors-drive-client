import * as RadixDialog from '@radix-ui/react-dialog';
import { DialogContent } from './dialog-content';
import { DialogHeader } from './dialog-header';
import { DialogFooter } from './dialog-footer';
import { DialogContainer } from './dialog-container';

export const Dialog = (props: React.ComponentProps<typeof RadixDialog.Root>) => {
    return <RadixDialog.Root {...props} />;
};

Dialog.Trigger = RadixDialog.Trigger;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Content = DialogContent;
Dialog.Container = DialogContainer;
