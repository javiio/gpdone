import { useState, useEffect } from 'react';
import { isToday } from '~platform';
import { type Project } from '~projects';
import { useTasks, type Task } from '../';

export const useProjectTasks = (project: Project | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pending, setPending] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<Task[]>([]);
  const { tasks: allTasks } = useTasks();

  useEffect(() => {
    const _tasks = allTasks
      .filter((task) => !project || task.projectId === project.id)
      .sort((a: Task, b: Task) => b.createdAt.seconds - a.createdAt.seconds);

    const _pending: Task[] = [];
    const _completed: Task[] = [];
    _tasks.forEach((task) => {
      if (!task.completed || isToday(task.completedAt)) {
        _pending.push(task);
      } else {
        _completed.push(task);
      }
    });
    setPending(_pending);
    setCompleted(_completed);
    setTasks(_tasks);
  }, [allTasks, project]);

  return {
    tasks,
    pending,
    completed,
  };
};
