import React, { useState } from 'react';
import cn from 'classnames';
import { IconButton, ConfirmationModal } from '~platform';
import { useCurrentBlock } from '~blocks';
import { taskToBlockPlan } from '~planning';
import { useTask, useTasks, type Task } from '../';

interface Props {
  task: Task
}

export const TaskItem = ({ task }: Props) => {
  const { id, title, completed } = task;
  const { selectedTask, setSelectedTask } = useTasks();
  const { updateBlockPlan } = useCurrentBlock();
  const { toggle, remove } = useTask(task);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const color = task.project?.color ?? 'gray-400';

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

  const handleSendTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await updateBlockPlan(taskToBlockPlan(task));
  };

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowRemoveConfirmation(true);
  };

  return (
    <>
      <div
        className={cn(
          `flex space-x-3 items-center relative p-2 rounded border group hover:border-${color}`,
          id === selectedTask?.id ? `border-${color} bg-${color}/25` : 'border-transparent'
        )}
        onClick={handleSelect}
      >
        <div className="w-4">
          {task.project && (
            <IconButton
              name="sendArrow"
              size={4}
              onClick={handleSendTask}
            />
          )}
          </div>

        <input
          type="checkbox"
          checked={isCompleted}
          onClick={handleToggle}
          onChange={() => {}}
          className="w-4 h-4"
        />

        <div className={cn(
          'ml-2',
          isCompleted && 'italic text-gray-400 line-through'
        )}>
          {title}
        </div>

        <IconButton
          name="trash"
          size={4}
          className="absolute right-2 top-2.5 hidden group-hover:block"
          onClick={handleRemove}
        />
      </div>

      <ConfirmationModal
        showModal={showRemoveConfirmation}
        setShowModal={setShowRemoveConfirmation}
        onConfirm={remove}
      />
    </>
  );
};
