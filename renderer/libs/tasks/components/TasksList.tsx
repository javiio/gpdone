import React, { useState, useEffect } from 'react';
import { isToday, Disclosure } from '~platform';
import { type Project } from '~projects';
import { useTasks, TaskItem, type Task } from '../';

interface TasksListProps {
  project?: Project
}

export const TasksList: React.FC<TasksListProps> = ({ project }) => {
  const { tasks } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const _filtered = tasks
      .filter((task) =>
        (!project || task.projectId === project?.id) &&
        (!task.completed || isToday(task.completedAt))
      );
    setFilteredTasks(_filtered);
  }, [tasks]);

  return (
    <>
      <div className="flex-row space-y-0.5">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      <div className="mt-4 mb-12">
        <Disclosure title="Completed">
          <div className="flex-row space-y-0.5">
            {tasks
              .filter((task) =>
                (!project || task.projectId === project?.id) &&
                (task.completed && !isToday(task.completedAt))
              )
              .map((task) => (
                <TaskItem key={task.id} task={task} />
              ))
            }
          </div>
        </Disclosure>
      </div>
    </>
  );
};
