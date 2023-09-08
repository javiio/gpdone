import React, { useState, useEffect } from 'react';
import { NoteEditor } from '~notes';
import {
  useTask,
  TaskLinks,
  PlannedPicker,
  SubTasks,
  type Task,
  TaskBlocksProgress,
  TaskActionsMenu,
} from '../';
import { NumberSelector } from '~platform';

export const TaskInfo = ({ task }: { task: Task }) => {
  const [plannedBlocks, setPlannedBlocks] = useState(0);
  const { updatePlannedBlocks } = useTask(task);

  useEffect(() => {
    setPlannedBlocks(task.plannedBlocks);
  }, [task]);

  const handleChangePlannedBlocks = async (value: number) => {
    setPlannedBlocks(value);
    await updatePlannedBlocks(value);
  };

  return (
    <div className="p-4 pt-8 relative">
      <div className="flex space-x-2">
        <h2 className="min-w-[128px]">{task.title}</h2>
        <div className="mt-1">
          <TaskActionsMenu task={task} />
        </div>
      </div>

      <div className="flex flex-col absolute top-0 right-2 items-end">
        <NumberSelector value={plannedBlocks} setValue={handleChangePlannedBlocks} />
        <div className="m-1">
          <TaskBlocksProgress task={task} />
        </div>
      </div>
      <div className="flex justify-between">
        <TaskLinks task={task} />
        <PlannedPicker task={task} />
      </div>
      <NoteEditor noteId={`task-${task.id}`} />
      <SubTasks task={task} />
    </div>
  );
};
