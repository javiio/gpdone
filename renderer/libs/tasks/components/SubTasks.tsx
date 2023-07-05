import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTask, type Task } from '../';

export const SubTasks = ({ task }: { task: Task }) => {
  const [title, setTitle] = useState('');
  const [subtasks, setSubtasks] = useState(task.subtasks ?? []);
  const { updateSubtasks } = useTask(task);

  useEffect(() => {
    setSubtasks(task.subtasks ?? []);
  }, [task]);

  const handleToggle = async (i: number) => {
    const buff = [...subtasks];
    buff[i].completed = !buff[i].completed;
    setSubtasks(buff);
    await updateSubtasks(buff);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const buff = [...subtasks, { title, completed: false }];
    setSubtasks(buff);
    setTitle('');
    await updateSubtasks(buff);
  };

  const handleRemove = async (i: number) => {
    const buff = [...subtasks];
    buff.splice(i, 1);
    setSubtasks(buff);
    setTitle('');
    await updateSubtasks(buff);
  };

  return (
    <div>
      <h3>Subtasks</h3>
      {subtasks.map((subtask, i) => (
        <div
          key={i}
          className="px-4 py-0.5 border border-transparent hover:border-slate-200/50 relative group"
        >
          <input
            type="checkbox"
            checked={subtask.completed}
            onClick={async () => { await handleToggle(i); }}
            onChange={() => {}}
          />

          <span className={cn(
            'ml-4',
            subtask.completed && 'italic text-gray-400 line-through'
          )}>
            {subtask.title}
          </span>

          <XMarkIcon
            className="h-4 w-4 absolute right-2 top-[5px] hidden group-hover:block"
            onClick={async () => { await handleRemove(i); }}
          />
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex space-x-2 mt-2 ml-4">
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Task..."
          className="bg-slate-900 px-2 py-1 w-48 focus:flex-1 transition-all focus:outline rounded-md"
        />
        <button type="submit">
          <PlusIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};
