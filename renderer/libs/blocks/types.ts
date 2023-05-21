import type { Timestamp } from 'firebase/firestore';
import type { Project } from '~projects';

export interface BlockData {
  title: string
  projectId: string
  startedAt?: Timestamp
  finishedAt?: Timestamp
  createdAt?: Timestamp
}

export interface Block extends BlockData {
  project?: Project
  borderColor: string
  bgColor: string
};
