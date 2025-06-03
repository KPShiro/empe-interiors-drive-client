import { RefObject, useEffect, useRef, useState } from 'react';
import { FileInputItem } from './file-input-item';
import { cn } from '@utils/cn';
import { Icon } from '@components/icon';
import { PlusIcon } from 'lucide-react';

type FileInputProps = {
    value?: File[];
    onValueChange?: (files: File[]) => void;
    ref?: RefObject<HTMLInputElement | null>;
} & Omit<React.ComponentProps<'input'>, 'value'>;

export const FileInput = ({ value, onValueChange, ...htmlInputProps }: FileInputProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        setFiles(value ?? []);
    }, [value]);

    useEffect(() => {
        onValueChange?.(files);
    }, [files, onValueChange]);

    const handleOnValueChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles) return;

        const newFiles = Array.from(selectedFiles);
        const uniqueFiles = newFiles.filter((newFile) => {
            return !files.some(
                (existingFile) =>
                    existingFile.name === newFile.name &&
                    existingFile.size === newFile.size &&
                    existingFile.type === newFile.type
            );
        });

        setFiles((prev) => [...prev, ...uniqueFiles]);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    return (
        <div className={cn('flex flex-col gap-4', htmlInputProps.className)}>
            <input
                {...htmlInputProps}
                ref={fileInputRef}
                type="file"
                onChange={handleOnValueChanged}
                className="hidden"
            />
            <div
                className="flex h-10 cursor-pointer justify-between items-center gap-3 rounded-md border px-3"
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="text-sm font-medium">
                    {htmlInputProps.placeholder ?? 'Add files'}
                </div>
                <Icon icon={PlusIcon} />
            </div>
            {files.length > 0 ? (
                <div className="bg-surface-0 flex flex-col gap-1 rounded-md border p-1">
                    {files.map((file, index) => (
                        <FileInputItem
                            key={index}
                            file={file}
                            onRemove={() => handleRemoveFile(index)}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};
