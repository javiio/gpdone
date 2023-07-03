import React, { useState } from 'react';
import { type Project } from '~projects';
import { useTasks } from '../';

interface TaskFormProps {
  project?: Project
}

export const TaskForm: React.FC<TaskFormProps> = ({ project }) => {
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.trim());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '') return;

    await addTask({ title, project });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Task..."
        className="bg-slate-950 px-4 py-2 flex-1"
      />
      <button type="submit">Add</button>
    </form>
  );
};
