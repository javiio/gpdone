import React, { useState } from 'react';
import { Disclosure } from '~platform';
import { type Project } from '~projects';
import { useProjectTasks, TaskItem, PlannedFilter, type TaskPlanned } from '../';

interface TasksListProps {
  project?: Project
}

export const TasksList: React.FC<TasksListProps> = ({ project }) => {
  const { pending, completed } = useProjectTasks(project);
  const [plannedFilter, setPlannedFilter] = useState<TaskPlanned[]>([]);

  return (
    <div className="relative">
      <div className="absolute right-0 -top-12">
        <PlannedFilter selected={plannedFilter} setSelected={setPlannedFilter} />
      </div>

      <div className="flex-row space-y-0.5">
        {pending
          .filter((task) => plannedFilter.length > 0
            ? task.planned && plannedFilter.includes(task.planned)
            : true)
          .map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
      </div>

      {completed.length > 0 && (
        <div className="mt-4 mb-12">
          <Disclosure title="Completed">
            <div className="flex-row space-y-0.5">
              {completed.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </Disclosure>
        </div>
      )}
    </div>
  );
};
