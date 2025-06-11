import { XIcon } from 'lucide-react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@utils/cn';
import { GhostButton } from './button/ghost-button';

const Overlay = () => {
    return <RadixDialog.Overlay className="fixed inset-0 bg-black/25 backdrop-blur-sm" />;
};

type ContainerProps = React.ComponentProps<typeof RadixDialog.Content>;

const Container = ({ className, ...props }: ContainerProps) => {
    return (
        <div className="fixed top-1/2 left-1/2 isolate flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center p-4">
            <RadixDialog.Content
                {...props}
                className={cn(
                    'bg-surface-1 flex max-h-[80dvh] w-full flex-col overflow-clip rounded-md md:max-w-xl',
                    className
                )}
            />
        </div>
    );
};

type TitleProps = React.ComponentProps<typeof RadixDialog.Title>;

const Title = ({ className, ...props }: TitleProps) => {
    return (
        <RadixDialog.Title
            {...props}
            className={cn('text-on-surface-0 max-w-prose text-lg font-semibold', className)}
        />
    );
};

type DescriptionProps = React.ComponentProps<typeof RadixDialog.Description>;

const Description = ({ className, ...props }: DescriptionProps) => {
    return (
        <RadixDialog.Description
            {...props}
            className={cn('text-on-surface-0-variant max-w-prose text-sm', className)}
        />
    );
};

type HeaderProps = React.ComponentProps<'div'>;

const Header = ({ children, className, ...props }: HeaderProps) => {
    return (
        <div {...props} className={cn('relative flex flex-col gap-1 border-b p-4', className)}>
            {children}
            <RadixDialog.Close asChild>
                <GhostButton icon={XIcon} size="sm" className="absolute right-4" />
            </RadixDialog.Close>
        </div>
    );
};

type FooterProps = React.ComponentProps<'div'>;

const Footer = ({ className, ...props }: FooterProps) => {
    return (
        <div {...props} className={cn('flex items-center justify-end border-t p-4', className)} />
    );
};

type ContentProps = React.ComponentProps<'div'>;

const Content = ({ className, ...props }: ContentProps) => {
    return (
        <div {...props} className={cn('flex-1 overflow-x-clip overflow-y-auto px-4', className)} />
    );
};

const Close = RadixDialog.Close;
const Portal = RadixDialog.Portal;
const Trigger = RadixDialog.Trigger;
const Root = RadixDialog.Root;

export {
    Overlay,
    Container,
    Title,
    Description,
    Header,
    Footer,
    Content,
    Close,
    Portal,
    Trigger,
    Root,
};
