import React from 'react';
import { Disclosure } from '~platform';
import { type Project } from '~projects';
import { useProjectTasks, TaskItem } from '../';

interface TasksListProps {
  project?: Project
}

export const TasksList: React.FC<TasksListProps> = ({ project }) => {
  const { pending, completed } = useProjectTasks(project);

  return (
    <>
      <div className="flex-row space-y-0.5">
        {pending.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      <div className="mt-4 mb-12">
        <Disclosure title="Completed">
          <div className="flex-row space-y-0.5">
            {completed.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </Disclosure>
      </div>
    </>
  );
};
