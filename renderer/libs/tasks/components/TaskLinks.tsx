import React, { useState } from 'react';
import { shell } from 'electron';
import { Icon, IconButton } from '~platform';
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
        <Icon name="link" size={4} className="-mt-0.5" />
        {task.links?.map((link: TaskLink, i: number) => (
          <>
            {editMode
              ? <div className="bg-slate-900 rounded pl-2 pr-1 text-sm flex items-center space-x-1">
                  <span>{link.title}</span>
                  <IconButton
                    name="x"
                    size={4}
                    onClick={async () => { await handleClickRemove(i); }}
                  />
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
        <IconButton
          name={editMode ? 'x' : 'pencil'}
          size={4}
          onClick={handleToggleEditMode}
        />
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
          <IconButton name="plus" onClick={handleClickAdd} />
        </div>
      )}
    </div>
  );
};
