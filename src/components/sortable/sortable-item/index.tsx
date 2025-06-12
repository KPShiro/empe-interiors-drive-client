import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slot } from '@radix-ui/react-slot';
import { SortableItemContext } from './context';
import { SortableItemHandle } from './handle';

type SortableItemProps = Omit<React.ComponentProps<typeof Slot>, 'id'> & {
    id: UniqueIdentifier;
};

export const SortableItem = ({ id, ...props }: SortableItemProps) => {
    const { setNodeRef, transform, transition } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
    };

    return (
        <SortableItemContext.Provider value={{ id }}>
            <Slot {...props} ref={setNodeRef} style={style} />
        </SortableItemContext.Provider>
    );
};

SortableItem.Handle = SortableItemHandle;
