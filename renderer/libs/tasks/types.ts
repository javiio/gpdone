import type { Timestamp } from 'firebase/firestore';
import type { RawDraftContentState } from 'draft-js';
export interface Task {
  id: string
  projectId?: string
  title: string
  body: RawDraftContentState
  completed: boolean
  createdAt: Timestamp
  updatedAt?: Timestamp
  completedAt?: Timestamp
};
