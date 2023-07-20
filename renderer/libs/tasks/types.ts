import type { Timestamp } from 'firebase/firestore';
import type { Project } from '~projects';
import type { Block } from '~blocks';

export interface SubTask {
  title: string
  completed: boolean
}

export interface TaskLink {
  title: string
  url: string
}

export interface TaskData {
  title: string
  body?: string
  completed: boolean
  subtasks?: SubTask[]
  links?: TaskLink[]
  plannedBlocks: number
  blocksIds?: string[]
  projectId?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  completedAt?: Timestamp
};

export interface Task extends TaskData {
  id: string
  project?: Project
  blocks?: Block[]
}
