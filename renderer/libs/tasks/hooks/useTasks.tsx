import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useCollection, addDoc } from '~platform';
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

  const addTask = async ({ title, project }) => {
    const task = {
      title,
      projectId: project?.id ?? '',
      completed: false,
      createdAt: Timestamp.now(),
    };
    await addDoc(task, 'tasks');
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
  };
};
