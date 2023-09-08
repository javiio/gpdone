import React, { useState, useEffect } from 'react';
import { NoteEditor } from '~notes';
import {
  useTask,
  TaskLinks,
  PlannedPicker,
  SubTasks,
  TaskBlocksProgress,
  TaskActionsMenu,
  type Task,
  type TaskPlanned,
} from '../';
import { NumberSelector } from '~platform';

export const TaskInfo = ({ task }: { task: Task }) => {
  const [plannedBlocks, setPlannedBlocks] = useState(0);
  const [planned, setPlanned] = useState<TaskPlanned | null>(null);
  const { updatePlannedBlocks, updatePlanned } = useTask(task);

  useEffect(() => {
    setPlannedBlocks(task.plannedBlocks);
    setPlanned(task.planned ?? null);
  }, [task]);

  const handleChangePlannedBlocks = async (value: number) => {
    setPlannedBlocks(value);
    await updatePlannedBlocks(value);
  };

  const handleChangePlanned = async (value: TaskPlanned | null) => {
    setPlanned(value);
    await updatePlanned(value);
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
        <PlannedPicker value={planned} setValue={handleChangePlanned} />
      </div>
      <NoteEditor noteId={`task-${task.id}`} />
      <SubTasks task={task} />
    </div>
  );
};
