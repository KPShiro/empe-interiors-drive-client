import { cn } from '@utils/cn';
import { Loader2Icon, LucideIcon } from 'lucide-react';
import { To, useNavigate } from 'react-router';

type FilledButtonProps = React.ComponentProps<'button'> & {
    icon?: LucideIcon;
    text?: string;
    path?: To;
    loading?: boolean;
};

export const FilledButton = ({ icon: Icon, text, loading, path, ...props }: FilledButtonProps) => {
    const navigate = useNavigate();

    const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (loading || props.disabled) {
            return;
        }

        props.onClick?.(event);

        if (path) {
            void navigate(path);
        }
    };

    return (
        <button
            {...props}
            title={props.title ?? text}
            type={props.type ?? 'button'}
            disabled={loading || props.disabled}
            onClick={handleOnClick}
            className={cn(
                'group bg-primary disabled:bg-on-surface-0/4 relative inline-flex h-10 min-w-0 cursor-pointer items-center gap-2 overflow-clip rounded-sm px-4 disabled:cursor-default',
                Icon ? 'pr-5 pl-4' : 'px-5',
                props.className
            )}
        >
            {Icon ? (
                <Icon size={16} strokeWidth={2.5} className="stroke-on-primary shrink-0 grow-0" />
            ) : null}
            {text ? (
                <div className="text-on-primary group-disabled:text-on-surface-0/8 truncate text-sm font-semibold">
                    {text}
                </div>
            ) : null}
            {loading ? (
                <div className="absolute -inset-1 z-10 flex items-center justify-center">
                    <Loader2Icon
                        size={16}
                        strokeWidth={2.5}
                        className="stroke-on-surface-0/60 animate-spin"
                    />
                </div>
            ) : null}
            <div className="absolute -inset-1 z-0 bg-white opacity-0 group-hover:opacity-16 group-active:opacity-8 group-disabled:hidden"></div>
        </button>
    );
};
