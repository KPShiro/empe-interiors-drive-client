import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type SortableListProps<T> = Pick<React.ComponentProps<'div'>, 'children'> & {
    items: T[];
    itemIdKey: keyof T;
    itemsKeys: UniqueIdentifier[];
    onListSorted: (sortedItems: T[]) => void;
};

export function SortableList<T>({
    items,
    itemIdKey,
    itemsKeys,
    onListSorted,
    children,
}: SortableListProps<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = items.findIndex((item) => item[itemIdKey] === active.id);
            const newIndex = items.findIndex((item) => item[itemIdKey] === over?.id);

            const sortedItems = arrayMove(items, oldIndex, newIndex);
            onListSorted(sortedItems);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
        >
            <SortableContext items={itemsKeys} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    );
}
