import React, { useEffect, useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { DragDropContext, Droppable, Draggable, type DropResult } from 'react-beautiful-dnd';
import type { DateTime } from 'luxon';
import { useProjects } from '~projects';
import { usePlanning, BlockPlanForm, type BlockPlan } from '../';

export const PlanningList = ({ date }: { date?: DateTime }) => {
  const { planning, updatePlanning } = usePlanning(date);
  const { projects } = useProjects();
  const [blockPlans, setBlockPlans] = useState(planning);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(blockPlans);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setBlockPlans(reorderedItems);
    await updatePlanning(reorderedItems);
  };

  useEffect(() => {
    setBlockPlans(planning);
  }, [planning]);

  const handleAddBlock = async () => {
    const project = projects[0];
    const newPlanning: BlockPlan[] = [...blockPlans, { project, projectId: project.id }];
    setBlockPlans(newPlanning);
    await updatePlanning(newPlanning);
  };

  const handleOnChange = async (blockPlan: BlockPlan, i: number) => {
    const newPlanning: BlockPlan[] = [...blockPlans];
    newPlanning[i] = blockPlan;
    setBlockPlans(newPlanning);
    await updatePlanning(newPlanning);
  };

  const handleOnRemove = async (i: number) => {
    const newPlanning: BlockPlan[] = [...blockPlans];
    newPlanning.splice(i, 1);
    setBlockPlans(newPlanning);
    await updatePlanning(newPlanning);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blockPlans">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex-row space-y-0"
            >
              {blockPlans.map((blockPlan, i) => (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative group border border-transparent hover:border-slate-500 rounded-md py-2 px-2"
                    >
                      <BlockPlanForm
                        value={blockPlan}
                        onChange={async (p: BlockPlan) => { await handleOnChange(p, i); }}
                      />
                      <button
                        onClick={async () => { await handleOnRemove(i); }}
                        className="absolute inset-y-0 right-2 hidden group-hover:block"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
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
