import { updateDoc, addItemToArrayDoc } from '~platform';
import type { Task, TaskLink } from '../';

export const useTask = (task: Task) => {
  const { completed, id } = task;

  const toggle = async () => {
    await updateDoc({ completed: !completed }, 'tasks', id);
  };

  const addLink = async (link: TaskLink) => {
    await addItemToArrayDoc(link, 'links', 'tasks', id);
  };

  return {
    toggle,
    addLink,
  };
};
