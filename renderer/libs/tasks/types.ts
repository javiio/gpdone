import type { Timestamp } from 'firebase/firestore';
import type { RawDraftContentState } from 'draft-js';
import { type Project } from '~projects';
export interface TaskData {
  title: string
  body: RawDraftContentState
  completed: boolean
  projectId?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  completedAt?: Timestamp
};

export interface Task extends TaskData {
  id: string
  project?: Project
}
