import React, { type ChangeEvent } from 'react';
import { DateTime } from 'luxon';
import { useRecoilState } from 'recoil';
import { currentDateState } from '../';

export const CurrentDateSelector: React.FC = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = DateTime.fromISO(event.target.value);
    setCurrentDate(selectedDate);
  };

  const handlePreviousDay = () => {
    setCurrentDate(currentDate.minus({ days: 1 }));
  };

  const handleNextDay = () => {
    setCurrentDate(currentDate.plus({ days: 1 }));
  };

  return (
    <div className="flex justify-end">
      <button onClick={handlePreviousDay}>&lt;</button>
      <input
        type="date"
        value={currentDate.toISODate()}
        onChange={handleDateChange}
        className="bg-slate-800 text-xs text-right"
      />
      <button onClick={handleNextDay}>&gt;</button>
    </div>
  );
};
