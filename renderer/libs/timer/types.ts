import type { Timestamp } from 'firebase/firestore';

export type TimerLogAction = 'start' | 'pause' | 'resume' | 'finish' | 'reset';

export interface TimerLog {
  action: TimerLogAction
  time: Timestamp
}
