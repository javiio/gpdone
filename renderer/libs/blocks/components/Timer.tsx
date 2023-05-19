import React, { useEffect } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useTimer, useCurrentBlock } from '../';

const Timer: React.FC = () => {
  const {
    blockTime,
    remainingTime,
    toggleTimer,
    resetTimer,
    isPaused,
    formatTime,
  } = useTimer();
  const { color } = useCurrentBlock();

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
    <div>
      {isPaused && remainingTime !== blockTime && (
        <button onClick={resetTimer}>
          <FontAwesomeIcon icon={faRefresh} className="mr-1.5 opacity-70" />
        </button>
      )}
      <button
        onClick={toggleTimer}
        className={cn('text-4xl', isPaused ? 'opacity-70' : `text-${color}`)}
      >
        {formatTime()}
      </button>
    </div>
  );
};

export default Timer;
