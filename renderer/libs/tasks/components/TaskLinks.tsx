import React, { useState } from 'react';
import { shell } from 'electron';
import { LinkIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { type Task, type TaskLink, useTask } from '../';

export const TaskLinks = ({ task }: { task: Task }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { addLink } = useTask(task);

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleClickAdd = async () => {
    await addLink({ title, url });
    setTitle('');
    setUrl('');
    setShowForm(false);
  };

  const handleLinkClick = (link: TaskLink) => {
    shell.openExternal(link.url)
      .catch((e) => {
        console.log('Error opening link', link, e);
      });
  };

  return (
    <div>
      <div className="flex space-x-2 items-center">
        <LinkIcon className="h-4 w-4 -mt-0.5" />
        {task.links?.map((link: TaskLink) => (
          <button
            key={link.title}
            onClick={() => { handleLinkClick(link); }}
            className="bg-slate-900 rounded px-2 text-sm"
          >
            {link.title}
          </button>
        ))}
        {showForm
          ? <XMarkIcon className="h-5 w-5" onClick={handleShowForm} />
          : <PlusIcon className="h-5 w-5" onClick={handleShowForm} />
        }
      </div>

      {showForm && (
        <div className="flex space-x-2 mt-2">
          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value); }}
            placeholder="Name..."
            className="bg-slate-950 px-2 py-1 w-32"
          />
          <input
            value={url}
            onChange={(e) => { setUrl(e.target.value); }}
            placeholder="URL..."
            className="bg-slate-950 px-2 py-1 flex-1"
          />
          <button onClick={handleClickAdd} className="w-6">
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};
