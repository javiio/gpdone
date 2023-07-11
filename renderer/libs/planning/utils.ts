import type { BlockPlan, BlockPlanData } from './';
import type { Project } from '~projects';
import type { Task } from '~tasks';

export const blockPlanToData = (
  blockPlan: BlockPlan
): BlockPlanData => ({
  projectId: blockPlan.projectId,
  ...(blockPlan.taskId && { taskId: blockPlan.taskId }),
});

export const dataToBlockPlan = (
  data: BlockPlanData,
  getProject: (id: string) => Project | undefined,
  getTask: (id?: string) => Task | undefined
): BlockPlan => ({
  ...data,
  project: getProject(data.projectId) as Project,
  task: getTask(data.taskId),
});
