import { Grid } from '@components/grid';
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
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';

type SortableGridProps<T> = Pick<React.ComponentProps<'div'>, 'children'> & {
    items: T[];
    itemIdKey: keyof T;
    itemsKeys: UniqueIdentifier[];
    onListSorted: (sortedItems: T[]) => void;
} & React.ComponentProps<typeof Grid>;

export function SortableGrid<T>({
    items,
    itemIdKey,
    itemsKeys,
    onListSorted,
    children,
    className,
}: SortableGridProps<T>) {
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
        <Grid className={className}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={itemsKeys} strategy={rectSortingStrategy}>
                    {children}
                </SortableContext>
            </DndContext>
        </Grid>
    );
}
