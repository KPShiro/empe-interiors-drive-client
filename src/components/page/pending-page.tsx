import { Icon } from '@components/icon';
import { Loader2Icon } from 'lucide-react';

export const PendingPage = () => {
    return (
        <div className="flex h-dvh w-dvw items-center justify-center">
            <Icon icon={Loader2Icon} className="animate-spin" />
        </div>
    );
};
