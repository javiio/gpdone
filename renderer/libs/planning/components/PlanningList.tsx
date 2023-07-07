import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { DragDropContext, Droppable, Draggable, type DropResult } from 'react-beautiful-dnd';
import type { DateTime } from 'luxon';
import { useProjects } from '~projects';
import { usePlanning, PlannedBlockSelect, type PlannedBlock } from '../';

export const PlanningList = ({ date }: { date?: DateTime }) => {
  const { planning, updatePlanning } = usePlanning(date);
  const { projects } = useProjects();
  const [plannedBlocks, setPlannedBlocks] = useState(planning);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(plannedBlocks);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setPlannedBlocks(reorderedItems);
    await updatePlanning(reorderedItems);
  };

  useEffect(() => {
    setPlannedBlocks(planning);
  }, [planning]);

  const handleAddBlock = async () => {
    const project = projects[0];
    const newPlanning: PlannedBlock[] = [...plannedBlocks, { project, projectId: project.id }];
    setPlannedBlocks(newPlanning);
    await updatePlanning(newPlanning);
  };

  const handleOnChange = async (plannedBlock: PlannedBlock, i: number) => {
    const newPlanning: PlannedBlock[] = [...plannedBlocks];
    newPlanning[i] = plannedBlock;
    setPlannedBlocks(newPlanning);
    await updatePlanning(newPlanning);
  };

  const handleOnRemove = async (i: number) => {
    const newPlanning: PlannedBlock[] = [...plannedBlocks];
    newPlanning.splice(i, 1);
    setPlannedBlocks(newPlanning);
    await updatePlanning(newPlanning);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="plannedBlocks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex-row space-y-2"
            >
              {plannedBlocks.map((plannedBlock, i) => (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PlannedBlockSelect
                        value={plannedBlock}
                        onChange={async (p: PlannedBlock) => { await handleOnChange(p, i); }}
                        onRemove={async () => { await handleOnRemove(i); }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={handleAddBlock}>
        <PlusIcon className="h-5 w-5" />
      </button>
    </>
  );
};
