import React, { useState } from 'react';
import cn from 'classnames';
import { useTask, useTasks, type Task } from '../';

interface Props {
  task: Task
}

export const TaskItem = ({ task }: Props) => {
  const { id, title, completed } = task;
  const { selectedTask, setSelectedTask } = useTasks();
  const { toggle } = useTask(task);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleToggle = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsCompleted((prev) => !prev);
    await toggle();
  };

  const handleSelect = () => {
    if (id === selectedTask?.id) {
      setSelectedTask(undefined);
    } else {
      setSelectedTask(task);
    }
  };

  return (
    <div
      className={cn('relative px-4 py-2 border border-transparent hover:border-slate-600', {
        '!border-slate-100': id === selectedTask?.id,
      })}
      onClick={handleSelect}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        onClick={handleToggle}
        onChange={() => {}}
      />

      <span className={cn(
        'ml-4',
        isCompleted && 'italic text-gray-400 line-through'
      )}>
        {title}
      </span>
    </div>
  );
};
