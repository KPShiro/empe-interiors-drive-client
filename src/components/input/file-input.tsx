import { Icon } from '@components/icon';
import { cn } from '@utils/cn';
import { isFileTypeValid } from '@utils/is-file-type-valid';
import { PlusIcon } from 'lucide-react';
import { useRef } from 'react';

type FileInputError = 'FILE_SIZE' | 'FILE_TYPE';

type FileInputProps = React.ComponentProps<'input'> & {
    value?: File[];
    onValueChange?: (files: File[]) => void;
    onValueError?: (errors: FileInputError[]) => void;
};

export const FileInput = ({
    value,
    onValueChange,
    onValueError,
    className,
    ...props
}: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files) return;

        const validFiles: File[] = [];
        const errors: FileInputError[] = [];

        [...files].forEach((file) => {
            if (props.max && file.size > Number(props.max)) {
                errors.push('FILE_SIZE');
                return;
            }

            if (props.accept && !isFileTypeValid(file, props.accept)) {
                errors.push('FILE_TYPE');
                return;
            }

            validFiles.push(file);
        });

        if (errors.length > 0) {
            onValueError?.(errors);
        }

        if (validFiles.length > 0) {
            onValueChange?.(validFiles);
        }

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <>
            <input
                {...props}
                ref={inputRef}
                value={value}
                type="file"
                className="hidden"
                onChange={handleOnValueChanged}
            />
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className={cn(
                    'flex h-10 w-full cursor-pointer items-center justify-between rounded-md border px-3',
                    'focus-visible:outline-primary/15 focus-visible:border-primary focus-visible:outline-4',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                disabled={props.disabled}
            >
                <div className="text-sm">{props.placeholder ?? 'Dodaj pliki'}</div>
                <Icon icon={PlusIcon} />
            </button>
        </>
    );
};
