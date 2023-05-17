import { atom } from 'recoil';
import { DateTime } from 'luxon';
import { BLOCK_TIME, type Block } from './';

export const currentBlockState = atom<Block>({
  key: 'currentBlockState',
  default: undefined,
});

export const currentDateState = atom<DateTime>({
  key: 'currentDateState',
  default: DateTime.now().startOf('day'),
});

export const remainingTimeState = atom<number>({
  key: 'remainingTimeState',
  default: BLOCK_TIME,
});
