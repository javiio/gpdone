import React from 'react';
import { NoteEditor } from '~notes';
import { TaskLinks, type Task } from '../';
import { SubTasks } from './SubTasks';

export const TaskInfo = ({ task }: { task?: Task }) => {
  return (
    <div className="p-4 bg-slate-700">
      {task && (
        <>
          <h2>{task.title}</h2>
          <TaskLinks task={task} />
          <NoteEditor noteId={`task-${task.id}`} />
          <SubTasks task={task} />
        </>
      )}
    </div>
  );
};
