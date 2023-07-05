import React, {
  useEffect,
  useState,
  useContext,
  createContext,
} from 'react';
import { Timestamp, type FirestoreError } from 'firebase/firestore';
import { useCollection, addDoc, updateDoc } from '~platform';
import { useProjects } from '~projects';
import type { TaskData, Task } from '../';

interface TaskContext {
  tasks: Task[]
  selectedTask?: Task
  setSelectedTask: (Task) => void
  isLoading: boolean
  error?: FirestoreError
  addTask: (object) => Promise<void>
  addBlockToTask: (task: Task, blockId: string) => Promise<void>
};

const tasksContext = createContext<TaskContext>({
  tasks: [],
  isLoading: false,
  setSelectedTask: () => undefined,
  addTask: async () => {},
  addBlockToTask: async () => {},
});

export const ProvideTasks = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [data, isLoading, error] = useCollection('tasks');
  const { projects, getProject } = useProjects();

  useEffect(() => {
    if (data) {
      const allTasks: Task[] = data.docs.map((doc) => {
        const taskData = doc.data() as TaskData;
        const project = getProject(taskData.projectId);

        return {
          ...taskData,
          project,
          id: doc.id,
        };
      });

      setTasks(allTasks);
      if (selectedTask) {
        setSelectedTask(allTasks.find((t) => t.id === selectedTask.id));
      }
    }
  }, [data, projects]);

  const addTask = async ({ title, project }) => {
    const task: TaskData = {
      title,
      completed: false,
      projectId: project?.id ?? '',
      createdAt: Timestamp.now(),
      plannedBlocks: 1,
    };
    await addDoc(task, 'tasks');
  };

  const addBlockToTask = async (task: Task, blockId: string) => {
    const blocksIds = [...(task.blocksIds ?? []), blockId];
    await updateDoc({ blocksIds }, 'tasks', task.id);
  };

  const value = {
    tasks,
    isLoading,
    error,
    addTask,
    selectedTask,
    setSelectedTask,
    addBlockToTask,
  };

  return (
    <tasksContext.Provider value={value}>{children}</tasksContext.Provider>
  );
};

export const useTasks = () => useContext(tasksContext);
