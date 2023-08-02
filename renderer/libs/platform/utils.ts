import { Timestamp } from 'firebase/firestore';
import { DateTime } from 'luxon';

const START_TIME = 7;
type GenericDate = DateTime | Timestamp | Date | string;

export const getDateString = (
  date: GenericDate,
  includeMidnight = true // From 00:00am to 07:00am, consider as yesterday
) => {
  const _date = parseDate(date);

  if (includeMidnight && isToday(date, includeMidnight) && _date.hour < START_TIME) {
    _date.minus({ days: 1 });
  }
  return _date.toFormat('yyyyMMdd');
};

export const isToday = (date: GenericDate | undefined, includeMidnight = true): boolean => {
  if (!date) {
    return false;
  }
  let _date = parseDate(date);
  const today = getToday(includeMidnight);

  if (includeMidnight && _date.hour < START_TIME) {
    _date = _date.minus({ days: 1 });
  }

  return _date.startOf('day').toLocaleString() === today.toLocaleString();
};

export const getToday = (includeMidnight = true): DateTime => {
  let now = DateTime.now();
  if (includeMidnight && now.hour < START_TIME) {
    now = now.minus({ days: 1 });
  }
  return now.startOf('day');
};

export const parseDate = (date: GenericDate): DateTime => {
  if (Object.getPrototypeOf(date) === Date.prototype) {
    return DateTime.fromJSDate(date as Date);
  }
  if (Object.getPrototypeOf(date) === Timestamp.prototype) {
    return DateTime.fromJSDate((date as Timestamp).toDate());
  }
  if (typeof date === 'string' || date instanceof String) {
    return DateTime.fromISO(date as string);
  }

  return date as DateTime;
};
