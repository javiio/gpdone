import React, { useState, useEffect } from 'react';
import { NoteEditor } from '~notes';
import { useTask, TaskLinks, type Task } from '../';
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
    <div className="p-4 bg-slate-700 relative">
      <h2>{task.title}</h2>
      <div className="flex space-x-2 absolute top-1 right-2 text-lg">
        <span>{task.blocksIds?.length ?? 0}</span>
        <span className="text-slate-400">/</span>
        <NumberSelector value={plannedBlocks} setValue={handleChangePlannedBlocks} />
      </div>
      <TaskLinks task={task} />
      <NoteEditor noteId={`task-${task.id}`} />
      <SubTasks task={task} />
    </div>
  );
};
