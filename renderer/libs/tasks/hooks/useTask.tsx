import { Timestamp } from 'firebase/firestore';
import { updateDoc, deleteDoc, addItemToArrayDoc } from '~platform';
import type { Task, TaskLink, SubTask } from '../';

export const useTask = (task: Task) => {
  const { completed, id } = task;

  const toggle = async () => {
    const toggled = !completed;
    const data = {
      completed: toggled,
      ...(toggled && { completedAt: Timestamp.now() }),
    };
    await updateDoc(data, 'tasks', id);
  };

  const addLink = async (link: TaskLink) => {
    await addItemToArrayDoc(link, 'links', 'tasks', id);
  };

  const updateLinks = async (links: TaskLink[]) => {
    await updateDoc({ links }, 'tasks', id);
  };

  const updateSubtasks = async (subtasks: SubTask[]) => {
    await updateDoc({ subtasks }, 'tasks', id);
  };

  const updatePlannedBlocks = async (plannedBlocks: number) => {
    await updateDoc({ plannedBlocks }, 'tasks', id);
  };

  const remove = async () => {
    await deleteDoc('tasks', id);
  };

  return {
    toggle,
    addLink,
    updateLinks,
    updateSubtasks,
    updatePlannedBlocks,
    remove,
  };
};
