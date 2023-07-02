import React from 'react';
import { NoteEditor } from '~notes';
import { TaskLinks, type Task } from '../';

export const TaskInfo = ({ task }: { task?: Task }) => {
  return (
    <div className="p-4 bg-slate-700">
      {task && (
        <>
          <h2>{task.title}</h2>
          <TaskLinks task={task} />
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
