import React from 'react';
import { DateTime } from 'luxon';
import { useRecoilState } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { currentDateState } from '../';

export const CurrentDateSelector: React.FC = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);

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
      <button onClick={handlePreviousDay}>
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      </button>
      <span className="w-24 text-center text-xs">{formatDate(currentDate)}</span>
      {currentDate < DateTime.now().startOf('day') && (
        <button onClick={handleNextDay}>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </button>
      )}
    </div>
  );
};
