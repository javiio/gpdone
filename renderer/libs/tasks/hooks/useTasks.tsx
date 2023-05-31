import { useEffect, useState, useCallback } from 'react';
import { useCollection } from '~platform';
import type { Task } from '../';

export const useTasks = (projectId?: string) => {
  const [tasks, setTasks] = useState<Task[]>();
  const [data, isLoading, error] = useCollection('tasks');

  useEffect(() => {
    if (data) {
      const projectTasks = projectId
        ? data.docs
          .map((doc) => ({ ...doc.data() as Task, id: doc.id }))
          .filter((task) => task.projectId === projectId)
        : data.docs.map((doc) => ({ ...doc.data() as Task, id: doc.id }));

      setTasks(projectTasks);
    }
  }, [data, projectId]);

  const getTask = useCallback(
    (taskId?: string) => tasks?.find((task) => task.id === taskId),
    [tasks]
  );

  return {
    tasks,
    isLoading,
    error,
    getTask,
  };
};
