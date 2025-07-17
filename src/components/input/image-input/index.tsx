import { cn } from '@utils/cn';
import { useEffect, useMemo, useState } from 'react';
import { ImageInputListItem } from './list-item';
import { FileInput } from '@components/input/file-input';
import { SortableList } from '@components/sortable/sortable-list';
import { useToast } from '@components/toast/context';
import { formatFileSize } from '@utils/format-file-size';

type ImageInputProps = React.ComponentProps<'input'> & {
    value?: File[];
    onValueChange?: (files: File[]) => void;
};

export const ImageInput = ({ className, value, onValueChange, ...props }: ImageInputProps) => {
    const [files, setFiles] = useState<File[]>(value ?? []);
    const fileIds = useMemo(() => files.map((file) => file.name), [files]);
    const toast = useToast();

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

        let mergedFiles = [...files, ...newUniqueFiles];

        if (props.maxLength && props.maxLength < mergedFiles.length) {
            mergedFiles = [...mergedFiles].slice(0, props.maxLength);

            toast.show('danger', {
                title: 'Zbyt dużo plików',
                description: `Przekroczono maksymalną dozwoloną liczbę plików, która wynosi ${String(props.maxLength)}. Nadmiarowa ilość została pominięta.`,
            });
        }

        setFiles(mergedFiles);
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleValueError = () => {
        const description = props.max
            ? `Pliki, które przekraczają dozwolony rozmiar (${formatFileSize(Number(props.max))}), lub mają nieobsługiwany typ nie zostaną dodane do albumu.`
            : 'Pliki, które przekraczają dozwolony rozmiar, lub mają nieobsługiwany typ nie zostaną dodane do albumu.';

        toast.show('danger', {
            title: 'Pominięto niektóre pliki',
            description,
        });
    };

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <FileInput
                {...props}
                onValueError={handleValueError}
                onValueChange={handleValueChange}
                disabled={
                    props.disabled || (props.maxLength ? props.maxLength <= files.length : false)
                }
            />
            {files.length > 0 ? (
                <div className="bg-surface-0 flex max-h-80 flex-col gap-1 overflow-y-auto rounded-md border p-1">
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
                                isDisabled={props.disabled}
                            />
                        ))}
                    </SortableList>
                </div>
            ) : null}
        </div>
    );
};
