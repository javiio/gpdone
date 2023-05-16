import { atom } from 'recoil';
import { DateTime } from 'luxon';
import { BLOCK_TIME } from './utils';

export const currentDateState = atom<DateTime>({
  key: 'currentDateState',
  default: DateTime.now().startOf('day'),
});

export const remainingTimeState = atom<number>({
  key: 'remainingTimeState',
  default: BLOCK_TIME,
});
