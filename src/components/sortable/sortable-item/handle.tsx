import { useSortable } from '@dnd-kit/sortable';
import { Slot } from '@radix-ui/react-slot';
import { SortableItemContext } from './context';
import { useContext } from 'react';

type SortableItemHandleProps = Pick<React.ComponentProps<'div'>, 'children'>;

export const SortableItemHandle = (props: SortableItemHandleProps) => {
    const context = useContext(SortableItemContext);

    const { attributes, listeners } = useSortable({
        id: context.id,
    });

    return <Slot {...props} {...attributes} {...listeners} />;
};
