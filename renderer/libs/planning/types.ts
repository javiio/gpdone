import type { Project } from '~projects';
import type { Task } from '~tasks';

export interface BlockPlanData {
  projectId: string
  taskId?: string
}

export interface BlockPlan extends BlockPlanData {
  project?: Project
  task?: Task
}
