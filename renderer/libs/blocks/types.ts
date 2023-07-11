import type { Timestamp } from 'firebase/firestore';
import type { TimerLog } from '~timer';
import type { BlockPlan, BlockPlanData } from '~planning';

export interface BlockData {
  title: string
  timerLogs: TimerLog[]
  blockTime: number
  createdAt?: Timestamp
  blockPlansData: BlockPlanData[]
};

export interface Block extends BlockData {
  blockPlan?: BlockPlan
  color: string
};
