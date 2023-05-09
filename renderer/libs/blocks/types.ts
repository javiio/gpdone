import type { Timestamp } from 'firebase/firestore';
import { Project } from '../projects/types';

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
