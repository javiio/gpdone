import type { Timestamp } from 'firebase/firestore';
import type { Project } from '~projects';
import type { Task } from '~tasks';
import type { TimerLog } from '~timer';

export interface BlockData {
  title: string
  projectId: string
  timerLogs: TimerLog[]
  blockTime: number
  createdAt?: Timestamp
  tasksIds?: string[]
};

export interface Block extends BlockData {
  project?: Project
  borderColor: string
  bgColor: string
  tasks?: Task[]
};
