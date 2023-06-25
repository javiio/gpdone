import React, { useState } from 'react';
import { type Project } from '~projects';
import { useTasks } from '../';

interface TasksListProps {
  project?: Project
}

export const TasksList: React.FC<TasksListProps> = ({ project }) => {
  const { tasks } = useTasks();

  return (
    <ul>
      {tasks?.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
};
