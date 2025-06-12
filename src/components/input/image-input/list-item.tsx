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
};

export const ImageInputListItem = ({ file, onRemove, ...props }: ImageInputListItemProps) => {
    const imgSrc = useMemo(() => URL.createObjectURL(file), [file]);
    const fileSizeString = useMemo(() => formatFileSize(file.size), [file]);

    return (
        <SortableItem id={file.name}>
            <div
                className={cn(
                    'bg-surface-1 hover:bg-surface-0 flex rounded-sm border select-none',
                    props.className
                )}
            >
                <SortableItem.Handle>
                    <div className="flex flex-1 cursor-grab items-center gap-2 px-2 active:cursor-grabbing">
                        <Icon icon={GripVerticalIcon} className="text-on-surface-0-variant" />
                        <img
                            src={imgSrc}
                            alt={file.name}
                            className="pointer-events-none size-16 shrink-0 grow-0 object-cover select-none"
                        />
                        <div className="ml-2 flex min-w-0 flex-1 flex-col gap-0.5">
                            <div className="text-on-surface-0 line-clamp-1 truncate text-sm">
                                {file.name}
                            </div>
                            <div className="text-on-surface-0-variant line-clamp-1 truncate text-xs">
                                Rozmiar: {fileSizeString}
                            </div>
                        </div>
                    </div>
                </SortableItem.Handle>
                <div className="flex items-center justify-center px-4">
                    <GhostButton icon={XIcon} onClick={onRemove} />
                </div>
            </div>
        </SortableItem>
    );
};
