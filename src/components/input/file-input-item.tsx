import { GhostButton } from '@components/button/ghost-button';
import { Icon } from '@components/icon';
import { formatFileSize } from '@utils/format-file-size';
import { FileIcon, ImageIcon, TrashIcon, VideoIcon } from 'lucide-react';
import { useMemo } from 'react';

type FileInputItemProps = {
    file: File;
    onRemove: () => void;
};

const ICONS_MAP: Record<string, React.ComponentProps<typeof Icon>['icon']> = {
    image: ImageIcon,
    video: VideoIcon,
    file: FileIcon,
};

export const FileInputItem = (props: FileInputItemProps) => {
    const fileIcon = useMemo(() => {
        const fileType = props.file.type.split('/')[0];
        return ICONS_MAP[fileType] ?? ICONS_MAP['file'];
    }, [props.file.type]);

    const isImage = useMemo(() => {
        return props.file.type.startsWith('image/');
    }, [props.file.type]);

    const imagePreviewUrl = useMemo(() => {
        if (!isImage) return null;
        return URL.createObjectURL(props.file);
    }, [props.file, isImage]);

    return (
        <div className="bg-surface-1 hover:bg-surface-1/60 flex items-center gap-3 overflow-clip rounded-sm border pr-4">
            {imagePreviewUrl ? (
                <div className="bg-on-surface-0/5 aspect-square h-16 overflow-clip">
                    <img src={imagePreviewUrl} className="size-full object-cover" />
                </div>
            ) : (
                <div className="bg-on-surface-0/5 flex aspect-square h-16 items-center justify-center overflow-clip">
                    <Icon icon={fileIcon} size="lg" className="text-on-surface-0-variant" />
                </div>
            )}
            <div className="flex flex-1 flex-col gap-0.5">
                <div className="line-clamp-1 text-sm font-medium">{props.file.name}</div>
                <div className="text-on-surface-0/60 text-xs">
                    {formatFileSize(props.file.size)}
                </div>
            </div>
            <GhostButton size="sm" icon={TrashIcon} onClick={props.onRemove} />
        </div>
    );
};
