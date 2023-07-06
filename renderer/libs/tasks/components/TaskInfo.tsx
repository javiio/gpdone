import React, { useState, useEffect } from 'react';
import { NoteEditor } from '~notes';
import { useTask, TaskLinks, type Task, TaskBlocksProgress } from '../';
import { SubTasks } from './SubTasks';
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
    <div className="p-4 pt-8 bg-slate-700 relative">
      <h2>{task.title}</h2>
      <div className="flex flex-col absolute top-0 right-2 items-end">
        <NumberSelector value={plannedBlocks} setValue={handleChangePlannedBlocks} />
        <div className="m-0.5">
          <TaskBlocksProgress task={task} />
        </div>
      </div>
      <TaskLinks task={task} />
      <NoteEditor noteId={`task-${task.id}`} />
      <SubTasks task={task} />
    </div>
  );
};
