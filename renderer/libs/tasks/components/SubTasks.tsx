import React, { useState } from 'react';
import cn from 'classnames';
import { useTask, type Task } from '../';

export const SubTasks = ({ task }: { task: Task }) => {
  const [title, setTitle] = useState('');
  const [subtasks, setSubtasks] = useState(task.subtasks ?? []);
  const { updateSubtasks } = useTask(task);

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
    await updateSubtasks(buff);
    setTitle('');
  };

  return (
    <div>
      <h3>Subtasks</h3>
      {subtasks.map((subtask, i) => (
        <div className='ml-4'>
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
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex space-x-4 mt-4">
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Task..."
          className="bg-slate-950 px-2 py-0.5 max-w[128px]"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
