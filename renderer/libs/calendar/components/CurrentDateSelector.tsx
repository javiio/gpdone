import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { IconButton } from '~platform';

export const CurrentDateSelector: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(DateTime.now().startOf('day'));

  const handlePreviousDay = () => {
    setCurrentDate(currentDate.minus({ days: 1 }));
  };

  const handleNextDay = () => {
    const nextDay = currentDate.plus({ days: 1 });
    setCurrentDate(nextDay <= DateTime.now().startOf('day') ? nextDay : currentDate);
  };

  const formatDate = (date: DateTime) => {
    const today = DateTime.now().startOf('day');
    const yesterday = today.minus({ days: 1 });

    if (date >= today) {
      return 'Today';
    } else if (date >= yesterday) {
      return 'Yesterday';
    } else {
      return date.plus(0).toFormat('EEE, MMM d');
    }
  };

  return (
    <div className="flex items-center">
      <IconButton name="chevronLeft" size={4} onClick={handlePreviousDay} />
      <span className="w-24 text-center text-xs">{formatDate(currentDate)}</span>
      {currentDate < DateTime.now().startOf('day') && (
        <IconButton name="chevronRight" size={4} onClick={handleNextDay} />
      )}
    </div>
  );
};
