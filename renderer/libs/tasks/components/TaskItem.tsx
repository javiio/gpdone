import React, { useState } from 'react';
import cn from 'classnames';
import { useTask, type Task } from '../';

interface Props {
  task: Task
}

export const TaskItem = ({ task }: Props) => {
  const { title, completed } = task;
  const { toggle } = useTask(task);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleToggle = async () => {
    setIsCompleted((prev) => !prev);
    await toggle();
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
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
