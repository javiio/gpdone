import { atom } from 'recoil';
import { DateTime } from 'luxon';

export const currentDateState = atom<DateTime>({
  key: 'currentDateState',
  default: DateTime.now(),
});
