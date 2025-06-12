import { UniqueIdentifier } from '@dnd-kit/core';
import { createContext } from 'react';

type SortableItemContext = {
    id: UniqueIdentifier;
};

export const SortableItemContext = createContext<SortableItemContext>({
    id: '',
});
