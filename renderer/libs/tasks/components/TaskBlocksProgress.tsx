import React from 'react';
import { type Task } from '../';

export const TaskBlocksProgress = ({ task }: { task: Task }) => {
  const color = task.project?.color ?? 'gray-500';
  const pending = task.plannedBlocks - (task.blocksIds?.length ?? 0);
  let i = 0;

  return (
    <div className="flex space-x-[3px] items-center">
      {task.blocksIds?.map((_, i) => (
        <div key={i++} className="flex items-center">
          {i === task.plannedBlocks && (
            <div className="w-[1px] h-5 bg-red-500 mr-1" />
          )}
          <div className={`w-2.5 h-2.5 rounded-full bg-${color}`} />
        </div>
      ))}
      {pending > 0 && Array(pending).fill(0).map(() => (
        <div className={`w-2.5 h-2.5 rounded-full border border-${color}/75`} key={i++} />
      ))}
    </div>
  );
};
