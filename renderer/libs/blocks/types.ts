import type { Timestamp } from 'firebase/firestore';
import type { Project } from '~projects';

export type BlockData = {
  title: string;
  projectId: string;
  createdAt?: Timestamp;
};

export type Block = BlockData & {
  id: string;
  project: Project;
  borderColor?: string;
  bgColor?: string;
};
