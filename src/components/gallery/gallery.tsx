import * as RadixDialog from '@radix-ui/react-dialog';

export const Gallery = () => {
    return (
        <RadixDialog.Root>
            <RadixDialog.Portal>
                <RadixDialog.Overlay />
                <div className="fixed top-1/2 left-1/2 isolate z-50 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center p-4 border-8">
                    <RadixDialog.Content className="bg-surface-1 flex max-h-[80dvh] w-full flex-col overflow-clip rounded-md md:max-w-xl">
                        HELLO WORLD
                    </RadixDialog.Content>
                </div>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
};
