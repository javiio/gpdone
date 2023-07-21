import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from 'react-beautiful-dnd';
import { IconButton } from '~platform';
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
                      <IconButton
                        name="x"
                        size="4"
                        onClick={async () => { await handleOnRemove(i); }}
                        className="absolute top-4 right-2 hidden group-hover:block"
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

      <IconButton name="plus" onClick={handleAddBlock} />
    </>
  );
};
