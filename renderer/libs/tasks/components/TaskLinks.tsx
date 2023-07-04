import React, { useState } from 'react';
import { shell } from 'electron';
import { LinkIcon, PlusIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { type Task, type TaskLink, useTask } from '../';

export const TaskLinks = ({ task }: { task: Task }) => {
  const [editMode, setEditMode] = useState(false);
  const [links, setLinks] = useState(task.links ?? []);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { updateLinks } = useTask(task);

  const handleToggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleClickAdd = async () => {
    const linksBuffer = [...links, { title, url }];
    setLinks(linksBuffer);
    setTitle('');
    setUrl('');
    setEditMode(false);
    await updateLinks(linksBuffer);
  };

  const handleClickRemove = async (i: number) => {
    const linksBuffer = [...links];
    linksBuffer.splice(i, 1);
    setLinks(linksBuffer);
    await updateLinks(linksBuffer);
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
        {task.links?.map((link: TaskLink, i: number) => (
          <>
            {editMode
              ? <div className="bg-slate-900 rounded pl-2 pr-1 text-sm flex items-center space-x-1">
                  <span>{link.title}</span>
                  <XMarkIcon className="h-3 w-3" onClick={async () => { await handleClickRemove(i); }} />
                </div>
              : <button
                key={link.title}
                onClick={() => { handleLinkClick(link); }}
                className="bg-slate-900 rounded px-2 text-sm"
              >
                {link.title}
              </button>
            }
          </>
        ))}
        {editMode
          ? <XMarkIcon className="h-4 w-4" onClick={handleToggleEditMode} />
          : <PencilIcon className="h-4 w-4" onClick={handleToggleEditMode} />
        }
      </div>

      {editMode && (
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
