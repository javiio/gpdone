import { updateDoc } from '~platform';
import type { Task } from '../';

export const useTask = (task: Task) => {
  const { completed, id } = task;

  const toggle = async () => {
    await updateDoc({ completed: !completed }, 'tasks', id);
  };

  return {
    toggle,
  };
};
