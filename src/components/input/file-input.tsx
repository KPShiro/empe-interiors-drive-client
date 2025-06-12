import { Icon } from '@components/icon';
import { cn } from '@utils/cn';
import { PlusIcon } from 'lucide-react';
import { useRef } from 'react';

type FileInputProps = React.ComponentProps<'input'> & {
    value?: File[];
    onValueChange?: (files: File[]) => void;
};

export const FileInput = ({ value, onValueChange, className, ...props }: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files) return;

        onValueChange?.([...files]);

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
                    'disabled:cursor-not-allowed disabled:opacity-25',
                    className
                )}
            >
                <div className="text-sm">{props.placeholder ?? 'Dodaj pliki'}</div>
                <Icon icon={PlusIcon} />
            </button>
        </>
    );
};
