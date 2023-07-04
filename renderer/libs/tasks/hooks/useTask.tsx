import { updateDoc, addItemToArrayDoc } from '~platform';
import type { Task, TaskLink, SubTask } from '../';

export const useTask = (task: Task) => {
  const { completed, id } = task;

  const toggle = async () => {
    await updateDoc({ completed: !completed }, 'tasks', id);
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

  return {
    toggle,
    addLink,
    updateLinks,
    updateSubtasks,
    updatePlannedBlocks,
  };
};
