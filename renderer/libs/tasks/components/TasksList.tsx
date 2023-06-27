import React from 'react';
import { type Project } from '~projects';
import { useTasks, TaskItem } from '../';

interface TasksListProps {
  project?: Project
}

export const TasksList: React.FC<TasksListProps> = ({ project }) => {
  const { tasks } = useTasks();

  return (
    <div>
      {tasks
        .filter((task) => !project || task.projectId === project?.id)
        .map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
    </div>
  );
};
