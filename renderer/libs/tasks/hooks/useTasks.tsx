import React, {
  useEffect,
  useState,
  useContext,
  createContext,
} from 'react';
import { Timestamp, type FirestoreError } from 'firebase/firestore';
import { useCollection, addDoc } from '~platform';
import { useProjects } from '~projects';
import type { TaskData, Task } from '../';

interface TaskContext {
  tasks: Task[]
  isLoading: boolean
  error?: FirestoreError
  addTask: (object) => void
};

const tasksContext = createContext<TaskContext>({
  tasks: [],
  isLoading: false,
  addTask: (o) => undefined,
});

export const ProvideTasks = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [data, isLoading, error] = useCollection('tasks');
  const { getProject } = useProjects();

  useEffect(() => {
    if (data) {
      const projectTasks: Task[] = data.docs.map((doc) => {
        const taskData = doc.data() as TaskData;
        const project = getProject(taskData.projectId);

        return {
          ...taskData,
          project,
          id: doc.id,
        };
      });

      setTasks(projectTasks);
    }
  }, [data]);

  const addTask = async ({ title, project }) => {
    const task = {
      title,
      projectId: project?.id ?? '',
      completed: false,
      createdAt: Timestamp.now(),
    };
    await addDoc(task, 'tasks');
  };

  const value = {
    tasks,
    isLoading,
    error,
    addTask,
  };

  return (
    <tasksContext.Provider value={value}>{children}</tasksContext.Provider>
  );
};

export const useTasks = () => useContext(tasksContext);
