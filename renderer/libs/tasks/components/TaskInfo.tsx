import React from 'react';
import { NoteEditor } from '~notes';
import { type Task } from '../';

export const TaskInfo = ({ task }: { task?: Task }) => {
  return (
    <div className="p-4 bg-slate-700">
      {task && (
        <>
          <h2>{task.title}</h2>
          <NoteEditor noteId={`task-${task.id}`} />
          <h3>Subtasks</h3>
          {task.subtasks?.map((subtask, i) => (
            <div key={i}>
              <span>{subtask.title}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
