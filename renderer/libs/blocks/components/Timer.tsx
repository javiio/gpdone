import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useTimer } from '../';

const Timer: React.FC = () => {
  const {
    blockTime,
    remainingTime,
    toggleTimer,
    resetTimer,
    isPaused,
    formatTime,
  } = useTimer();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 's' && event.metaKey) {
      toggleTimer();
    } else if (event.key === 'b' && event.metaKey) {
      resetTimer();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); };
  }, []);

  return (
    <div className="opacity-70">
      <button onClick={toggleTimer} className="text-2xl">
        {formatTime()}
      </button>
      {isPaused && remainingTime !== blockTime && (
        <button onClick={resetTimer}>
          <FontAwesomeIcon icon={faRefresh} className="ml-1" />
        </button>
      )}
    </div>
  );
};

export default Timer;
