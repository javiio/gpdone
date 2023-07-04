import type { Timestamp } from 'firebase/firestore';
import type { RawDraftContentState } from 'draft-js';
import { type Project } from '~projects';

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
  body?: RawDraftContentState
  completed: boolean
  subtasks?: SubTask[]
  links?: TaskLink[]
  plannedBlocks: number
  blocks?: string[]
  projectId?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  completedAt?: Timestamp
};

export interface Task extends TaskData {
  id: string
  project?: Project
}
