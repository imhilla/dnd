import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import Draggable from './draggable';
import Droppable from './droppable';
import SortableItem from './sortableItem';

export default function index() {
  const [isDropped, setIsDropped] = useState(false);
  const [items, setItems] = useState([1, 2, 3]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );

  // function handleDragEnd(event) {
  //   if (event.over && event.over.id === 'droppable') {
  //     setIsDropped(true);
  //   }
  // }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    // <DndContext onDragEnd={handleDragEnd}>
    //   {!isDropped ? draggableMarkup : null}
    //   <Droppable>
    //     {isDropped ? draggableMarkup : 'Drop here'}
    //   </Droppable>
    // </DndContext>
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(id => <SortableItem key={id} id={id} />)}
      </SortableContext>
    </DndContext>
  )
}
