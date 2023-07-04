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
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Task..."
        className="bg-slate-950 px-4 py-2 flex-1 focus:outline rounded-md"
      />
      <button type="submit">
        <PlusIcon className="h-5 w-5" />
      </button>
    </form>
  );
};
