import { GhostButton } from '@components/button/ghost-button';
import { Icon } from '@components/icon';
import { cn } from '@utils/cn';
import { formatFileSize } from '@utils/format-file-size';
import { GripVerticalIcon, XIcon } from 'lucide-react';
import { SortableItem } from '@components/sortable/sortable-item';
import { useMemo } from 'react';

type ImageInputListItemProps = Pick<React.ComponentProps<'div'>, 'className'> & {
    file: File;
    onRemove?: () => void;
    isDisabled?: boolean;
};

export const ImageInputListItem = ({
    file,
    onRemove,
    isDisabled,
    ...props
}: ImageInputListItemProps) => {
    const imgSrc = useMemo(() => URL.createObjectURL(file), [file]);
    const formattedFileSize = useMemo(() => formatFileSize(file.size), [file]);

    const handleOnRemove = () => {
        if (isDisabled) {
            return;
        }

        URL.revokeObjectURL(imgSrc);
        onRemove?.();
    };

    return (
        <SortableItem id={file.name}>
            <div
                className={cn(
                    'bg-surface-1 flex items-center rounded-sm border select-none',
                    isDisabled ? 'opacity-50' : 'hover:bg-surface-0',
                    props.className
                )}
            >
                <SortableItem.Handle disabled={isDisabled}>
                    <div
                        className={cn(
                            'flex min-w-0 flex-1 items-center gap-2 px-2',
                            isDisabled ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
                        )}
                    >
                        <Icon icon={GripVerticalIcon} className="text-on-surface-0-variant" />
                        <img
                            src={imgSrc}
                            alt={file.name}
                            className="pointer-events-none size-16 shrink-0 grow-0 object-cover select-none"
                        />
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5 pl-2">
                            <div className="text-on-surface-0 line-clamp-1 truncate text-sm">
                                {file.name}
                            </div>
                            <div className="text-on-surface-0-variant line-clamp-1 truncate text-xs">
                                Rozmiar: {formattedFileSize}
                            </div>
                        </div>
                    </div>
                </SortableItem.Handle>
                <div className="flex shrink-0 grow-0 items-center justify-center px-4 pr-2">
                    <GhostButton icon={XIcon} onClick={handleOnRemove} disabled={isDisabled} />
                </div>
            </div>
        </SortableItem>
    );
};
