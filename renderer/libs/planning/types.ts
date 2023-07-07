import type { Project } from '~projects';
import type { Task } from '~tasks';

export interface PlannedBlockData {
  projectId: string
  taskId?: string
}

export interface PlannedBlock extends PlannedBlockData {
  project: Project
  task?: Task
}
