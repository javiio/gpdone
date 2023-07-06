import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { type Project } from '~projects';
import { useTasks } from '../';

interface TaskFormProps {
  project?: Project
}

export const TaskForm: React.FC<TaskFormProps> = ({ project }) => {
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') return;
    setTitle('');
    await addTask({ title, project });
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 group">
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="New task..."
        className="bg-slate-950 px-4 py-2 w-64 focus:flex-1 focus:outline rounded-md transition-all"
      />
      <button type="submit" className="hidden group-focus-within:block">
        <PlusIcon className="h-5 w-5" />
      </button>
    </form>
  );
};
