import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from 'react-beautiful-dnd';
import type { DateTime } from 'luxon';
import { Icon, IconButton } from '~platform';
import { ProjectPill, useProjects } from '~projects';
import { useCurrentBlock } from '~blocks';
import { usePlanning, BlockPlanForm, type BlockPlan } from '../';

export const PlanningList = ({ date }: { date?: DateTime }) => {
  const { planning, updatePlanning } = usePlanning(date);
  const { projects } = useProjects();
  const { updateBlockPlan } = useCurrentBlock();
  const [blockPlans, setBlockPlans] = useState(planning);
  const [blocksPerProject, setBlocksPerProject] = useState<Record<string, number>>();

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

  useEffect(() => {
    const _blocksPerProject: Record<string, number> = {};
    blockPlans.forEach((blockPlan) => {
      const count = (_blocksPerProject[blockPlan.projectId] ?? 0) + 1;
      _blocksPerProject[blockPlan.projectId] = count;
    });
    setBlocksPerProject(_blocksPerProject);
  }, [blockPlans]);

  const addBlock = async (blockPlan: BlockPlan) => {
    const newPlanning = [...blockPlans, blockPlan];
    setBlockPlans(newPlanning);
    await updatePlanning(newPlanning);
  };

  const handleAddBlock = async () => {
    const project = blockPlans.at(-1)?.project ?? projects[0];
    const blockPlan: BlockPlan = { project, projectId: project.id };
    await addBlock(blockPlan);
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

  const handleSendBlockPlan = async (blockPlan: BlockPlan) => {
    await updateBlockPlan(blockPlan);
  };

  const handleCopyBlockPlan = async (blockPlan: BlockPlan) => {
    await addBlock(blockPlan);
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
                      className="flex space-x-2 relative group border border-transparent hover:border-slate-500 rounded-md p-2"
                    >
                      <IconButton
                        name="sendArrow"
                        size={4}
                        onClick={async () => { await handleSendBlockPlan(blockPlan); }}
                      />
                      <IconButton
                        name="copy"
                        size={4}
                        onClick={async () => { await handleCopyBlockPlan(blockPlan); }}
                      />
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

      <div className="flex space-x-4">
        <IconButton
          name="plus"
          onClick={handleAddBlock}
          className="m-2"
        />
        <div className="flex space-x-3 opacity-70 text-sm items-center">
          <div>{`${blockPlans.length} items`}</div>
          {blocksPerProject && Object.keys(blocksPerProject).map((projectId) => (
            <div key={projectId} className="flex items-center">
              <ProjectPill projectId={projectId} />
              <Icon name="x" size={3} />
              <span>{blocksPerProject[projectId]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
