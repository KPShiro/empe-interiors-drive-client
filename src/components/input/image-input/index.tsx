import { cn } from '@utils/cn';
import { useEffect, useMemo, useState } from 'react';
import { ImageInputListItem } from './list-item';
import { FileInput } from '@components/input/file-input';
import { SortableList } from '@components/sortable/sortable-list';

type ImageInputProps = React.ComponentProps<'input'> & {
    value?: File[];
    onValueChange?: (files: File[]) => void;
};

export const ImageInput = ({ className, value, onValueChange, ...props }: ImageInputProps) => {
    const [files, setFiles] = useState<File[]>(value ?? []);
    const fileIds = useMemo(() => files.map((file) => file.name), [files]);

    useEffect(() => {
        onValueChange?.(files);
    }, [files, onValueChange]);

    const handleValueChange = (newFiles: File[]) => {
        const newUniqueFiles = newFiles.filter((newFile) => {
            return !files.some(
                (existingFile) =>
                    existingFile.name === newFile.name &&
                    existingFile.size === newFile.size &&
                    existingFile.type === newFile.type
            );
        });

        const mergedFiles = [...files, ...newUniqueFiles];

        setFiles(mergedFiles);
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <FileInput {...props} onValueChange={handleValueChange} />
            {files.length > 0 ? (
                <div className="bg-surface-0 flex flex-col gap-1 rounded-md border p-1">
                    <SortableList
                        items={files}
                        itemIdKey={'name'}
                        itemsKeys={fileIds}
                        onListSorted={setFiles}
                    >
                        {files.map((file, index) => (
                            <ImageInputListItem
                                key={file.name}
                                file={file}
                                onRemove={() => handleRemoveFile(index)}
                            />
                        ))}
                    </SortableList>
                </div>
            ) : null}
        </div>
    );
};
